import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {
  type LoginResI,
  TokenPayloadData,
  type UserServiceI
} from "@/share";
import {UserServiceToken} from "@/share";
import {RefreshTokenReq} from "@/modules/auth/dtos/refreshToken";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
  ) {}

  async refreshToken(data: RefreshTokenReq): Promise<LoginResI> {
    const {refreshToken} = data;
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userService.findOne(payload.sub)
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const newPayloadData: TokenPayloadData = {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_info: user?.avatar_info ?? null,
      }

      const newPayload = {sub: user.id, ...newPayloadData};

      const [newAccessToken, newRefreshToken] = await Promise.all([
        this.jwtService.signAsync(newPayload, {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '10m'
        }),

        this.jwtService.signAsync(newPayload, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '1d'
        })
      ])

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch (error) {
      throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

}