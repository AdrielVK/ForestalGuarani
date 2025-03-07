/*
  Warnings:

  - A unique constraint covering the columns `[tipo]` on the table `Rolliso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tipo,diametro,longitud]` on the table `Rolliso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pedidoId` to the `Equipo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rolliso" DROP CONSTRAINT "Rolliso_equipoId_fkey";

-- AlterTable
ALTER TABLE "Equipo" ADD COLUMN     "pedidoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rolliso" ALTER COLUMN "equipoId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rolliso_tipo_key" ON "Rolliso"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Rolliso_tipo_diametro_longitud_key" ON "Rolliso"("tipo", "diametro", "longitud");

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rolliso" ADD CONSTRAINT "Rolliso_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
