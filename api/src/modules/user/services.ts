import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import {Repository, SelectQueryBuilder} from "typeorm";
import { UserEntity } from "./entities";
import {BaseService} from "@/modules/base/services";
import {ChangePasswordReqI, UserEntityRepository, UserReqI, UserResI, UserServiceI, UserWithPassI} from "@/share";
import {ClsService} from "nestjs-cls";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<UserEntity, UserReqI, UserResI> implements UserServiceI {
  constructor(
    @Inject(UserEntityRepository)
    protected readonly repository: Repository<UserEntity>,
    protected readonly cls: ClsService,
    private readonly configService: ConfigService
  ) {
    super(repository, cls);
  }

  protected getPublicColumns() {
    return super.getPublicColumns().filter((column) => !['password', 'avatar', 'id'].includes(column));
  }

  protected handleSelect(): SelectQueryBuilder<UserEntity> {
    return this.repository
      .createQueryBuilder('user')
      .select('user.id AS id')
      .addSelect(this.getPublicColumns())
      .addSelect(`
            CASE WHEN user_file.id IS NULL THEN NULL
                 ELSE json_build_object('id', user_file.id, 'url', user_file.url)
            END as avatar_info
        `)
      .leftJoin('user.file', 'user_file');
  }

  async findUserByEmailWithPassword(email: string): Promise<UserWithPassI | null> {
    const query = this.handleSelect()
    const response: UserWithPassI | undefined = await query
      .addSelect('user.password', 'password')
      .where('user.email = :email AND user.active = :active', {email, active: true})
      .getRawOne<UserWithPassI>();

    return response ?? null;
  }

  private async findUserByIdWithPassword(id: number): Promise<UserWithPassI | null> {
    const response: UserWithPassI | undefined = await this.handleSelect()
      .addSelect('user.password AS password')
      .where('user.id = :id and user.active = :active', {id: id, active: true})
      .getRawOne<UserWithPassI>();
    if (!response) return null;
    return response;
  }

  async changePassword(data: ChangePasswordReqI){
    const userId: number | null = this.getUserId();
    if (!userId) throw new UnauthorizedException('Unauthorized');

    const user: UserWithPassI | null = await this.findUserByIdWithPassword(userId);
    if (!user) throw new InternalServerErrorException('Internal server error');

    // check if the old password is correct
    const {old_password, new_password} = data;
    const isPasswordMatching: boolean = await bcrypt.compare(old_password, user.password);
    if (!isPasswordMatching) throw new BadRequestException('Password is incorrect');

    // check if the new password is the same as the old password
    if (old_password === new_password) throw new BadRequestException('New password cannot be the same as the old password');

    // hash the new password before saving
    const saltRounds: number | undefined = this.configService.get<number>('BCRYPT_SALT_ROUNDS');
    if (!saltRounds) throw new InternalServerErrorException('Not found salt rounds in config');
    // the type of saltRounds is still string
    const hashedPassword: string = await bcrypt.hash(new_password, Number(saltRounds));
    await this.repository.update({id: userId}, {password: hashedPassword});
    return {msg: 'Successfully changed password'};

  }

}