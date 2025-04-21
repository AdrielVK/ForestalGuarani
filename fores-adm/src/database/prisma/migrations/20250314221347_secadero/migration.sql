-- CreateTable
CREATE TABLE "CicloSecado" (
    "id" SERIAL NOT NULL,
    "ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "egreso" TIMESTAMP(3),
    "paqueteId" INTEGER,

    CONSTRAINT "CicloSecado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CicloSecado_paqueteId_key" ON "CicloSecado"("paqueteId");

-- AddForeignKey
ALTER TABLE "CicloSecado" ADD CONSTRAINT "CicloSecado_paqueteId_fkey" FOREIGN KEY ("paqueteId") REFERENCES "Paquete"("id") ON DELETE SET NULL ON UPDATE CASCADE;
