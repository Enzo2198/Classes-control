import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {ROLES_KEY} from "@/guards/rolesDecorator";
import {RequestWithUser, Role} from "@/share";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // List of roles from metadata (assigned by @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    // If the route does not have decorator @Roles, allow access
    if (!requiredRoles) {
      return true
    }

    // Get user form request
    const {user} = context.switchToHttp().getRequest<RequestWithUser>()

    // Compare the roles
    const hasPermission: boolean = requiredRoles.includes(user.role);

    if (hasPermission) {
      return true
    }

    throw new ForbiddenException(
      'You do not have permission to access this resource.'
    )
  }
}