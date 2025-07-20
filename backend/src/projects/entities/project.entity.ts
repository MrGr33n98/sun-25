import { ProjectStatus } from '@prisma/client';

export class Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  capacity?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}
