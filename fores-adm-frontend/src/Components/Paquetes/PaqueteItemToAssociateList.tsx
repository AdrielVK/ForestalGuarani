import { useEffect, useState } from "react"
import { IPaqueteForCiclo } from "../../models/interfaces/paquete.interface"
import { PaqueteStore, usePaqueteStore } from "../../store/paqueteStore"

const PaqueteItemToAssociateList = (
  data:IPaqueteForCiclo,
  //onRemove: () => void
) => {
  const {paqueteToAssociate, setPaqueteToAssociate} = usePaqueteStore((state:PaqueteStore) => state)

  const [selected, setSelected] = useState(false)

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
  
    setPaqueteToAssociate(data)
    
  };

  useEffect(() => {
    setSelected(paqueteToAssociate?.id === data.id || false)
  },[paqueteToAssociate])



  return(

    <div onClick={(e) => handleSelect(e)} className={`border-2 transition-all ${selected ? ' border-lime-600': 'border-white'} cursor-pointer box-content bg-white shadow-sm rounded-lg p-3 mb-2 flex items-center justify-between`}>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-sm">Paquete: {data.identificador}</span>
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
    </div>
  )
}

export default PaqueteItemToAssociateList;