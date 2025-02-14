import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Truck, Calendar, User, FileText, Scale, MapPin, Check, X } from "lucide-react"
import { IngresoDetail } from "../../models/interfaces/ingresos.interface"
import { IngresoStore, useIngresoStore } from "../../store/ingresoStore"


const IngresoListItem = ({
  id,
  fuente_controlada,
  chofer,
  patente,
  fecha,
  remito,
  proveedor,
  equipos,
}: IngresoDetail) => {
  const viewDetail = useIngresoStore((state:IngresoStore) => state.viewDetail);
  const [isExpanded, setIsExpanded] = useState(viewDetail)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    setIsExpanded(viewDetail)
  },[viewDetail])

  return (
    <div className="bg-white border-2 border-lime-100 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Ingreso #{id}</h3>
            <p className="text-sm text-gray-500">{formatDate(fecha)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>
      {
        !isExpanded
        &&
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {equipos.length > 0 ? (
            equipos.map((equipo) => (
              <div key={equipo.id} className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>
                  ID: {equipo.id}, Tipo: {equipo.tipo},  {equipo.posicion? `Posición: ${equipo.posicion.identificador}` : ''}
                </span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-600">No hay equipos registrados</div>
          )}
        </div>
      }

      {isExpanded && (
        <div className="mt-4 border-t pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Chofer: {chofer}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Patente: {patente}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Proveedor: {proveedor.nombre}</span>
            </div>
            <div className="flex items-center space-x-2">
              {fuente_controlada ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm text-gray-600">Fuente {fuente_controlada ? "Controlada" : "No Controlada"}</span>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <h4 className="font-semibold text-gray-700 mb-2">Remito:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">ID: {remito.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Fecha: {formatDate(remito.fecha)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Peso: {remito.peso} kg</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Equipos:</h4>
            {equipos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {equipos.map((equipo) => (
                  <div key={equipo.id} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700">Equipo #{equipo.id}</p>
                    <p className="text-sm text-gray-600">Tipo: {equipo.tipo}</p>
                    <p className="text-sm text-gray-600">{equipo.posicion? `Posición: ${equipo.posicion.identificador}` : ''}</p>
                    <p className="text-sm text-gray-600">Diámetro: {equipo.diametro}</p>
                    <p className="text-sm text-gray-600">Longitud: {equipo.longitud}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No hay equipos registrados</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default IngresoListItem

