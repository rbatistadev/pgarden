-- CreateEnum
CREATE TYPE "AbsenceType" AS ENUM ('VACATION', 'MEDICAL', 'DEATH', 'MOVING');

-- CreateTable
CREATE TABLE "Agreement" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "vacationDays" INTEGER NOT NULL,
    "medicalDays" INTEGER NOT NULL,
    "deathDays" INTEGER NOT NULL,
    "movingDays" INTEGER NOT NULL,
    CONSTRAINT "Agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "AbsenceType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "days" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agreement_companyId_key" ON "Agreement"("companyId");

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Absence" ADD CONSTRAINT "Absence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
