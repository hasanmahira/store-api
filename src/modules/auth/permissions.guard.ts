import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// import { Permission } from './permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!requiredPermissions) {
      return true; // No specific permissions required, allow access
    }

    const { user } = context.switchToHttp().getRequest();

    // Check if user has all required permissions
    return requiredPermissions.every((requiredPermission) => user.permissions.includes(requiredPermission));
  }
}
