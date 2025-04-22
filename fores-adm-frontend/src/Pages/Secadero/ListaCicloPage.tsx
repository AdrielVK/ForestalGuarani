import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { CicloStats, FilterCiclos, ICicloSecadero } from "../../models/interfaces/ciclo.interfaces";
import Layout from "../Layouts/Layout";
import FilterCicloModal from "../../Components/Modals/FilterCicloModal";
import ButtonDumb from "../../Components/ui/ButtonDumb";
import { Filter, Layers2 } from "lucide-react";
import { CiclosStore, defaultFilterCiclos, useCicloStore } from "../../store/cicloStore";
import { colors } from "../../models/ui.models";
import CicloSecaderoListItem from "../../Components/Ciclo/CicloSecadoItemList";

const ListaCicloPage = () => {

  const { resetFilter, resetFilteredCiclos, setCiclos, ciclos,filter, filteredCiclos, reFetch } = useCicloStore((state:CiclosStore) => state)
  const { data, loading } = useGet<ICicloSecadero[]>('ciclo/list', reFetch)
  const [openModal, setOpenModal] = useState(false)
  const [ciclosData, setCicloData] = useState<ICicloSecadero[]>(data ?? [])

  const [emptyFilter, setEmptyFilter] = useState<boolean>(filter === defaultFilterCiclos)
  

  const isEqual = (obj1: FilterCiclos, obj2: FilterCiclos) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const [stats, setStats] = useState<CicloStats>({total: 0, volumenPaquetes: 0})

  useEffect(() => {
    if (!data) return
    setCiclos(data)
    setCicloData(data)
  }, [ciclos, data, reFetch])

  useEffect(() => {
    if (!isEqual(filter, defaultFilterCiclos)) {
      if (filteredCiclos.length > 0){
        setCicloData(filteredCiclos)
      }
    }
  },[filter, filteredCiclos])

  const handleModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setOpenModal((prev) => !prev)
  }

  const handleResetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    resetFilter()
    resetFilteredCiclos()
    setCicloData(ciclos)
  }

  useEffect(() => {
    setEmptyFilter(isEqual(filter, defaultFilterCiclos));

    setStats((prev) => ({
      ...prev,
      total: ciclosData.length,
      volumen_total: ciclosData.reduce((acc, paq) => acc + Number(paq.paquete?.vol) || 0, 0)
    }))

  },[ciclosData, filter])

  return (
    <Layout>
      <section className="flex flex-col w-full mx-2 box-border">
      <div className="flex space-y-4 items-center mb-4 md:flex-row flex-col">
        <h1 className="text-3xl font-bold text-gray-900">Lista de ciclos de secado</h1>
        <div className="md:ml-auto ml-0 md:flex-row md:space-y-0 space-y-4 flex-col flex md:space-x-2 md:justify-center md:items-center">
          <span className="w-40">
            <ButtonDumb onClick={handleResetFilter} color={emptyFilter ? colors.disable: colors.danger} text="Limpiar filtros" />
          </span>
          <span className="w-40">
            <ButtonDumb onClick={handleModal} text="Filtrar" icon={<Filter className="mr-2" size={15} />} />
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
          <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Volumen total de paquetes {stats.volumenPaquetes}</p>
        </div>
      </div>
      </header>
      {
        loading ? 
        <p>Cargando...</p>
        :
        ciclosData && ciclosData.length > 0 && !loading ?
          
        ciclosData.map((ciclo, index) => (
          <CicloSecaderoListItem ciclo={ciclo} key={index} />
        ))
      
        :
        <p>Sin ciclos realizados</p>
      }
      </section>
      {
        openModal
        &&
        <FilterCicloModal onClose={handleModal} />
      }
    </Layout>
  )
}

export default ListaCicloPage;
