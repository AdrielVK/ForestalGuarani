import { Trash } from "lucide-react";
import { OrdenDetail } from "../../models/interfaces/orden.interfaces"
import { useState } from "react";
import DeleteOrdenModal from "../Modals/DeleteOrdenModal";

const OrdenItemDetail = (
  data:OrdenDetail,
  //onRemove: () => void
) => {

  const [deleteModal, setDeleteModal] = useState(false)

  const handleModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setDeleteModal((value) => !value)
  }


  return(
    <>
    <div className=" bg-gray-100 hover:bg-lime-100 box-content m-4 border border-lime-400 rounded-lg p-3 ">
      <div className="space-y-5">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-sm">Orden #{data.numero}</span>
          <span className="text-xs text-gray-500">Vol: {data.volumen}</span>
        </div>
        <div className="text-md text-gray-600">
          <span className="mr-2">Acabado: {data.cabado.nombre}</span>
          <span>
            Cliente: {data.cliente.nombre} (#{data.cliente.numero})
          </span>
        </div>
        <div className="flex items-center">
          <div className={` md:w-1/3 w-1/2 text-center p-2 rounded-md text-white font-semibold text-xs ${data.planId ? 'bg-red-500' : 'bg-lime-500'}`} >
            {data.planId ? 'Asignado a plan' : 'No asignado'}
          </div>
          <button onClick={handleModal} className="cursor-pointer ml-auto rounded-full p-2 bg-gray-400 hover:bg-red-600 hover:shadow-sm hover:shadow-red-600 transition-all ">
            <Trash className="h-4 w-4 text-white" />
          </button>

        </div>
      </div>
    </div>
    {
      deleteModal &&
      <DeleteOrdenModal id={data.id} onClose={handleModal} numero={data.numero} />
    }
    </>

  )
}

export default OrdenItemDetail;