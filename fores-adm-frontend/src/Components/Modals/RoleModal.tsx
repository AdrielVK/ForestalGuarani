import { useEffect, useState } from 'react';
import { usePatch } from '../../hooks/usePatch';
import { ROLE, User } from '../../models/interfaces/auth.interfaces';
import { AuthStore, useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Modal from './Modal';

interface Props {
  idUser: number;
  role: ROLE;
  onClose: () => void;
  name: string;
}

interface reqRole {
  role: ROLE
}


const ChangeRoleModal = ({idUser, role, name, onClose}: Props) => {
  const reFetchValue = useAuthStore((state:AuthStore) => state.reFetchUsers)
  console.log(reFetchValue)

  const [fetch, setFetch] = useState<boolean>(reFetchValue)

  const {patchLoading, patchResponse, patch} = usePatch<User, reqRole>(`auth/role/change/${idUser}`)
  const reFetch = useAuthStore((state:AuthStore) => state.reFetchUserList)
  
  useEffect(() => {
    if (patchResponse) {
      console.log("patchResponse ha cambiado", patchResponse);
      reFetch(!fetch);
      setFetch(!fetch);
      onClose();
    }
  }, [patchResponse, fetch, reFetch, onClose]);
  
  const handlePatch = async (e:React.MouseEvent, role:ROLE) => {
    let newRole = ROLE.EDITOR
    if (role === ROLE.EDITOR){
      newRole = ROLE.READER
    }
    e.preventDefault()
    await patch({role:newRole})
    

  }

  return (
    <Modal onClose={onClose} title={`Cambiar rol de ${name}`}>
      
      <Button loading={patchLoading} onClick={(e) => {handlePatch(e, role)}} text={ role === ROLE.EDITOR ? 'Cambiar rol a LECTOR':'Cambiar rol a COLABORADOR'} />
      
    </Modal>
  );
};

export default ChangeRoleModal;
