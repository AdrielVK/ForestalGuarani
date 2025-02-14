

import { useState, FormEvent } from 'react';
import { ILogin } from '../../models/interfaces/auth.interfaces';
import Button from '../../Components/ui/Button';
import Input from '../../Components/ui/Input';
import { AuthStore, useAuthStore } from '../../store/authStore';
import AuthLayout from './Layout';
import { useNavigate } from 'react-router-dom';


export default function LoginForm() {

  const [formData, setFormData] = useState<ILogin>({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const login = useAuthStore((state:AuthStore) => state.login);
  const loading:boolean = useAuthStore((state: AuthStore) => state.loading)
  const isAuth = useAuthStore((state:AuthStore) => state.isAuthenticated);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitr")
    await login(formData);
    if(isAuth){
      navigate('/')
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  label='Nombre de usuario'
                  id="username"
                  name="username"
                  value={formData.username}
                  required
                  onChange={handleChange}
                />
                
              </div>

              <div>
                
                <Input
                  label='Contrasena'
                  id='password'
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  required
                  onChange={handleChange}
                  additionalElement
                  togglePasswordVisibility={togglePasswordVisibility}
                  showPassword={showPassword}
                /> 
              </div>

              <div>
                <Button
                  text='Iniciar sesion'
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

