import {ExecutionContext, Injectable } from "@nestjs/common";
import { BaseInterceptor } from "../base/interceptor";
import {RequestWithUser, Role} from "@/share";

@Injectable()
export class ExamInterceptor extends BaseInterceptor {
  transform(item: any, context: ExecutionContext): any {
    // Get user information from request
    const request: RequestWithUser = context.switchToHttp().getRequest<RequestWithUser>();
    const userRole: Role = request.user.role;

    // If item do not have field "questions"
    if(item && typeof item === 'object' && Array.isArray(item.questions)) {
      if(userRole === Role.STUDENT) {
        const transformedItem = {...item};

        // Delete 'correct_answer' each question
        transformedItem.questions = transformedItem.questions.map(q => {
          const {correct_answer, ...rest} = q;
          return rest;
        });
        return transformedItem;
      }
    }
    return item;
  }
}