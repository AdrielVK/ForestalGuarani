-- CreateTable
CREATE TABLE "Remito" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Remito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingreso" (
    "id" SERIAL NOT NULL,
    "proveedorId" INTEGER NOT NULL,
    "fuente_controlada" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "chofer" TEXT NOT NULL,
    "patente" TEXT NOT NULL,
    "remitoId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,

    CONSTRAINT "Ingreso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posicion" (
    "id" SERIAL NOT NULL,
    "identificador" INTEGER NOT NULL,
    "ocupado" BOOLEAN NOT NULL,
    "equipoId" INTEGER,

    CONSTRAINT "Posicion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingreso_equipoId_key" ON "Ingreso"("equipoId");

-- CreateIndex
CREATE UNIQUE INDEX "Posicion_equipoId_key" ON "Posicion"("equipoId");

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_remitoId_fkey" FOREIGN KEY ("remitoId") REFERENCES "Remito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posicion" ADD CONSTRAINT "Posicion_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
