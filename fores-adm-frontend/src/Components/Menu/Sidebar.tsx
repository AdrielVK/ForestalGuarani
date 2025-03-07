
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logonombreblanco.webp';
import { AuthStore, useAuthStore } from '../../store/authStore';
import { menuItems } from '../../utils/items-links-constants';
import Links from '../../utils/Links';



const SidebarMenu: React.FC = () => {
  const user = useAuthStore((state:AuthStore) => state.user);
  const logout = useAuthStore((state:AuthStore) => state.logout);
  const navigate = useNavigate();
  //const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  
  /*const toggleItem = (title: string) => {
    setExpandedItems(prev => ({ ...prev, [title]: !prev[title] }));
  };*/

  const handleLogout = async () => {
    await logout()
    return navigate('/login')
  };

  return (
    <div className="hidden lg:flex flex-col h-screen bg-lime-600 text-white w-64 fixed left-0 top-0 overflow-y-auto">
      <figure className='flex justify-center items-center'>
        <img 
          src={logo}
          className='m-6 w-32'
        />
      </figure>
      <div className='mx-6 flex-wrap flex space-x-2 bg-white rounded-sm justify-center items-center'>
        <p className='text-lime-600 items-center'>{user?.username}</p>
        <p className='text-lime-600 items-center font-semibold'>{user?.role}</p>
      </div>
      {
        user &&
        <Links staticLinks={menuItems} userRole={user?.role}/>
      }
      <button
        onClick={handleLogout}
        className="flex font-semibold items-center justify-center p-4 bg-lime-700 hover:bg-lime-800 transition-colors duration-200"
      >
        <LogOut size={20} className="mr-2" />
        Cerrar sesion
      </button>
    </div>
  );
};

export default SidebarMenu;

