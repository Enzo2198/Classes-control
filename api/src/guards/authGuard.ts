import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {TokenPayload, UserResI, UserServiceToken} from "@/share";
import type {UserServiceI, ReqWithUserI} from "@/share"
import {JwtService} from '@nestjs/jwt';
import {ClsService} from "nestjs-cls";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly clsService: ClsService,
    private readonly configService: ConfigService,
    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ReqWithUserI = context.switchToHttp().getRequest<ReqWithUserI>();
    // Get token from header
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
      // Decode token
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });

      // Check if user exists in the DB
      const user: UserResI = await this.userService.findOne(payload.sub)
      if (!user) {
        throw new UnauthorizedException('user does not exist');
      }

      // Assign user to the request to controller use to it
      request.user = {
        ...user,
        id: Number(user.id)
      };

      // Save user to Cls
      this.clsService.set('user', request.user)

      return true

    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader =
      (request.headers['authorization'] as string) ||
      (request.headers['Authorization'] as string);

    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}