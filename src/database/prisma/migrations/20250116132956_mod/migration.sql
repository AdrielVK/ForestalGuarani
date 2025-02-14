/*
  Warnings:

  - You are about to drop the `_RollisoEquipo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RollisoEquipo" DROP CONSTRAINT "_RollisoEquipo_A_fkey";

-- DropForeignKey
ALTER TABLE "_RollisoEquipo" DROP CONSTRAINT "_RollisoEquipo_B_fkey";

-- AlterTable
ALTER TABLE "Equipo" ADD COLUMN     "rollisoId" INTEGER;

-- DropTable
DROP TABLE "_RollisoEquipo";

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_rollisoId_fkey" FOREIGN KEY ("rollisoId") REFERENCES "Rolliso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
