import { useEffect, useState } from "react";
import ButtonDumb from "../../Components/ui/ButtonDumb";
import Layout from "../Layouts/Layout"
import { colors } from "../../models/ui.models";
import { Filter, Layers2 } from "lucide-react";
import { FilterPaquete, IPaqueteDetail, StatsPaquetes } from "../../models/interfaces/paquete.interface";
import { PaqueteStore, primitiveFilter, usePaqueteStore } from "../../store/paqueteStore";
import FilterPaquetesModal from "../../Components/Modals/FilterPaquetesModal";
import { useGet } from "../../hooks/useGet";
import PaqueteListItem from "../../Components/Paquetes/PaqueteListItem";


const ListaPaquetePage: React.FC = () => {

  
  const { data, loading } = useGet<IPaqueteDetail[]>('paquete/list');
  const { filter, resetFilter,resetFilteredPaquetes, setPaquetes, paquetes, filteredPaquetes } = usePaqueteStore((state:PaqueteStore) => state) 
  
  const [paquetesData, setPaquetesData] = useState<IPaqueteDetail[]>(paquetes)

  const [stats, setStats] = useState<StatsPaquetes>({
    total: 0,
    volumen_total: 0,
  })

  useEffect(() => {
    if (!data) return 
    setPaquetes(data)
    setPaquetesData(paquetes)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  useEffect(() => {
    if (!isEqual(filter, primitiveFilter)) {
      setPaquetesData(filteredPaquetes)
    } else {
      setPaquetesData(paquetes)
    }
  },[filter, filteredPaquetes, paquetes])
  

  const [emptyFilter, setEmptyFilter] = useState<boolean>(filter === primitiveFilter)


  const handleResetFilter = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    resetFilter()
    resetFilteredPaquetes()
    setPaquetesData(paquetes)
    
  }

  const isEqual = (obj1: FilterPaquete, obj2: FilterPaquete) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  useEffect(() => {
    setEmptyFilter(isEqual(filter, primitiveFilter));

    setStats((prev) => ({
      ...prev,
      total: paquetesData.length,
      volumen_total: paquetesData.reduce((acc, paq) => acc + Number(paq.vol) || 0, 0)
    }))

  },[filter, paquetesData])


  const [openModal, setOpenModal] = useState(false);


  const handleModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent, value?:boolean) => {
    e.stopPropagation()
    if (value){
      setOpenModal(value)
    } else {
      setOpenModal(!openModal);
    }
  };

  

  return(
    <Layout>
      <section className="flex flex-col w-full mx-2 box-border">
        <div className="flex space-y-4 items-center mb-4 md:flex-row flex-col">
          <h1 className="text-3xl font-bold text-gray-900">Lista de paquetes</h1>
          <div className="md:ml-auto ml-0 md:flex-row md:space-y-0 space-y-4 flex-col flex space-x-2 md:justify-center md:items-center">
            <span className="w-40">
              <ButtonDumb onClick={(e) => handleResetFilter(e)} color={emptyFilter ? colors.disable: colors.danger} disabled={emptyFilter} text='Limpiar filtros' />
            </span>
            <span className="w-40">
              <ButtonDumb onClick={(e) => handleModal(e, true)} text="Filtrar" icon={<Filter className="mr-2" size={15} />} />
            </span>

          </div>
        </div>
        <header className="w-full bg-white mx-3 mb-4 rounded-lg ">
        <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
          <div className="bg-yellow-50 p-4 rounded-lg box-border w-full md:w-1/2">
            <div className="w-full mb-2 flex justify-center items-center">
              <Layers2 className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-700">Estadisticas</h2>
            </div>
            <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Total: {stats.total}</p>
            <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Volumen total {stats.volumen_total}</p>
          </div>
        </div>
        </header>
        {
          loading ?
          <p>Cargando...</p>
          :
          paquetesData && paquetesData.length > 0 && !loading ?
          paquetesData.map((paquete) => (
            <PaqueteListItem {...paquete} key={paquete.id}/>
          ))
          :
          <p>Sin paquetes existentes</p>
        }

      </section>
      {
        openModal &&
        <FilterPaquetesModal onClose={handleModal}/>
      }
    </Layout>
  )
}

export default ListaPaquetePage;