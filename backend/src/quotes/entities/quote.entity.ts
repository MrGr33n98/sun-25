import { QuoteStatus } from '@prisma/client';

export class Quote {
  id: string;
  status: QuoteStatus;
  description?: string | null;
  budget?: number | null;
  message?: string | null;
  userId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}
