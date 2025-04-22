import { useEffect, useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Pedido } from '../../models/interfaces/pedidos.interface';
import { PedidoStore, usePedidoStore } from '../../store/pedidoStore';
import Button from '../ui/Button';
import { colors } from '../../models/ui.models';
import Modal from '../Modals/Modal';
import ButtonDumb from '../ui/ButtonDumb';
import { useDelete } from '../../hooks/useDelete';




const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return isValid(date) ? format(date, 'dd/MM/yyyy') : 'Fecha inválida';
};

const PedidoListItem: React.FC<Pedido> = ({ id, fecha, proveedor, equipos = [] }) => {
  const viewDetalles = usePedidoStore((state:PedidoStore) => state.viewDetalles);
  const [isExpanded, setIsExpanded] = useState(viewDetalles);
  const totalRollisos = equipos.reduce((sum, equipo) => sum + (equipo.rolliso? 1 : 0), 0);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const { deleteLoading, deleteAction} = useDelete<string>(`/pedidos/${id}`);

  const removePedido = usePedidoStore((state:PedidoStore) => state.removePedido)

  const handleOpenModal = (e:React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setOpenDeleteModal(!openDeleteModal)
  }

  const handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteAction()
    removePedido(id)
    setOpenDeleteModal(false)
  } 

  const handleExpand = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded )
  }

  useEffect(() => {
    setIsExpanded(viewDetalles)
  },[viewDetalles])

  return (
    <>
      <div className="bg-gray-50  border border-lime-500 shadow-sm rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out">
        <div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer" 
          onClick={(e) => handleExpand(e)}
        >
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">Pedido #{id}</h3>
            <p className="text-sm text-gray-600">{proveedor.nombre}</p>
          </div>
          <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-sm text-gray-500 mr-4">{formatDate(fecha)}</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <p className="text-sm text-gray-700">Total equipos: {equipos.length}</p>
              <p className="text-sm text-gray-700">Total rollisos: {totalRollisos}</p>
            </div>
            
            {equipos.map((equipo, index) => (
              
                <div key={index} className="mb-4 bg-gray-50 p-3 rounded-md">
                  <h4 className="text-md font-medium text-gray-700 mb-2">Equipo #{equipo.id}</h4>
                  {equipo.rolliso ? (
                    <div className="overflow-x-auto -mx-3">
                      <table className="min-w-full table-auto text-sm">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-2 py-1 text-left">ID</th>
                            <th className="px-2 py-1 text-left">Diámetro</th>
                            <th className="px-2 py-1 text-left">Longitud</th>
                            <th className="px-2 py-1 text-left">Tipo</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                            <tr key={equipo.rolliso.id} className="border-b border-gray-200">
                              <td className="px-2 py-1">{equipo.rolliso.id}</td>
                              <td className="px-2 py-1">{equipo.rolliso.diametro}</td>
                              <td className="px-2 py-1">{equipo.rolliso.longitud}</td>
                              <td className="px-2 py-1">{equipo.rolliso.tipo}</td>
                            </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No hay rollisos para este equipo.</p>
                  )}
                </div>
              
            ))}
            <div className='w-20'>
              <ButtonDumb onClick={handleOpenModal} color={colors.danger} text='Eliminar' />

            </div>
          </div>
        )}
      </div>
      {
        openDeleteModal &&
        <Modal title='¿Seguro que desea eliminar el pedido?' onClose={e => handleOpenModal(e)}>
          <div className='flex flex-col space-y-2 md:space-y-0 md:space-x-4 min-w-40 md:flex-row '>
            <ButtonDumb text='Cancelar' color={colors.disable} onClick={handleOpenModal}/>
            <Button text='Confirmar' color={colors.danger} loading={deleteLoading} onClick={e => handleDelete(e)}/>
          </div>
        </Modal>
      }
    </>

  );
};

export default PedidoListItem;

