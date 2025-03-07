-- AlterTable
ALTER TABLE "OrdenProd" ADD COLUMN     "paqueteId" INTEGER;

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paquete" (
    "id" SERIAL NOT NULL,
    "identificador" TEXT NOT NULL,
    "vol" DECIMAL(65,30) NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pieza" (
    "id" SERIAL NOT NULL,
    "volumen" DECIMAL(65,30) NOT NULL,
    "espesor" DECIMAL(65,30) NOT NULL,
    "longitud" DECIMAL(65,30) NOT NULL,
    "ancho" DECIMAL(65,30) NOT NULL,
    "escuadriaId" INTEGER,

    CONSTRAINT "Pieza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escuadria" (
    "id" SERIAL NOT NULL,
    "longitud" DECIMAL(65,30) NOT NULL,
    "altura" DECIMAL(65,30) NOT NULL,
    "ancho" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Escuadria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estado_value_key" ON "Estado"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Paquete_identificador_key" ON "Paquete"("identificador");

-- AddForeignKey
ALTER TABLE "OrdenProd" ADD CONSTRAINT "OrdenProd_paqueteId_fkey" FOREIGN KEY ("paqueteId") REFERENCES "Paquete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pieza" ADD CONSTRAINT "Pieza_escuadriaId_fkey" FOREIGN KEY ("escuadriaId") REFERENCES "Escuadria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
