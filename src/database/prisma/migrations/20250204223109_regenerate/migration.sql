/*
  Warnings:

  - You are about to drop the column `ordenId` on the `PlanProduccion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlanProduccion" DROP CONSTRAINT "PlanProduccion_ordenId_fkey";

-- AlterTable
ALTER TABLE "OrdenProd" ADD COLUMN     "planId" INTEGER;

-- AlterTable
ALTER TABLE "PlanProduccion" DROP COLUMN "ordenId";

-- AddForeignKey
ALTER TABLE "OrdenProd" ADD CONSTRAINT "OrdenProd_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanProduccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
