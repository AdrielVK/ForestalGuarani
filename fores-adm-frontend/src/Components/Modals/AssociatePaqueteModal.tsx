import { useEffect, useState } from "react"
import { useGet } from "../../hooks/useGet"
import Modal from "./Modal"
import Pagination from "../Pagination/Pagination"
import ButtonDumb from "../ui/ButtonDumb"
import { IPaqueteForCiclo } from "../../models/interfaces/paquete.interface"
import { PaqueteStore, usePaqueteStore } from "../../store/paqueteStore"
import PaqueteItemToAssociateList from "../Paquetes/PaqueteItemToAssociateList"

const AssociatePaqueteModal = ({
  onClose,
}: {
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void
}) => {
  const { data, loading } = useGet<IPaqueteForCiclo[]>("paquete/list/free/ciclo")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [dataRender, setDataRender] = useState<IPaqueteForCiclo[]>(data ?? [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  //const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const { resetPaqueteToAssociate} = usePaqueteStore((state:PaqueteStore) => state);

  useEffect(() => {

    if (data){
      setDataRender(data.slice(indexOfFirstItem, indexOfLastItem)) // Aplicar paginación correctamente
    }
  }, [data, indexOfFirstItem, indexOfLastItem]);
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClose(e)
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    resetPaqueteToAssociate()
    onClose(e)
  }


  return (
    <Modal onClose={(e) => handleClose(e)} title="Asociar orden">
      {loading ? (
        <p>Cargando...</p>
      ) : dataRender.length > 0 ? (
        dataRender.map((item) => <PaqueteItemToAssociateList {...item} key={item.id} />)
      ) : (
        <p className="w-full text-center mb-5">Sin órdenes disponibles...</p>
      )}
      {
        dataRender && dataRender.length > 0  && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={dataRender.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )

      }
      <ButtonDumb text="Aceptar" onClick={handleSubmit}/>
    </Modal>
  )
}

export default AssociatePaqueteModal

