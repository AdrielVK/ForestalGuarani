import { TreesIcon as Tree, MapPin } from "lucide-react"
import { PosicionStock } from "../../../models/interfaces/ingresos.interface"


const PosicionStockItem = ( data : PosicionStock) => {
  return (
    <div className="bg-white shadow-md w-full rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-start">
        <div className="my-2">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-lime-700 mr-2" />
            <span className="text-md font-semibold text-gray-800">Posición: {data.identificador} </span>
          </div>
          <div className="flex items-center space-x-2 my-2">
            <Tree className="w-5 h-5 text-lime-700" />
            <h3 className="text-lg font-semibold text-gray-800">Rollizo Tipo: {data.equipo.rolliso.tipo || "No especificado"}</h3>
          </div>
          <div className="flex space-x-4 flex-wrap my-2">
            <p className="text-sm text-gray-600">Longitud: {data.equipo.rolliso.longitud || "N/A"}</p>
            <p className="text-sm text-gray-600">Diámetro: {data.equipo.rolliso.diametro || "N/A"}</p>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default PosicionStockItem

