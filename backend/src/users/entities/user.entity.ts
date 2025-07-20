import { UserRole } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  role: UserRole;
  companyId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
