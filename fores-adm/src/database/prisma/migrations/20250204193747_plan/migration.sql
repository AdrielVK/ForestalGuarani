-- CreateTable
CREATE TABLE "PlanProduccion" (
    "id" SERIAL NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "esquemaId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "ordenId" INTEGER NOT NULL,

    CONSTRAINT "PlanProduccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumo" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "planId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,

    CONSTRAINT "Consumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenProd" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "volumen" DOUBLE PRECISION NOT NULL,
    "cabadoId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "OrdenProd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CabadoMadera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "CabadoMadera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EsquemaCorte" (
    "id" SERIAL NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "ancho" DOUBLE PRECISION NOT NULL,
    "espesor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EsquemaCorte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consumo_equipoId_key" ON "Consumo"("equipoId");

-- CreateIndex
CREATE UNIQUE INDEX "OrdenProd_numero_key" ON "OrdenProd"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "CabadoMadera_nombre_key" ON "CabadoMadera"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_numero_key" ON "Cliente"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "EsquemaCorte_longitud_ancho_espesor_key" ON "EsquemaCorte"("longitud", "ancho", "espesor");

-- AddForeignKey
ALTER TABLE "PlanProduccion" ADD CONSTRAINT "PlanProduccion_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "OrdenProd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanProduccion" ADD CONSTRAINT "PlanProduccion_esquemaId_fkey" FOREIGN KEY ("esquemaId") REFERENCES "EsquemaCorte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumo" ADD CONSTRAINT "Consumo_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanProduccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumo" ADD CONSTRAINT "Consumo_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenProd" ADD CONSTRAINT "OrdenProd_cabadoId_fkey" FOREIGN KEY ("cabadoId") REFERENCES "CabadoMadera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenProd" ADD CONSTRAINT "OrdenProd_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
