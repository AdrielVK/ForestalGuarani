import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logonombreblanco.webp';
import { AuthStore, useAuthStore } from '../../store/authStore';
import { menuItems } from '../../utils/items-links-constants';
import Links from '../../utils/Links';
import { TraslateRole } from '../../utils/traslate-role';


const MobileNavbar: React.FC = () => {
  const logout = useAuthStore((state: AuthStore) => state.logout);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    return navigate('/login');
  };
  const user = useAuthStore((state:AuthStore) => state.user);


  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 right-0 bg-lime-600 text-white p-4 flex justify-between items-center z-50">
        <img src={logo} alt="Logo" className="h-8" />
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && user && (
        <div className="fixed inset-0 bg-lime-600 text-white z-40 mt-16 overflow-y-auto">
          <div className='mx-6 flex-wrap flex space-x-2 bg-white rounded-sm justify-center items-center'>
          <p className='text-lime-600 items-center'>{user.username}</p>
          <p className='text-lime-600 items-center font-semibold'>{TraslateRole(user.role)}</p>
        </div>
          {
            user &&
            <Links toogleMenu={toggleMenu} staticLinks={menuItems} userRole={user.role} />
          }
          
          <button
            onClick={handleLogout}
            className="fixed bottom-0 left-0 right-0 flex font-semibold items-center justify-center p-4 bg-lime-700 hover:bg-lime-800 transition-colors duration-200"
          >
            <LogOut size={20} className="mr-2" />
            Cerrar sesion
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;

