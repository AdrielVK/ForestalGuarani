import { useState } from "react"
import {  PosicionStock } from "../../models/interfaces/ingresos.interface"
import { ConsumoStore, useConsumoStore } from "../../store/consumoStore"

const ConsumoItemList = (
  data: PosicionStock,
  //onRemove: () => void
) => {
  const {addToPrevConsumoList, removeFromPrevConsumoList} = useConsumoStore((state:ConsumoStore) => state)

  const [selected, setSelected] = useState(false)

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
  
    setSelected((prevSelected) => {
      const newSelected = !prevSelected;
  
      if (newSelected) {
        addToPrevConsumoList(data);
      } else {
        removeFromPrevConsumoList(data.id);
      }
  
      return newSelected;
    });
  };



  return(

    <div onClick={(e) => handleSelect(e)} className={` ${selected ? 'border-2 border-lime-600': ''} cursor-pointer box-content bg-gray-100 shadow-sm rounded-lg p-3 mb-2 flex items-center justify-between`}>
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
    </div>
  )
}

export default ConsumoItemList;