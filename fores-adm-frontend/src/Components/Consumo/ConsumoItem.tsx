import {  PosicionStock } from "../../models/interfaces/ingresos.interface"
import { ConsumoStore, useConsumoStore } from "../../store/consumoStore"
import { X } from "lucide-react"

const ConsumoItem = (
  data: PosicionStock,
  //onRemove: () => void
) => {
  const {removeFromConsumoList} = useConsumoStore((state:ConsumoStore) => state)

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    removeFromConsumoList(data.id);
  }



  return(

    <div className={` cursor-pointer box-content bg-white shadow-sm rounded-lg p-3 mb-2 flex items-center justify-between`}>
      <div className="flex-grow ">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-sm">Posicion: {data.identificador}</span>
        </div>
        <div className="text-xs text-gray-600 flax space-x-4">
          <span className="mr-2">Tipo: {data.equipo.rolliso.tipo}</span>
          <span>
            Diametro: {data.equipo.rolliso.diametro}
          </span>
          <span>
            Longitud: {data.equipo.rolliso.longitud}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => handleRemove(e)}
        className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none"
        aria-label="Remover orden"
        type="button"
        >
        <X size={16} />
    </button>
    </div>
  )
}

export default ConsumoItem;