import { X } from "lucide-react"
import { Orden } from "../../models/interfaces/orden.interfaces"
import { OrdenStore, useOrdenStore } from "../../store/ordenStore"

const OrdenItemList = (
  data:Orden,
  //onRemove: () => void
) => {

  const removeFromOrdenList = useOrdenStore((state:OrdenStore) => state.removeFromOrdenList)

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    removeFromOrdenList(data.id);
  }

  return(

    <div className="bg-white shadow-sm rounded-lg p-3 mb-2 flex items-center justify-between">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-sm">Orden #{data.numero}</span>
          <span className="text-xs text-gray-500">Vol: {data.volumen}m³</span>
        </div>
        <div className="text-xs text-gray-600">
          <span className="mr-2">Acabado: {data.cabado.nombre}</span>
          <span>
            Cliente: {data.cliente.nombre} (#{data.cliente.numero})
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => handleRemove(e)}
        className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none"
        aria-label="Remover orden"
        >
        <X size={16} />
      </button>
    </div>
  )
}

export default OrdenItemList;