
import { useEffect, useState } from "react"
import { Package } from "lucide-react"
import Input from "../../Components/ui/Input"
import Layout from "../Layouts/Layout"
import { obtenerFechaHora } from "../../utils/get-date"
import Button from "../../Components/ui/Button"
import { usePost } from "../../hooks/usePost"
import ButtonDumb from "../../Components/ui/ButtonDumb"
import { CreateCicloRequest, CreateCicloRequestState } from "../../models/interfaces/ciclo.interfaces"
import { PaqueteStore, usePaqueteStore } from "../../store/paqueteStore"
import AssociatePaqueteModal from "../../Components/Modals/AssociatePaqueteModal"
import PaqueteItemToCiclo from "../../Components/Paquetes/PaqueteItemToCiclo"


const AltaCicloPage = () => {
  const [formData, setFormData] = useState<CreateCicloRequestState>({
    ingreso: obtenerFechaHora(),
    paqueteId: null,
  })

  const { paqueteToAssociate, resetPaqueteToAssociate } = usePaqueteStore((state:PaqueteStore) => state);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData({ ...formData, [name]: value })
  }

  
  const {post, postLoading} = usePost<string, CreateCicloRequest>('ciclo/create')
  
  useEffect(() => {
    if (paqueteToAssociate){
      setFormData({...formData, ['paqueteId']: paqueteToAssociate.id})
    }
  },[paqueteToAssociate])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.paqueteId){
      let dataRequest: CreateCicloRequest = {
        paqueteId: formData.paqueteId,
        ingreso: new Date(formData.ingreso)
      }
  
      if (formData.egreso) {
        dataRequest = {
          ...dataRequest,
          egreso: new Date(formData.egreso)
        }
      }
  
      await post(dataRequest);

      setFormData({
        ...formData,
        paqueteId: null,
        egreso: undefined,
      })
      resetPaqueteToAssociate()
    }

    
    

  }
  
  const [handleModal, setHandleModal] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setHandleModal((prev) => !prev)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <Package className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Crear nuevo ciclo de secado</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>

            <Input
              label="Fecha de ingreso"
              id="ingreso"
              name="ingreso"
              type="datetime-local"
              value={formData.ingreso}
              onChange={handleChange}
              required
            />
          </div>
          <div>

            <Input
              label="Fecha de egreso (opcional)"
              id="egreso"
              name="egreso"
              type="datetime-local"
              value={formData.egreso}
              onChange={handleChange}
              />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Seleccionar paquete</h2>

            <ButtonDumb type="button" text="Agregar" onClick={handleOpenModal} />
            <div className="mt-4">
              {
                paqueteToAssociate &&
                <PaqueteItemToCiclo {...paqueteToAssociate} />
              }
            </div>
          </div>

          <Button text="Crear" loading={postLoading} type="submit" />
        </form>
      </div>
      {
        handleModal && <AssociatePaqueteModal onClose={handleOpenModal} />
      }
    </Layout>
  )
}

export default AltaCicloPage

