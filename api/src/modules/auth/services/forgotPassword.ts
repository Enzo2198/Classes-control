import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from "@nestjs/common";
import {MailServiceToken, PasswordResetTokenRepository, UserEntityRepository, UserServiceToken} from "@/share";
import type {MailServiceI, UserServiceI} from "@/share";
import {ForgotPasswordReq} from "@/modules/auth/dtos/forgotPassword";
import {UserEntity} from "@/modules/user/entities";
import { Repository } from "typeorm";
import {PasswordResetTokenEntity} from "@/modules/password_reset_token/entities";
import {AuthService} from "@/modules/auth/services/auth";
import {ResetPasswordReq} from "@/modules/auth/dtos/resetPassword";
import {hash} from "bcrypt";

@Injectable()
export class ForgotPasswordService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @Inject(PasswordResetTokenRepository)
    private readonly passwordResetTokenRepository: Repository<PasswordResetTokenEntity>,
    @Inject(MailServiceToken)
    private readonly mailService: MailServiceI,
    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
    @Inject(UserEntityRepository)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private generateVerificationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async forgotPassword(data: ForgotPasswordReq) {
    const {email} = data;
    const primaryResponse = { msg: 'If your email exists, a code has been sent.' }

    // Check if user email exists or not
    const user = await this.userService.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Email not registered');
    }

    // Cancel old unsend tokens
    await this.passwordResetTokenRepository.update(
      {userId: user.id, isUsed: false},
      {isUsed: true},
    )

    // Create random code
    const code = this.generateVerificationCode()

    // Calculate expiration time
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save new token in DB
    await this.passwordResetTokenRepository.save({
      userId: user.id,
      token: code,
      expiresAt
    })

    // Send mail
    try {
      await this.mailService.sendMail({
        to: [user.email],
        subject: 'Request to change password',
        html: `
          <h1>Request to change password</h1>
          <h3>Hello ${user.name},</h3>
          <p>We received your request to change your password.</p>
          <p>Your verification code is:</p>
          <h2 style="letter-spacing:3px;">${code}</h2>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      })
      this.logger.log(`Password reset email sent to ${user.email}`);
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${user.email}`, error);
    }

    return primaryResponse;
  }

  async resetPassword(data: ResetPasswordReq){
    const { code: code, newPassword } = data;

    // Check code in DB
    const codeRecord = await this.passwordResetTokenRepository.findOne({
      where: { token: code, isUsed: false }
    })

    if (!codeRecord) throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);

    if (codeRecord.expiresAt < new Date()) {
      this.logger.warn(`Code expired for userId=${codeRecord.userId}`);
      throw new HttpException('Verification code expired', HttpStatus.BAD_REQUEST);
    }

    // Get user by userId in token record
    const user = await this.userRepository.findOne({
      where: {id: codeRecord.userId}
    })
    if (!user) throw new NotFoundException('User not found');

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update user password
    await this.userRepository.update(user.id, {password: hashedPassword})

    // Mark token as used
    codeRecord.isUsed = true;
    await this.passwordResetTokenRepository.save(codeRecord)

    this.logger.log(`Password successfully reset for userId=${user.email}`);

    // Return response
    return { msg: 'Password reset successfully' };
  }
}