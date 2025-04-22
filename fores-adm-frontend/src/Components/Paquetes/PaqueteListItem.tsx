import { format } from "date-fns"
import { IPaqueteDetail } from "../../models/interfaces/paquete.interface"
import { useState } from "react"
import { Box, Calendar, ChevronDown, ChevronUp, Layers, Package } from "lucide-react"
import ButtonDumb from "../ui/ButtonDumb"
import { colors } from "../../models/ui.models"
import DeletePaqueteModal from "../Modals/DeletePaqueteModal"
import EditEstadoPaqueteModal from "../Modals/EditEstadoPaqueteModal"



const PaqueteListItem = (paquete:IPaqueteDetail) => {
  const [expanded, setExpanded] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  // Si paquete es undefined, mostrar un mensaje o componente alternativo
  if (!paquete) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
        <p className="text-gray-500">No hay datos disponibles para este paquete.</p>
      </div>
    )
  }

  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), "dd/MM/yyyy HH:mm")
    } catch {
      return "Fecha no válida"
    }
  }

  const handleOpenEditModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()

    setOpenEditModal((prev) => !prev)
  }
  
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()

    setOpenDeleteModal((prev) => !prev)
  }

  return (
    <>
      <div className={`bg-white border-2  shadow-sm rounded-lg p-4 mb-4 border-solid hover:shadow-md transition-all duration-300 ${ expanded ? '  border-lime-300' : 'border-white'}`}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Paquete {paquete.identificador}</h3>
              <p className="text-sm text-gray-500">Vol: {paquete.vol}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span
              className={`px-2 py-1 rounded-md text-sm font-medium mr-3 text-white bg-lime-400 box-border`}
            >
              {paquete.estado?.value || "Desconocido"}
            </span>
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
                  <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                  Información General
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Ingreso:</span> {formatDate(paquete.ingreso)}
                  </p>
                  {paquete.orden && (
                    <>
                      <p className="text-gray-600">
                        <span className="font-medium">Orden:</span> #{paquete.orden.numero}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Volumen de orden:</span> {paquete.orden.volumen}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Cliente:</span> {paquete.orden.cliente?.nombre || "No especificado"}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Box className="w-4 h-4 mr-1 text-blue-500" />
                  Detalles de Pieza
                </h4>
                {paquete.pieza ? (
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Volumen:</span> {paquete.pieza.volumen}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Espesor:</span> {paquete.pieza.espesor}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Longitud:</span> {paquete.pieza.longitud}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Ancho:</span> {paquete.pieza.ancho}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">No hay información de pieza disponible</p>
                )}
              </div>
            </div>

            {paquete.pieza?.escuadria && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Layers className="w-4 h-4 mr-1 text-blue-500" />
                  Escuadría
                </h4>
                <div className="bg-blue-50 p-3 rounded-md text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Longitud:</span> {paquete.pieza.escuadria.longitud}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Altura:</span> {paquete.pieza.escuadria.altura}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Ancho:</span> {paquete.pieza.escuadria.ancho}
                  </p>
                </div>
              </div>
            )}
            <div className="justify-end flex space-x-2">
              <div className="mt-4 w-25 hover:shadow-md hover:shadow-lime-700 transition-shadow duration-300 ease-in-out">
              <ButtonDumb onClick={handleOpenEditModal} text="Cambiar estado"/>
              </div> 
              <div className="mt-4 w-20  hover:shadow-md hover:shadow-red-700 transition-shadow duration-300 ease-in-out">
              <ButtonDumb onClick={handleOpenModal} text="Eliminar" color={colors.danger}/>
              </div>
            </div>
          </div>
        )}
      </div>
    {
      openDeleteModal &&
      <DeletePaqueteModal onClose={handleOpenModal} id={paquete.id} numero={paquete.identificador} />
    }
    {
      openEditModal &&
      <EditEstadoPaqueteModal onClose={handleOpenEditModal} idPaquete={paquete.id} />
    }
    </>
  )
}

export default PaqueteListItem