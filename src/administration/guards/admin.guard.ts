import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

enum UserProfile {
  ADMIN = 'admin',
  STAFF = 'staff',
}

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user.profile === UserProfile.ADMIN) {
      return true; // Access granted for admin users
    }
    throw new UnauthorizedException(
      'Only admin users are permitted to access this route',
    );
  }
}

@Injectable()
export class StaffAuthorizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      request.user &&
      (request.user.profile === UserProfile.STAFF ||
        request.user.profile === UserProfile.ADMIN)
    ) {
      return true; // Access granted for admin users
    }
    throw new UnauthorizedException(
      'Only admin users are permitted to access this route',
    );
  }
}
