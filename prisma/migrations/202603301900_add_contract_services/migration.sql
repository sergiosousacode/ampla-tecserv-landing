-- CreateTable
CREATE TABLE "ContractService" (
    "contractId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractService_pkey" PRIMARY KEY ("contractId","serviceId")
);

-- Backfill existing single-service orders into the new relation table
INSERT INTO "ContractService" ("contractId", "serviceId", "position")
SELECT "id", "serviceId", 0
FROM "Contract";

-- AddForeignKey
ALTER TABLE "ContractService" ADD CONSTRAINT "ContractService_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractService" ADD CONSTRAINT "ContractService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_serviceId_fkey";

-- DropColumn
ALTER TABLE "Contract" DROP COLUMN "serviceId";
