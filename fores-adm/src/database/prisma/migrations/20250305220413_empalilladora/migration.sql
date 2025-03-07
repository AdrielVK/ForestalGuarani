/*
  Warnings:

  - A unique constraint covering the columns `[longitud,altura,ancho]` on the table `Escuadria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `piezaId` to the `Paquete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paquete" ADD COLUMN     "piezaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Escuadria_longitud_altura_ancho_key" ON "Escuadria"("longitud", "altura", "ancho");

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_piezaId_fkey" FOREIGN KEY ("piezaId") REFERENCES "Pieza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
