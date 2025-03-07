import Layout from "../Layouts/Layout"
import type React from "react"
import { useEffect, useState } from "react"
import type { CreateOrdenBody, Orden } from "../../models/interfaces/orden.interfaces"
import { usePost } from "../../hooks/usePost"
import { OrdenStore, useOrdenStore } from "../../store/ordenStore"
import Input from "../../Components/ui/Input"
import Button from "../../Components/ui/Button"

const AltaOrdenProdPage = () => {

  const [requestBody, setRequestBody] = useState<CreateOrdenBody>({
      numero: "",
      volumen: 0,
      cabadoNombre: "",
      clienteNumero: "",
      clienteNombre: "",
    })
  
  
    const addToOrdenList = useOrdenStore((state:OrdenStore) => state.addToOrdenList)
    
    const [activeTab, setActiveTab] = useState<"existing" | "new">("existing")
    const {postResponse, postLoading, post} = usePost<Orden, CreateOrdenBody>('orden/create')
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setRequestBody({ ...requestBody, [name]: value })
    }
  
    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      if (Number(value) || value === "") {
        setRequestBody({ ...requestBody, [name]: value === "" ? 0 : Number(value) })
      }
    }
  
    const handleChangeNumberToString = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      if (Number(value) || value === "") {
        setRequestBody({ ...requestBody, [name]: value === "" ? 0 : value })
      }
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await post(requestBody);  // Dispara la solicitud, pero el estado aún no ha cambiado
    };
    
    useEffect(() => {
      if (postResponse) {
        addToOrdenList(postResponse);
      }
    }, [addToOrdenList, postResponse]); 

  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Crear nuevo orden de produccion</h2>

          <Input
            type="number"
            id="numero"
            name="numero"
            value={requestBody.numero}
            onChange={handleChangeNumberToString}
            required
            label="Número único de orden"
          />
          <Input
            type="number"
            id="volumen"
            name="volumen"
            value={requestBody.volumen}
            onChange={handleChangeNumber}
            required
            label="Volumen a producir con la orden"
          />
          <Input
            type="text"
            id="cabadoNombre"
            name="cabadoNombre"
            value={requestBody.cabadoNombre}
            onChange={handleChange}
            required
            label="Nombre del acabado de la madera"
          />

          <div className="mt-6">
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                className={`py-2 px-4 ${
                  activeTab === "existing"
                    ? "border-b-2 border-lime-600 text-lime-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("existing")}
              >
                Cliente existente
              </button>
              <button
                type="button"
                className={`py-2 px-4 ${
                  activeTab === "new" ? "border-b-2 border-lime-600 text-lime-700" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("new")}
              >
                Registrar cliente
              </button>
            </div>

            <div className="mt-4">
              {activeTab === "existing" && (
                <Input
                  type="text"
                  id="clienteNumero"
                  name="clienteNumero"
                  value={requestBody.clienteNumero}
                  onChange={handleChange}
                  required
                  label="Número de cliente"
                />
              )}
              {activeTab === "new" && (
                <>
                  <Input
                    type="text"
                    id="clienteNombre"
                    name="clienteNombre"
                    value={requestBody.clienteNombre}
                    onChange={handleChange}
                    required
                    label="Nombre del cliente"
                  />
                  <Input
                    type="text"
                    id="clienteNumeroNew"
                    name="clienteNumero"
                    value={requestBody.clienteNumero}
                    onChange={handleChange}
                    required
                    label="Número de cliente"
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button loading={postLoading} text="Crear orden" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AltaOrdenProdPage;