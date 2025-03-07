import { Orden } from "../../models/interfaces/orden.interfaces"
import { useState } from "react"
import { OrdenStore, useOrdenStore } from "../../store/ordenStore"

const OrdenItemToAssociateList = (
  data:Orden,
  //onRemove: () => void
) => {
  const {addToPrevOrdenList, removeFromPrevOrdenList} = useOrdenStore((state:OrdenStore) => state)

  const [selected, setSelected] = useState(false)

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
  
    setSelected((prevSelected) => {
      const newSelected = !prevSelected;
  
      if (newSelected) {
        addToPrevOrdenList(data);
      } else {
        removeFromPrevOrdenList(data.id);
      }
  
      return newSelected;
    });
  };



  return(

    <div onClick={(e) => handleSelect(e)} className={` ${selected ? 'border-2 border-lime-600': ''} cursor-pointer box-content bg-white shadow-sm rounded-lg p-3 mb-2 flex items-center justify-between`}>
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
    </div>
  )
}

export default OrdenItemToAssociateList;