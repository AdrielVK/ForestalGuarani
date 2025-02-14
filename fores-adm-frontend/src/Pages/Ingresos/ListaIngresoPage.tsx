import { useEffect, useState } from "react";
import IngresoListItem from "../../Components/Ingresos/IngresoItem";
import ButtonDumb from "../../Components/ui/ButtonDumb";
import { useGet } from "../../hooks/useGet";
import { IngresoDetail } from "../../models/interfaces/ingresos.interface";
import { defaultFilter, IngresoStore, useIngresoStore } from "../../store/ingresoStore";
import Layout from "../Layouts/Layout"
import Switch from 'react-switch';
import { colors } from "../../models/ui.models";
import { Filter } from "lucide-react";
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
  
  useEffect(() => {
    if (data) {
      setIngresos(data)
      setIngresosData(ingresos)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  useEffect(() => {
    if (!isEqual(filter, defaultFilter)) {
      setIngresosData(filteredIngresos)
    }
  },[filter, filteredIngresos, setIngresos])

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
  }, [filter]);

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
      {openModal && <FilterIngresoModal onClose={(e) => handleModal(e, false)} />}
      {
        loading ? 
        <p>Cargando...</p>
        :
        ingresosData && ingresosData.length > 0 && !loading ?
          
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