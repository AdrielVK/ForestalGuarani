import { X } from "lucide-react"
import { IPaqueteForCiclo } from "../../models/interfaces/paquete.interface"
import { PaqueteStore, usePaqueteStore } from "../../store/paqueteStore"

const PaqueteItemToCiclo = (
  data: IPaqueteForCiclo,
  //onRemove: () => void
) => {

  const {resetPaqueteToAssociate} = usePaqueteStore((state:PaqueteStore) => state)

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    resetPaqueteToAssociate();
  }

  return(

    <div className="bg-white shadow-sm rounded-lg p-3 mb-2 flex items-center justify-between">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-sm">Paquete {data.identificador}</span>
          <span className="text-xs text-gray-500">Vol: {data.vol}</span>
        </div>
        <div className="text-xs text-gray-600">
          <span className="mr-2">Estado: {data.estado.value}</span>
            {
              data.orden ?
              <>
              <span>
                  Orden: {data.orden?.numero}
              </span>
              
              </>
              :
              <span>
                Sin orden asociada
              </span>
            }
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

export default PaqueteItemToCiclo;