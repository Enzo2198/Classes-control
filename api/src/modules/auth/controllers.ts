import {ApiTags} from "@nestjs/swagger";
import {Controller, Post} from "@nestjs/common";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
}