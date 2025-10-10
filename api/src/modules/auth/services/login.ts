import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import type {LoginReqI, LoginResI, TokenPayloadData, UserServiceI, UserWithPassI} from "@/share";
import {UserServiceToken} from "@/share";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwrService: JwtService,
    private readonly configService: ConfigService,

    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
  ) {}

  async login(data: LoginReqI): Promise<LoginResI> {
    // Check the email exists in the DB
    const user: UserWithPassI | null = await this.userService.findUserByEmailWithPassword(data.email);
    if (!user) throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);

    // Check if the password is corrected
    const isPassword: boolean = await bcrypt.compare(
      data.password,
      user.password,
    )
    if (!isPassword) throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);

    const payloadData: TokenPayloadData = {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar_info: user?.avatar_info ?? null
    }

    // Make new JWT token and return
    const payload = {sub: user.id, ...payloadData};

    const [accessToken, refreshToken] = await Promise.all([
      this.jwrService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '10m',
      }),
      this.jwrService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d'
      })
    ])
    return {accessToken, refreshToken}
  }

}