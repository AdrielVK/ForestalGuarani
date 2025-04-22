import { usePatch } from '../../hooks/usePatch';
import Button from '../ui/Button';
import Modal from './Modal';
import { PosicionStore, usePosicionStore } from '../../store/posicionStore';
import { Posicion } from '../../models/interfaces/ingresos.interface';

interface Props {
  id: number;
  identificador: number;
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}


const SetFreePosicionModal = ({id, identificador ,onClose}: Props) => {
  
  const {reFetchFlag, switchReFetchFlag } = usePosicionStore((state:PosicionStore) => state);


  const {patchLoading, patch} = usePatch<Posicion, undefined>(`posicion/patch/${id}`)
  

  const handlePatch = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await patch(undefined)
    switchReFetchFlag(!reFetchFlag)
  }

  return (
    <Modal onClose={onClose} title={`Liberar posicion ${identificador}`}>
      <p className='text-sm mb-5 text-center text-red-600'>
        Atencion: de liberar la posicion, el equipo asignado a la misma quedara libre sin ninguna posicion.
        Asegurece de matener una consistencia en la informacion en el modulo de equipos
      </p>
      <Button loading={patchLoading} onClick={(e) => {handlePatch(e)}} text="Liberar"/>
      
    </Modal>
  );
};

export default SetFreePosicionModal;
