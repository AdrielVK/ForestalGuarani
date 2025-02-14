/*
  Warnings:

  - You are about to drop the column `equipoId` on the `Ingreso` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rollisoId]` on the table `Equipo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ingreso" DROP CONSTRAINT "Ingreso_equipoId_fkey";

-- DropIndex
DROP INDEX "Ingreso_equipoId_key";

-- AlterTable
ALTER TABLE "Equipo" ADD COLUMN     "ingresoId" INTEGER;

-- AlterTable
ALTER TABLE "Ingreso" DROP COLUMN "equipoId";

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_rollisoId_key" ON "Equipo"("rollisoId");

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_ingresoId_fkey" FOREIGN KEY ("ingresoId") REFERENCES "Ingreso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
