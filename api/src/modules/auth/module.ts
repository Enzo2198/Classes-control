import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "@/modules/auth/controllers";
import {UserModule} from "@/modules/user/module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RegisterService} from "@/modules/auth/services/register";
import {LoginService} from "@/modules/auth/services/login";
import {AuthService} from "./services/auth";
import {AuthServiceToken} from "@/share";
import {RefreshTokenService} from "@/modules/auth/services/refreshToken";
import { MailModule } from "@/mail/module";
import {PasswordResetTokenModule} from "@/modules/password_reset_token/module";
import { ForgotPasswordService } from "./services/forgotPassword";

@Module({
  imports: [
    forwardRef(() => UserModule),
    MailModule,
    PasswordResetTokenModule,

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {expiresIn: '10m'}
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServiceToken,
      useClass: AuthService,
    },
    LoginService,
    RegisterService,
    RefreshTokenService,
    ForgotPasswordService,
  ],

  exports: [JwtModule, AuthServiceToken],
})
export class AuthModule {
}