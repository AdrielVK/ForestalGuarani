import { ChevronDown, ChevronUp, MapPinned } from "lucide-react";
import Layout from "../Layouts/Layout"
import { useEffect, useState } from "react";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import { usePost } from "../../hooks/usePost";
import { Posicion } from "../../models/interfaces/ingresos.interface";
import { useGet } from "../../hooks/useGet";
import PosicionItem from "../../Components/Posiciones/PosicionItem";
import { PosicionStore, usePosicionStore } from "../../store/posicionStore";

interface CreatePosicionResponseInterface {
  message: string;
  response?: Posicion
}

interface CreatePosicionBodyInterface {
  identificador: number
}
const PosicionesPage = () => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [idPos, setIdPos] = useState<string>('')
  const [reFetch, setReFetch] = useState(false);
  const reFetchFlag = usePosicionStore((state:PosicionStore) => state.reFetchFlag);
  const { postLoading, post} = usePost<CreatePosicionResponseInterface, CreatePosicionBodyInterface>('posicion/create');
  
  const {data, loading} = useGet<Posicion[]>('posicion/list', reFetch);
  

  useEffect(() => {
    setReFetch((prev) => !prev)
  },[reFetchFlag])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (parseInt(value)) {
      setIdPos(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = parseInt(idPos);
    if (id){
      await post({identificador:id})
      setReFetch((prev) => !prev);
    }

  }

  return (
    <Layout>
      <div className="flex w-full flex-col space-y-4 items-center mb-4">
        <aside className="flex items-center w-full">
          <h1 className="mb-auto text-3xl h-fit font-bold text-gray-900">Playa de acopio</h1>
          
          <div className="ml-auto hover:bg-lime-100 shadow-sm rounded-sm p-4 transition-shadow duration-300">
            <div className="flex space-x-4 justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <div className="bg-lime-100 p-2 rounded-full">
                <MapPinned className="w-6 h-6 text-lime-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Alta de posicion</h3>
              </div>
              <div className="flex items-center space-x-2">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            {
              isExpanded
              &&
              <form onSubmit={handleSubmit} className=" space-y-2 my-4">
                <Input
                  label="Identificador de la posicion"
                  type="text"
                  value={idPos}
                  id="idPos"
                  required
                  onChange={handleChange}
                />

                <Button loading={postLoading} text="Crear"/>
              </form>
            }
          </div>

        </aside>
        <div className="w-full justify-center flex flex-wrap box-border">
            {
              loading && !data ?
              <p>Cargando..</p>
              :
              data && !loading ?
              data.map((posicion, index) => (
                <PosicionItem {...posicion} key={index} />
              ))
              :
              <p>No hay posiciones en la playa de acopio</p>
            }
        </div>
      </div>
    </Layout>
  )
}

export default PosicionesPage;