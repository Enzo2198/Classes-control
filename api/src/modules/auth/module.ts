import {Module} from "@nestjs/common";
import {AuthController} from "@/modules/auth/controllers";
import {UserModule} from "@/modules/user/module";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {AuthServiceToken} from "@/share";
import { AuthService } from "./services/services";

@Module({
  imports: [
    UserModule,

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
  ],

  exports: [JwtModule],
})
export class AuthModule {}