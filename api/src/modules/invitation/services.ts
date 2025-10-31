import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import type {ClassServiceI, InvitationI, InvitationServiceI, UserClassServiceI, UserServiceI} from "@/share";
import {ClassServiceToken, UserClassServiceToken, UserServiceToken} from "@/share";
import {Transactional} from "typeorm-transactional";

@Injectable()
export class InvitationService implements InvitationServiceI {
  constructor(
    @Inject(UserClassServiceToken)
    private readonly userClassService: UserClassServiceI,
    @Inject(ClassServiceToken)
    private readonly classService: ClassServiceI,
    @Inject(UserServiceToken)
    private readonly userService: UserServiceI
  ) {}

  @Transactional()
  async invite(invitation: InvitationI) {

    // Check if the user is already in the class
    const theClassUser = await this.userClassService.findOneBy({
      class_id: invitation.class_id,
      user_id: invitation.user_id,
    });
    if (theClassUser) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    // Use DIRECT REPOSITORY ACCESS - bypass permission check
    const theClass = await this.findClassDirectly(invitation.class_id);

    if (!theClass) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    const theUser = await this.userService.findOne(invitation.user_id);
    if (!theUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const passcode = theClass.code;
    if (passcode === invitation.code) {
      await this.userClassService.create({
        class_id: invitation.class_id,
        user_id: invitation.user_id,
      });
      return {msg: 'User successfully add to the class!'};
    } else {
      throw new HttpException('Invalid passcode', HttpStatus.BAD_REQUEST);
    }
  }

  private async findClassDirectly(classId: number): Promise<any> {
    const repository = this.classService['repository'];
    if (!repository) {
      throw new HttpException('Service configuration error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await repository.findOne({
      where: {
        id: classId,
        active: true
      },
      select: ['id', 'name', 'code']
    });
  }
}