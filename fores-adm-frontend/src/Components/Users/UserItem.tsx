import { User, Mail, Shield } from 'lucide-react';
import { User as IUser } from '../../models/interfaces/auth.interfaces';
import ButtonDumb from '../ui/ButtonDumb';
import { useState } from 'react';
import ChangeRoleModal from '../Modals/RoleModal';
import { TraslateRole } from '../../utils/traslate-role';

interface Props {
  data: IUser;
  key: number;
}

const UserListItem = ( {data, key} : Props) => {
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <div key={key} className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{data.username}</h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className={`w-5 h-5 ${data.role === 'ADMIN' ? 'text-red-500' : 'text-blue-500'}`} />
          <span className="text-sm font-medium text-gray-700">{TraslateRole(data.role) }</span>
        </div>
        <span className='flex justify-center items-center space-x-1'>
          <Mail className="w-4 h-4 text-gray-400" />
          <p className="text-sm flex text-center text-gray-600">
            {data.email ? data.email : 'Email no seteado'}
          </p>
        </span>
        <span className='w-18'>
        <ButtonDumb text='Cambiar rol' onClick={handleModal}/>
        </span>
      </div>
      {
        modal && data.id &&
        <ChangeRoleModal name={data.username} idUser={data.id} role={data.role} onClose={handleModal} />
      }
    </div>
  );
};

export default UserListItem;

