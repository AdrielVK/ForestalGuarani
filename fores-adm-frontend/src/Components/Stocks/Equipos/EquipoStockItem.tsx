import { TreesIcon as Tree, MapPin } from "lucide-react"
import { EquipoStock } from "../../../models/interfaces/equipo.interfaces"


const EquipoStockItem = ({ rolliso, posicion }: EquipoStock) => {
  return (
    <div className="bg-white shadow-md w-full rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-start">
        
          <div className="flex items-center space-x-2 my-2">
            <Tree className="w-5 h-5 text-lime-700" />
            <h3 className="text-lg font-semibold text-gray-800">Rolliso Tipo: {rolliso?.tipo || "No especificado"}</h3>
          </div>
          <div className="flex space-x-4 flex-wrap my-2">
            <p className="text-sm text-gray-600">Longitud: {rolliso?.longitud || "N/A"} cm</p>
            <p className="text-sm text-gray-600">Diámetro: {rolliso?.diametro || "N/A"} cm</p>
          </div>
      
        <div className="my-2">
          <div className="flex flex-col items-center">
            <span className="text-md font-semibold text-gray-800">Posición en la playa de acopio: </span>
            <span className="w-full flex ml-0 items-center space-x-3">
              <MapPin className="w-5 h-5 text-lime-700" />
              <p className="font-bold text-md">{posicion.identificador ?? "Sin asignar"}</p>
            </span>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default EquipoStockItem

