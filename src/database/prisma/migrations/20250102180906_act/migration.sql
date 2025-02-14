/*
  Warnings:

  - Added the required column `equipoId` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Equipo" DROP CONSTRAINT "Equipo_pedidoId_fkey";

-- AlterTable
ALTER TABLE "Equipo" ALTER COLUMN "pedidoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "equipoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;
