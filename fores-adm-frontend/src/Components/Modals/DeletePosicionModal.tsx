import Button from '../ui/Button';
import Modal from './Modal';
import { PosicionStore, usePosicionStore } from '../../store/posicionStore';
import { useDelete } from '../../hooks/useDelete';
import ButtonDumb from '../ui/ButtonDumb';
import { colors } from '../../models/ui.models';

interface Props {
  id: number;
  identificador: number;
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}


const DeletePosicionModal = ({id, identificador ,onClose}: Props) => {
  
  const {reFetchFlag, switchReFetchFlag } = usePosicionStore((state:PosicionStore) => state);


  const {deleteLoading, deleteAction} = useDelete<string>(`posicion/delete/${id}`)
  

  const handleDelete = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await deleteAction()

    switchReFetchFlag(!reFetchFlag)
    

  }

  return (
    <Modal onClose={onClose} title={`Seguro que desea eliminar la posicion ${identificador}?`}>
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

export default DeletePosicionModal;
