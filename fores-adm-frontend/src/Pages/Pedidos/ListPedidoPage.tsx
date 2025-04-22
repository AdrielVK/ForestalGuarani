import  { useState, useEffect } from 'react';
import PedidoList from '../../Components/Pedidos/PedidoList';
import Layout from '../Layouts/Layout';
import { useGet } from '../../hooks/useGet';
import { Pedido } from '../../models/interfaces/pedidos.interface';
import ButtonDumb from '../../Components/ui/ButtonDumb';
import { Filter } from 'lucide-react';
import PedidoFilterModal from '../../Components/Modals/FilterPedidoModal';
import Switch from 'react-switch';
import { PedidoStore, primitiveFilter, usePedidoStore } from '../../store/pedidoStore';
import { colors } from '../../models/ui.models';

export interface IFilter {
  startDate: string;
  endDate: string;
  nombre: string | null;
  tipo: string | null;
  longitud: string | null;
  diametro: string | null;
}

const ListPedidoPage = () => {

  const { data, loading } = useGet<Pedido[]>('pedidos/list');
  const { viewDetalles, switchViewDetalles, setPedidos, pedidos } = usePedidoStore((state: PedidoStore) => state);

  

  useEffect(() => {
    if (data) {
      setPedidos(data);
      resetFilteredPedidos() 
      setFilterState(primitiveFilter)
      setPedidosData(pedidos)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setPedidosData(pedidos)
    
  },[pedidos])

  const [pedidosData, setPedidosData] = useState<Pedido[]>(pedidos)

  const filterState = usePedidoStore((state:PedidoStore) => state.filter)
  const [openModal, setOpenModal] = useState(false);
  const resetFilteredPedidos = usePedidoStore((state:PedidoStore) => state.resetFilteredPedidos)
  const setFilterState = usePedidoStore((state:PedidoStore) => state.setFilter)
  
  const filteredPedidos = usePedidoStore((state:PedidoStore) => state.filteredPedidos)
  
  
  useEffect(() => {
    if (!isEqual(filterState, primitiveFilter)) {
      setPedidosData(filteredPedidos)
    }
  },[filterState, filteredPedidos])

  const handleResetFilter = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setFilterState(primitiveFilter)
    setPedidosData(pedidos)
    resetFilteredPedidos()
  }

  const handleViewDetalles = () => {
    switchViewDetalles(!viewDetalles);
  };

  const handleModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent, value?:boolean) => {
    e.stopPropagation()
    if (value){
      setOpenModal(value)
    } else {
      setOpenModal(!openModal);
    }
  };
  
  

  const isEqual = (obj1: IFilter, obj2: IFilter) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };
  
  useEffect(() => {
    setEmptyFilter(isEqual(filterState, primitiveFilter));
  }, [filterState]);

  useEffect(() => {
    console.log(data)
  }, [data])
  
  const [emptyFilter, setEmptyFilter] = useState<boolean>(filterState === primitiveFilter)

  
  return (
    <Layout>
      <div className="container md:mx-auto md:px-4 py-8">
        <div className="flex space-y-4 items-center mb-4 md:flex-row flex-col">
          <h1 className="text-3xl font-bold text-gray-900">Lista de Pedidos</h1>
          <span className="md:ml-auto ml-0 md:flex-row md:space-y-0 space-y-4 flex-col flex space-x-2 md:justify-center md:items-center">
            <label className="text-gray-500 text-sm flex flex-row w-full items-center md:justify-center">
              Ver pedidos en detalle
              <Switch
                onChange={handleViewDetalles}
                checked={viewDetalles}
                offColor="#ccc"
                onColor="#65a30d"
                className="items-center justify-center"
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </label>
            <ButtonDumb onClick={(e) => handleResetFilter(e)} color={emptyFilter ? colors.disable: colors.danger} disabled={emptyFilter} text='Limpiar filtros' />
            <ButtonDumb onClick={(e) => handleModal(e, true)} text="Filtrar" icon={<Filter className="mr-2" size={15} />} />
          </span>
        </div>
        {openModal && <PedidoFilterModal onClose={(e) => handleModal(e, false)} />}
        {loading ? (
          <p>Cargando...</p>
        ) : pedidosData.length > 0 ? (
          <>
            <PedidoList pedidos={pedidosData} />
          </>
        ) : (
          <>

            <p className='mt-12'>No hay pedidos realizados</p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ListPedidoPage;
