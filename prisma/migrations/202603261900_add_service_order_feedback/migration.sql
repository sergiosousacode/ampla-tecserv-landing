ALTER TABLE "Contract"
ADD COLUMN "completedAt" TIMESTAMP(3),
ADD COLUMN "technicianFeedback" TEXT,
ADD COLUMN "clientSatisfaction" INTEGER,
ADD COLUMN "clientFeedback" TEXT;
