
import { useEffect, useRef, useState } from "react"
import { Package, ChevronDown, ChevronUp } from "lucide-react"
import Input from "../../Components/ui/Input"
import { CreatePaqueteRequest, CreatePaqueteState } from "../../models/interfaces/paquete.interface"
import Layout from "../Layouts/Layout"
import { obtenerFechaHora } from "../../utils/get-date"
import { api } from "../../interceptors/axios.interceptor"
import { useGet } from "../../hooks/useGet"
import Button from "../../Components/ui/Button"
import { usePost } from "../../hooks/usePost"
import ButtonDumb from "../../Components/ui/ButtonDumb"
import AssociateUniqueOrdenModal from "../../Components/Modals/AssociateUniqueOrdenModal"
import { OrdenStore, useOrdenStore } from "../../store/ordenStore"
import OrdenItemDetailToEmpalilladora from "../../Components/Orden/OrdenItemDetailToEmpalilladora"


const AltaPaquetePage = () => {
  const [formData, setFormData] = useState<CreatePaqueteState>({
    identificador: "",
    ingreso: obtenerFechaHora(),
    valueEstado: "",
    volumenPieza: 0,
    espesorPieza: 0,
    longitudPieza: 0,
    anchoPieza: 0,
  })

  const { ordenToEmpalilladora} = useOrdenStore((state:OrdenStore) => state);
  

  const [showEscuadria, setShowEscuadria] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'valueEstado'){
      setShowSuggestions(true);
    }
    if (name === 'identificador'){
      setIdentificadorInvalid(false);
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value === "" ? 0 : Number(value) })
  }
  
  const {post, postLoading} = usePost<string, CreatePaqueteRequest>('paquete/create')
  
  const toggleEscuadria = () => {
    setShowEscuadria(!showEscuadria)
    if (!showEscuadria) {
      // Initialize escuadria fields when showing the section
      setFormData({
        ...formData,
        alturaEscuadria: 0,
        longitudEscuadria: 0,
        anchoEscuadria: 0,
      })
    } else {
      // Remove escuadria fields when hiding the section
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { alturaEscuadria, longitudEscuadria, anchoEscuadria, ...rest } = formData
      setFormData(rest)
    }
  }

  const [isIdentificadorInvalid, setIdentificadorInvalid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const dataIdentificadorInvalid = await api.get(`paquete/identificador/${formData.identificador}`)
    const result = !dataIdentificadorInvalid.data.payload
    setIdentificadorInvalid(result);
    
    if (!isIdentificadorInvalid) {

      const dataFormData: CreatePaqueteRequest = {
        ...formData,
        ingreso: new Date(formData.ingreso),
        ordenId: ordenToEmpalilladora?.id,
        vol: formData.volumenPieza
      }
      await post(dataFormData)

    }
  }

  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const autocompleteRef = useRef<HTMLDivElement>(null);
  
  const [handleModal, setHandleModal] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setHandleModal((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const {data: dataEstadosValue} = useGet<string[]>('estado/list')

  const handleEstadoSelect = (value: string) => {
    setFormData({...formData, valueEstado: value})
    setShowSuggestions(false)
  }


  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <Package className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Crear Nuevo Paquete</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              error={isIdentificadorInvalid}
              errorMsg={'Identificador ya utilizado'}
              label="Identificador"
              id="identificador"
              name="identificador"
              type="text"
              value={formData.identificador}
              onChange={handleChange}
              required
            />

            <Input
              label="Fecha de Ingreso"
              id="ingreso"
              name="ingreso"
              type="datetime-local"
              value={formData.ingreso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative" ref={autocompleteRef}>
            <Input 
              type="text"
              id="valueEstado"
              name="valueEstado"
              value={formData.valueEstado}
              onChange={handleChange}
              required
              label="Estado"
            />

            {showSuggestions && dataEstadosValue && dataEstadosValue.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {dataEstadosValue.map((estado, index) => (
                  <li
                    key={index}
                    onClick={() => handleEstadoSelect(estado)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {estado}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Información de la Pieza</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Volumen"
                id="volumenPieza"
                name="volumenPieza"
                type="number"
                step="0.01"
                value={formData.volumenPieza}
                onChange={handleNumberChange}
                required
              />

              <Input
                label="Espesor"
                id="espesorPieza"
                name="espesorPieza"
                type="number"
                step="0.1"
                value={formData.espesorPieza}
                onChange={handleNumberChange}
                required
              />

              <Input
                label="Longitud"
                id="longitudPieza"
                name="longitudPieza"
                type="number"
                step="0.1"
                value={formData.longitudPieza}
                onChange={handleNumberChange}
                required
              />

              <Input
                label="Ancho"
                id="anchoPieza"
                name="anchoPieza"
                type="number"
                step="0.1"
                value={formData.anchoPieza}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Agregar orden de produccion</h2>

            <ButtonDumb type="button" text="Agregar" onClick={handleOpenModal} />
            <div className="mt-4">
              {
                ordenToEmpalilladora &&
                <OrdenItemDetailToEmpalilladora {...ordenToEmpalilladora} />
              }
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={toggleEscuadria}
              className="flex items-center text-lime-600 hover:text-lime-800 focus:outline-none mb-4"
            >
              {showEscuadria ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-1" />
                  Ocultar información de escuadría
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-1" />
                  Añadir información de escuadría
                </>
              )}
            </button>

            {showEscuadria && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Información de Escuadría</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Altura"
                    id="alturaEscuadria"
                    name="alturaEscuadria"
                    type="number"
                    step="0.1"
                    value={formData.alturaEscuadria ?? 0}
                    onChange={handleNumberChange}
                  />

                  <Input
                    label="Longitud"
                    id="longitudEscuadria"
                    name="longitudEscuadria"
                    type="number"
                    step="0.1"
                    value={formData.longitudEscuadria ?? 0}
                    onChange={handleNumberChange}
                  />

                  <Input
                    label="Ancho de"
                    id="anchoEscuadria"
                    name="anchoEscuadria"
                    type="number"
                    step="0.1"
                    value={formData.anchoEscuadria || 0}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
            )}
          </div>
          
          

          <Button text="Crear" loading={postLoading} type="submit" />
        </form>
      </div>
      {
        handleModal && <AssociateUniqueOrdenModal onClose={handleOpenModal} />
      }
    </Layout>
  )
}

export default AltaPaquetePage

