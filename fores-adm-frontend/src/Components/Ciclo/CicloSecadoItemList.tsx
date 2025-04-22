
import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Wind, ChevronDown, ChevronUp, Package, Clock } from "lucide-react"
import { ICicloSecadero } from "../../models/interfaces/ciclo.interfaces"
import { obtenerFecha } from "../../utils/get-date"
import ButtonDumb from "../ui/ButtonDumb"
import { colors } from "../../models/ui.models"
import DeleteCicloModal from "../Modals/DeleteCicloModal"
import SetEgresoCicloModal from "../Modals/SetEgresoCicloModal"


const CicloSecaderoListItem = ({ ciclo }: {ciclo: ICicloSecadero}) => {
  const [expanded, setExpanded] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEgresoModal, setOpenEgresoModal] = useState<boolean>(false)

  const handleDeleteModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setOpenDeleteModal((prev) => !prev)
  }

  const handleEgresoModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setOpenEgresoModal((prev) => !prev)
  }

  if (!ciclo) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
        <p className="text-gray-500">No hay datos disponibles para este ciclo de secado.</p>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No disponible"

    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm")
    } catch {
      return "Fecha no válida"
    }
  }


  

  const getCicloStatus = () => {
    const currentDate = new Date(obtenerFecha())
    const egresoDate: Date | null = ciclo.egreso ? new Date(ciclo.egreso) : null
    
    return egresoDate && egresoDate <= currentDate
      ? { text: "Completado", color: "bg-green-100 text-green-800" }
      : { text: "En proceso", color: "bg-yellow-100 text-yellow-800" }
  }

  const status = getCicloStatus()

  return (
    <div className={`bg-white shadow-sm rounded-lg p-4 border-solid border-2 mb-4 hover:shadow-md transition-all duration-300 ${ expanded ? '  border-lime-300' : 'border-white'}`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Wind className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Ciclo de Secado #{ciclo.id}</h3>
            <p className="text-sm text-gray-500">Ingreso: {formatDate(ciclo.ingreso)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${status.color}`}>{status.text}</span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                Información del Ciclo
              </h4>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">Ingreso:</span> {formatDate(ciclo.ingreso)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Egreso:</span> {formatDate(ciclo.egreso)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Estado:</span>
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                    {status.text}
                  </span>
                </p>
              </div>
            </div>

            {ciclo.paquete && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Package className="w-4 h-4 mr-1 text-blue-500" />
                  Detalles del Paquete
                </h4>
                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Identificador:</span> {ciclo.paquete.identificador}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Volumen:</span> {ciclo.paquete.vol}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Estado:</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium `}
                    >
                      {ciclo.paquete.estado?.value || "Desconocido"}
                    </span>
                  </p>
                  {ciclo.paquete.orden && (
                    <p className="text-gray-600">
                      <span className="font-medium">Orden:</span> #{ciclo.paquete.orden.numero}
                      {ciclo.paquete.orden.cliente && (
                        <span className="ml-1">({ciclo.paquete.orden.cliente.nombre})</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-full box-border flex justify-end">
            <span >
              <ButtonDumb onClick={handleEgresoModal} text="Agregar egreso" color={ciclo.egreso ? colors.disable : undefined} disabled={ciclo.egreso ? true : false} />
            </span>
            <span className="ml-4">
              <ButtonDumb onClick={handleDeleteModal} text="Eliminar" color={colors.danger}/>
            </span>
          </div>
        </div>
      )}
      {
        openDeleteModal && <DeleteCicloModal id={ciclo.id} onClose={handleEgresoModal} />
      }
      {
        openEgresoModal && <SetEgresoCicloModal id={ciclo.id} onClose={handleEgresoModal} />
      }
    </div>
  )
}

export default CicloSecaderoListItem

