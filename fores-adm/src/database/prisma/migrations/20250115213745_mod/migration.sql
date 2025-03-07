/*
  Warnings:

  - You are about to drop the column `equipoId` on the `Rolliso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rolliso" DROP CONSTRAINT "Rolliso_equipoId_fkey";

-- AlterTable
ALTER TABLE "Rolliso" DROP COLUMN "equipoId";

-- CreateTable
CREATE TABLE "_RollisoEquipo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RollisoEquipo_AB_unique" ON "_RollisoEquipo"("A", "B");

-- CreateIndex
CREATE INDEX "_RollisoEquipo_B_index" ON "_RollisoEquipo"("B");

-- AddForeignKey
ALTER TABLE "_RollisoEquipo" ADD CONSTRAINT "_RollisoEquipo_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RollisoEquipo" ADD CONSTRAINT "_RollisoEquipo_B_fkey" FOREIGN KEY ("B") REFERENCES "Rolliso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
