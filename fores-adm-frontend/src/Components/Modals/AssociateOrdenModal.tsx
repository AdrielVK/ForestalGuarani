import { useEffect, useState } from "react"
import { useGet } from "../../hooks/useGet"
import type { Orden } from "../../models/interfaces/orden.interfaces"
import OrdenItemToAssociateList from "../Orden/OrdenItemToAssociateList"
import Modal from "./Modal"
import Pagination from "../Pagination/Pagination"
import ButtonDumb from "../ui/ButtonDumb"
import { OrdenStore, useOrdenStore } from "../../store/ordenStore"

const AssociateOrdenModal = ({
  onClose,
}: {
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void
}) => {
  const { data, loading } = useGet<Orden[]>("orden/list/free")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [dataRender, setDataRender] = useState<Orden[]>(data ?? [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  //const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const { prevOrdenList, addToOrdenList, resetPrevOrdenList, ordenList} = useOrdenStore((state:OrdenStore) => state);

  useEffect(() => {
    const filteredData = data?.filter(
      (orden) =>
        !ordenList.some((item) => item.id === orden.id)
      ) ?? [];
    
    setDataRender(filteredData.slice(indexOfFirstItem, indexOfLastItem)); // Aplicar paginación correctamente
  }, [prevOrdenList, data, ordenList, indexOfFirstItem, indexOfLastItem]);
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    for (const ord of prevOrdenList) {
      addToOrdenList(ord)
    }
    resetPrevOrdenList()
    onClose(e)
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    resetPrevOrdenList()
    onClose(e)
  }


  return (
    <Modal onClose={(e) => handleClose(e)} title="Asociar orden">
      {loading ? (
        <p>Cargando...</p>
      ) : dataRender.length > 0 ? (
        dataRender.map((item) => <OrdenItemToAssociateList {...item} key={item.id} />)
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

export default AssociateOrdenModal

