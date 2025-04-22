import { useEffect, useState } from "react"
import Layout from "../Layouts/Layout"
import { ChangePasswordRequest, ChangePasswordState } from "../../models/interfaces/auth.interfaces"
import Input from "../../Components/ui/Input"
import Button from "../../Components/ui/Button"
import { colors } from "../../models/ui.models"
import { usePatch } from "../../hooks/usePatch"
import { AuthStore, useAuthStore } from "../../store/authStore"

const CambiarContrasenaPage = () => {
  const {patchLoading, patch} = usePatch<string, ChangePasswordRequest>('auth/change/password')
  
  const {user} = useAuthStore((state: AuthStore) => state)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onError && user?.id){
      patch({oldPassword:formData.password, id:user.id, newPassword: formData.newPassword})
      setFormData({
        password: '',
        newPassword: '',
        reNewPassword: ''
      })
    }
  }


  const [formData, setFormData] = useState<ChangePasswordState>({
    password: '',
    newPassword: '',
    reNewPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const [onError, setOnError] = useState(false)

  useEffect(() => {
    if (formData.reNewPassword !== formData.newPassword) {
      setOnError(true)
    } else {
      setOnError(false)
    }
  }, [formData.reNewPassword, formData.newPassword])

  return (
    <Layout>
      <section className="box-border w-full flex h-full justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
          <h2 className="font-bold text-xl">Cambiar contrasena</h2>
          
            <Input 
              label="Contrasena actual"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
            />

          
          
          <Input
            error={onError}
            errorMsg="Las contrasenas no coinciden" 
            label="Nueva contrasena"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            type="password"
          />
          <Input 
            error={onError}
            errorMsg="Las contrasenas no coinciden"
            label="Confirmar nueva contrasena"
            id="reNewPassword"
            name="reNewPassword"
            value={formData.reNewPassword}
            onChange={handleChange}
            required
            type="password"
          />

          <Button text="Cambiar contrasena" loading={patchLoading} type="submit" disabled={onError} color={ onError ? colors.disable : undefined}/>
        </form>
      </section>
    </Layout>
  )
}

export default CambiarContrasenaPage;