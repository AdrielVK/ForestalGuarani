import { useEffect, useState } from "react"
import { useGet } from "../../hooks/useGet"
import Modal from "./Modal"
import Pagination from "../Pagination/Pagination"
import ButtonDumb from "../ui/ButtonDumb"
import { PosicionStock } from "../../models/interfaces/ingresos.interface"
import { ConsumoStore, useConsumoStore } from "../../store/consumoStore"
import ConsumoItemList from "../Consumo/ConsumoItemList"

const AssociateConsumoModal = ({
  onClose,
}: {
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void
}) => {
  const { data, loading } = useGet<PosicionStock[]>("posicion/list/stock")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [dataRender, setDataRender] = useState<PosicionStock[]>(data ?? [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  //const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const {consumoList, prevConsumoList, addToConsumoList, resetPrevConsumoList} = useConsumoStore((state:ConsumoStore) => state);

  useEffect(() => {
    const filteredData = data?.filter(
      (orden) =>
        !consumoList.some((item) => item.id === orden.id)
      ) ?? [];
    
    setDataRender(filteredData.slice(indexOfFirstItem, indexOfLastItem)); // Aplicar paginación correctamente
  }, [data, indexOfFirstItem, indexOfLastItem, consumoList]);
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    for (const consumo of prevConsumoList) {
      addToConsumoList(consumo)
    }
    resetPrevConsumoList()
    onClose(e)
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    resetPrevConsumoList()
    onClose(e)
  }


  return (
    <Modal onClose={(e) => handleClose(e)} title="Asociar orden">
      {loading ? (
        <p>Cargando...</p>
      ) : dataRender.length > 0 ? (
        dataRender.map((item) => <ConsumoItemList {...item} key={item.id} />)
      ) : (
        <p className="w-full text-center mb-5">Sin posiciones disponibles...</p>
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

export default AssociateConsumoModal

