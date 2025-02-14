import { CheckCircle, ChevronDown, ChevronUp, Trash2, XCircle } from "lucide-react"
import { Posicion } from "../../models/interfaces/ingresos.interface"
import { useState } from "react"
import ButtonDumb from "../ui/ButtonDumb"
import { colors } from "../../models/ui.models"
import SetFreePosicionModal from "../Modals/SetFreePosicionModal"
import DeletePosicionModal from "../Modals/DeletePosicionModal"



const PosicionItem = ({id, identificador, ocupado }: Posicion) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const [openSetFreePos, setOpenSetFreePos] = useState(false)
  const [openDeletePos, setOpenDeletePos] = useState(false)

  const handleModalFreePos =  (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setOpenSetFreePos((open) => !open)
  }

  const handleModalDeletePos =  (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setOpenDeletePos((open) => !open)
  }
  
  return (
    <>
      <div onClick={() => setIsExpanded(!isExpanded)} className="bg-white box-border shadow-sm w-1/3 rounded-sm border border-lime-200 cursor-pointer p-4 m-2 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center">
        <div className="flex w-full">
          <div className="flex box-border w-1/2 justify-center items-center space-x-4">
            <span className="text-base text-gray-500">Identificador: <span className="font-bold text-gray-900">{identificador}</span></span>
          </div>
          <div className="flex box-border w-1/2 items-center justify-center">
            {ocupado ? (
              <div className="flex items-center text-red-500">
                <XCircle className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Ocupado</span>
              </div>
            ) : (
              <div className="flex items-center text-green-500">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Disponible</span>
              </div>
            )}
            {isExpanded ? (
              <ChevronUp className="ml-auto w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="ml-auto w-5 h-5 text-gray-500" />
            )}
          </div>

        </div>
          {
            isExpanded
            &&
            <div className="flex space-x-8 items-center mt-3 w-full">
              <ButtonDumb color={ocupado ? undefined : colors.disable} disabled={!ocupado} onClick={handleModalFreePos} text="Liberar posicion" />
              <ButtonDumb icon={<Trash2 size={18} className="mr-2"/>} color={colors.danger} onClick={handleModalDeletePos} text="Eliminar" />
            </div>
          }
      </div>
    {
      openSetFreePos && !openDeletePos
      ?
      <SetFreePosicionModal id={id} identificador={identificador} onClose={(e) => handleModalFreePos(e)}/>
      :
      !openSetFreePos && openDeletePos 
      ?
      <DeletePosicionModal id={id} identificador={identificador} onClose={(e) => handleModalDeletePos(e)}/>
      :
      <></>
    }
    </>
  )
}

export default PosicionItem

