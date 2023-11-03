import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user.profile === 'admin') {
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
      (request.user.profile === 'staff' || request.user.profile === 'admin')
    ) {
      return true; // Access granted for admin users
    }
    throw new UnauthorizedException(
      'Only admin users are permitted to access this route',
    );
  }
}
