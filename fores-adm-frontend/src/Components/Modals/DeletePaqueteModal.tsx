import Button from '../ui/Button';
import Modal from './Modal';
import { useDelete } from '../../hooks/useDelete';
import ButtonDumb from '../ui/ButtonDumb';
import { colors } from '../../models/ui.models';
import { PaqueteStore, usePaqueteStore } from '../../store/paqueteStore';
interface Props {
  id: number;
  numero: string;
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}


const DeletePaqueteModal = ({id, numero ,onClose}: Props) => {
  
  const { removePaquete } = usePaqueteStore((state:PaqueteStore) => state);

  const {deleteLoading, deleteAction} = useDelete<string>(`paquete/delete/${id}`)
 
  const handleDelete = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await deleteAction()
    removePaquete(id)
  }

  return (
    <Modal onClose={onClose} title={`Seguro que desea eliminar el paquete ${numero}?`}>
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

export default DeletePaqueteModal;
