import { useState } from "react";
import Input from "../../Components/ui/Input";
import { ICreateUser, User } from "../../models/interfaces/auth.interfaces";
import Layout from "../Layouts/Layout";
import Button from "../../Components/ui/Button";
import { usePost } from "../../hooks/usePost";


function AltaUsuariosPage () {

  const [user, setUser] = useState<Omit<ICreateUser, 'email'>>({username:'', password:''});
  const [rePass, setRePass] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
    setError(null)
  }
  const [showRePassword, setShowRePassword] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (rePass === user.password){
        await post(user)
      } else {
        setError('Las contrasenas deben coincidir')
      }
    } catch(error) {
      console.log(error)
    }
  }

  const {postLoading, post} = usePost<User, Omit<ICreateUser, 'email'>>('auth/register');


  return (
    <Layout>
      <form onSubmit={handleSubmit} className="w-1/2 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Usuario</h2>
        <div className="mb-4">

        <Input 
          type='text'
          id='username'
          label='Nombre de usuario'
          name='username'
          value={user.username}
          required
          onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-4">
          <Input 
            type={showPassword ? "text" : "password"}
            id='password'
            label='Contrasena del usuario'
            name={'password'}
            value={user.password}
            required
            onChange={(e) => onChange(e)}
            additionalElement
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
        </div>
        <div className="mb-4">
          <Input 
            type={showRePassword ? "text" : "password"}
            id='re_password'
            label='Confirma la contrasena'
            name='re_password'
            value={rePass}
            required
            onChange={(e) => {setRePass(e.target.value); setError(null)}}
            additionalElement
            togglePasswordVisibility={toggleRePasswordVisibility}
            showPassword={showRePassword}
          />
        </div>
        <div className="mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
        <Button
          text="Crear usuario"
          loading={postLoading}
        />
      </form>
    </Layout>
  )
}

export default AltaUsuariosPage;