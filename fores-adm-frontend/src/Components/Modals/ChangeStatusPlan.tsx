import Button from '../ui/Button';
import Modal from './Modal';
import ButtonDumb from '../ui/ButtonDumb';
import { colors } from '../../models/ui.models';
import { usePost } from '../../hooks/usePost';
import { ConsumoStore, useConsumoStore } from '../../store/consumoStore';

interface Props {
  id: number;
  value: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}


const ChangeStatusPlan = ({id, value ,onClose}: Props) => {
  
  const {reFetch, reFetchHandler } = useConsumoStore((state:ConsumoStore) => state);


  const {postLoading, post} = usePost<{message: string}, {value: boolean}>(`plan/change/status/${id}`)
  

  const handleChange = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await post({value: !value})

    reFetchHandler(!reFetch)
    

  }

  return (
    <Modal onClose={onClose} title={`Cambiar estatus del plan a ${ value ? 'No activo': 'Activo'}`}>
      <div className='w-full flex space-x-6 justify-center'>
        <span className='w-1/3'>
          <Button loading={postLoading} color={colors.danger} onClick={(e) => {handleChange(e)}} text="Cambiar"/>
        </span>
        <span className='w-1/3'>
          <ButtonDumb onClick={onClose} color={colors.disable} text="Cancelar"/>
        </span>
      </div>

    </Modal>
  );
};

export default ChangeStatusPlan;
