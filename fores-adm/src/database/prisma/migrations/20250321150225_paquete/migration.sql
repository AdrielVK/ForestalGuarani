/*
  Warnings:

  - You are about to drop the column `paqueteId` on the `OrdenProd` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrdenProd" DROP CONSTRAINT "OrdenProd_paqueteId_fkey";

-- AlterTable
ALTER TABLE "OrdenProd" DROP COLUMN "paqueteId";

-- AlterTable
ALTER TABLE "Paquete" ADD COLUMN     "ordenId" INTEGER;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "OrdenProd"("id") ON DELETE SET NULL ON UPDATE CASCADE;
