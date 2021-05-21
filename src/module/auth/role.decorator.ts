import { SetMetadata } from '@nestjs/common';

export type rolesTypes = 'admin' | 'lawyer' | 'secretary';

export const ROLES_KEY = 'roles';
export const Role = (...roles: rolesTypes[]) => SetMetadata(ROLES_KEY, roles);
