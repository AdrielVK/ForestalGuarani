/*
  Warnings:

  - A unique constraint covering the columns `[identificador]` on the table `Posicion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Posicion_identificador_key" ON "Posicion"("identificador");
