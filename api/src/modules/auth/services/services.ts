import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import type {
  AuthServiceI,
  LoginReqI,
  LoginResI,
  RegisterReqI,
  TokenPayloadData,
  UserResI,
  UserServiceI,
  UserWithPassI
} from "@/share";
import {UserServiceToken, UserEntityRepository} from "@/share";
import {JwtService} from "@nestjs/jwt";
import {Repository} from "typeorm";
import {UserEntity} from "@/modules/user/entities";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService implements AuthServiceI {
  constructor(
    private readonly jwrService: JwtService,
    private readonly configService: ConfigService,

    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
    @Inject(UserEntityRepository)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(data: RegisterReqI) {
    // Check the email already exists
    const users: UserResI[] = await this.userService.find ({
      email: data.email,
    })
    if (users.length > 0) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(data.password, saltRounds);
    const newUser = {...data, password: hashedPassword}
    await this.userService.create(newUser);
    return {msg: 'successfully registered'};
  }

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