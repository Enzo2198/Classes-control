import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import type {RegisterReqI, UserResI, UserServiceI} from "@/share";
import {UserServiceToken} from "@/share";
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
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

}