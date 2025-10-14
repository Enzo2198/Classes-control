import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map} from "rxjs";

@Injectable()
export abstract class BaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(data => this.processData(data, context))
    )
  }

  private processData(data: any, context: ExecutionContext) {
    if (!data) return data

    // If data is array, transform each member of data
    if (Array.isArray(data)) {
      return data.map(item => this.transform(item, context));
    }

    // If data is an object
    return this.transform(data, context);
  }

  abstract transform(item: any, context: ExecutionContext): any
}