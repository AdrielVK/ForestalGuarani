import Button from '../ui/Button';
import Modal from './Modal';
import { useDelete } from '../../hooks/useDelete';
import ButtonDumb from '../ui/ButtonDumb';
import { colors } from '../../models/ui.models';
import { OrdenStore, useOrdenStore } from '../../store/ordenStore';

interface Props {
  id: number;
  numero: string;
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}


const DeleteOrdenModal = ({id, numero ,onClose}: Props) => {
  
  const { reFetch, reFetchHandler } = useOrdenStore((state:OrdenStore) => state);

  const {deleteLoading, deleteAction} = useDelete<string>(`orden/delete/${id}`)
  

  const handleDelete = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await deleteAction()
    
    reFetchHandler(!reFetch)
  }

  return (
    <Modal onClose={onClose} title={`Seguro que desea eliminar la orden ${numero}?`}>
      <div className='w-full flex space-x-6 justify-center'>
        <span className='w-1/3'>
          <Button loading={deleteLoading} color={colors.danger} onClick={(e) => {handleDelete(e)}} text="Eliminar"/>
        </span>
        <span className='w-1/3'>
          <ButtonDumb onClick={onClose} color={colors.disable} text="Cancelar"/>
        </span>
      </div>

    </Modal>
  );
};

export default DeleteOrdenModal;
