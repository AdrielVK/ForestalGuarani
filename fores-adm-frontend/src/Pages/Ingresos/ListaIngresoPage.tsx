import { useEffect, useState } from "react";
import IngresoListItem from "../../Components/Ingresos/IngresoItem";
import ButtonDumb from "../../Components/ui/ButtonDumb";
import { useGet } from "../../hooks/useGet";
import { IngresoDetail, IngresosStats } from "../../models/interfaces/ingresos.interface";
import { defaultFilter, IngresoStore, useIngresoStore } from "../../store/ingresoStore";
import Layout from "../Layouts/Layout"
import Switch from 'react-switch';
import { colors } from "../../models/ui.models";
import { Filter, Layers2, SquareChartGantt } from "lucide-react";
import FilterIngresoModal from "../../Components/Modals/FilterIngresoModal";

export interface IFilterIngresos {
  startDate: string | null;
  endDate: string | null;
  nombre: string | null;
  tipo: string | null;
  longitud: number | null;
  diametro: number | null;
  fuente_controlada: boolean | null;
  chofer: string | null;
  patente: string | null;
  peso: number | null;
}

const ListaIngresoPage: React.FC = () => {

  const isEqual = (obj1: IFilterIngresos, obj2: IFilterIngresos) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };
  
  const { data, loading } = useGet<IngresoDetail[]>('ingresos/list');
  const { viewDetail,filteredIngresos, ingresos, setIngresos, filter, switchViewDetalles, resetFilteredIngresos, resetFilter } = useIngresoStore((state:IngresoStore) => state) 
  
  const [stats, setStats] = useState<IngresosStats>({
    total: 0,
    fuente_controlada: 0,
    fuente_no_controlada: 0,
    peso_total: 0,
    peso_controlada: 0,
    peso_no_controlada: 0,
  })

  useEffect(() => {
    if (!data) return 
    setIngresos(data)
    setIngresosData(data)
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  useEffect(() => {
    if (!isEqual(filter, defaultFilter)) {
      if (filteredIngresos.length > 0) {
        setIngresosData(filteredIngresos);
      }
    }
  }, [filter, filteredIngresos]);

  const [ingresosData, setIngresosData] = useState<IngresoDetail[]>(ingresos)
  

  const [emptyFilter, setEmptyFilter] = useState<boolean>(filter === defaultFilter)
  
  const handleViewDetalles = () => {
    switchViewDetalles(!viewDetail);
  };

  const handleResetFilter = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    resetFilter()
    resetFilteredIngresos()
    setIngresosData(ingresos)

    
  }

  useEffect(() => {
    setEmptyFilter(isEqual(filter, defaultFilter));

    const fuenteControladaData = ingresosData.filter((ingreso) => ingreso.fuente_controlada === true) 
    const fuenteNoControladaData = ingresosData.filter((ingreso) => ingreso.fuente_controlada === false) 


    setStats((prevStats) => ({
      ...prevStats,
      total: ingresosData.length,
      fuente_controlada: fuenteControladaData.length,
      fuente_no_controlada: fuenteNoControladaData.length,
      peso_total: ingresosData.reduce((acc, ingreso) => acc + ingreso.remito.peso, 0),
      peso_controlada: fuenteControladaData.reduce((acc, ingreso) => acc + ingreso.remito.peso, 0),
      peso_no_controlada: fuenteNoControladaData.reduce((acc, ingreso) => acc + ingreso.remito.peso, 0),
    }))

  }, [filter, ingresosData]);

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
        <h1 className="text-3xl font-bold text-gray-900">Lista de ingresos</h1>
        <span className="md:ml-auto ml-0 md:flex-row md:space-y-0 space-y-4 flex-col flex space-x-2 md:justify-center md:items-center">
          <label className="text-gray-500 text-sm flex flex-row w-full items-center md:justify-center">
            Ver ingresos en detalle
            <Switch
              onChange={handleViewDetalles}
              checked={viewDetail}
              offColor="#ccc"
              onColor="#65a30d"
              className="items-center mx-1 justify-center"
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </label>
          <ButtonDumb onClick={(e) => handleResetFilter(e)} color={emptyFilter ? colors.disable: colors.danger} disabled={emptyFilter} text='Limpiar filtros' />
          <ButtonDumb onClick={(e) => handleModal(e, true)} text="Filtrar" icon={<Filter className="mr-2" size={15} />} />

        </span>
      </div>
      <header className="w-full bg-white mx-3 mb-4 rounded-lg ">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Ingresos</h1>
        <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
          <div className="bg-blue-50 p-4 rounded-lg box-border w-full md:w-1/2">
            <div className="flex items-center mb-2">
              <SquareChartGantt className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Total de ingresos </h2>
              <p className="ml-4 text-3xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="flex w-full items-center mb-2">
              <p className="text-lg ml-8 font-semibold text-gray-700">Ingresos fuente controlada:</p>

              <p className="text-xl font-bold ml-4 text-blue-600">{stats.fuente_controlada}</p>
            
              <span className="ml-auto text-base font-bold text-lime-700">{(stats.fuente_controlada * 100 / stats.total).toFixed(1)}%</span>

            </div>
            <div className="flex w-full items-center mb-2">
              <p className="text-lg ml-8 font-semibold text-gray-700">Ingresos fuente no controlada:  </p>

              <p className="text-xl font-bold ml-4 text-blue-600">{stats.fuente_no_controlada}</p>
            
              <span className="ml-auto text-base font-bold text-lime-700">{(stats.fuente_no_controlada * 100 / stats.total).toFixed(1)}%</span>

            </div>
            
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg box-border w-full md:w-1/2">
            <div className="w-full mb-2 flex justify-center items-center">
              <Layers2 className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-700">Estadisticas</h2>
            </div>
            <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Peso total: {stats.peso_total}</p>
            <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Peso fuente controlada {stats.peso_controlada}</p>
            <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Peso fuente controlada {stats.peso_no_controlada}</p>
          </div>
        </div>
      </header>
      {openModal && <FilterIngresoModal onClose={(e) => handleModal(e, false)} />}
      {
        loading ? 
        <p>Cargando...</p>
        :
        ingresosData.length > 0 ?
          
        ingresosData.map((ingreso, index) => (
          <IngresoListItem {...ingreso} key={index} />
        ))
      
        :
        <p>Sin ingresos realizados</p>
      }
      </section>
    </Layout>
  )
}

export default ListaIngresoPage;