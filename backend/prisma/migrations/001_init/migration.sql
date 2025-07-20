-- Initial schema for InsideSolar
CREATE TYPE "UserRole" AS ENUM ('CONSUMER','COMPANY_ADMIN','COMPANY_USER','ADMIN');
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED','IN_PROGRESS','COMPLETED','CANCELLED');
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING','RESPONDED','ACCEPTED','REJECTED');

CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "avatar" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'CONSUMER',
  "companyId" UUID,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE TABLE "companies" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "website" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "logo" TEXT,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "zipCode" TEXT,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION
);

CREATE TABLE "services" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "category" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE TABLE "company_services" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "companyId" UUID NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE,
  "serviceId" UUID NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  CONSTRAINT company_service_unique UNIQUE ("companyId","serviceId")
);

CREATE TABLE "reviews" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "rating" SMALLINT NOT NULL,
  "title" TEXT,
  "content" TEXT,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "companyId" UUID NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE
);

CREATE TABLE "projects" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNED',
  "capacity" DOUBLE PRECISION,
  "startDate" TIMESTAMP(3),
  "endDate" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "zipCode" TEXT,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "companyId" UUID NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE
);

CREATE TABLE "quotes" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
  "description" TEXT,
  "budget" DOUBLE PRECISION,
  "message" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "companyId" UUID NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE
);

ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL;
