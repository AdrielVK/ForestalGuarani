import Button from '../ui/Button';
import Modal from './Modal';
import { useDelete } from '../../hooks/useDelete';
import ButtonDumb from '../ui/ButtonDumb';
import { colors } from '../../models/ui.models';
import { CiclosStore, useCicloStore } from '../../store/cicloStore';

interface Props {
  id: number;
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}


const DeleteCicloModal = ({id,onClose}: Props) => {
  
  const { reFetch, handleReFetch } = useCicloStore((state:CiclosStore) => state);

  const {deleteLoading, deleteAction} = useDelete<string>(`ciclo/delete/${id}`)
  

  const handleDelete = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await deleteAction()
    
    handleReFetch(!reFetch)
  }

  return (
    <Modal onClose={onClose} title={`Seguro que desea eliminar el ciclo #${id}?`}>
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

export default DeleteCicloModal;
