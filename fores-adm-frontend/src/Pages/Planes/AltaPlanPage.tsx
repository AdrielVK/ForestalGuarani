import { useEffect, useState } from "react";
import Layout from "../Layouts/Layout"
import { CreatePlan, CreatePlanBody, Plan } from "../../models/interfaces/plan.interface";
import Input from "../../Components/ui/Input";
import { usePost } from "../../hooks/usePost";
import Button from "../../Components/ui/Button";
import ButtonDumb from "../../Components/ui/ButtonDumb";
import { CirclePlus } from "lucide-react";
import CreateOrdenModal from "../../Components/Modals/CreateOrdenModal";
import AssociateOrdenModal from "../../Components/Modals/AssociateOrdenModal";
import { OrdenStore, useOrdenStore } from "../../store/ordenStore";
import OrdenItemList from "../../Components/Orden/OrdenItemList";
import AssociateConsumoModal from "../../Components/Modals/AssociateConsumoModal";
import { ConsumoStore, useConsumoStore } from "../../store/consumoStore";
import ConsumoItem from "../../Components/Consumo/ConsumoItem";
import { CreateConsumoBody, CreateConsumoResponse } from "../../models/interfaces/consumo.interface";
import { AssociateOrdenBody, Orden } from "../../models/interfaces/orden.interfaces";
import { obtenerFechaHora } from "../../utils/get-date";
const AltaPlanPage = () => {

  

  const { postLoading, post} = usePost<Plan, CreatePlanBody>('plan/create')

  const { postLoading:postLoadingConsumo, post:postConsumo} = usePost<CreateConsumoResponse, CreateConsumoBody>('consumo/create')

  const { postLoading:postLoadingOrden, post:postOrden} = usePost<Orden, AssociateOrdenBody>('orden/associate/plan')

  const {ordenList, resetOrdenList} = useOrdenStore((state:OrdenStore) => state);
  const {consumoList, resetConsumoList} = useConsumoStore((state:ConsumoStore) => state)
  

  useEffect(() => {
    resetOrdenList()
  },[])

  const [plan, setPlan] = useState<CreatePlan>({
    fecha_inicio:  obtenerFechaHora(),
    fecha_fin: obtenerFechaHora(1),
    longitud: 0,
    ancho: 0,
    espesor: 0,
    activo: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setPlan({ ...plan, [name]: value });
    
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPlan({ ...plan, [name]: Number(value) });
    
    
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    const res = await post({
      ...plan,
      fecha_inicio: new Date(plan.fecha_inicio),
      fecha_fin: new Date(plan.fecha_fin)
    });
    if (res) {
      for (const ord of ordenList) {
        await postOrden({planId:res.id, ordenId:ord.id})
      }
    }
    if (res ) {
      const dateToConsumo = new Date(obtenerFechaHora())
      for (const consumo of consumoList) {
        
        const data:CreateConsumoBody = {
          fecha: dateToConsumo,
          planId: res.id,
          equipoId: consumo.equipo.id,
        }
        
        await postConsumo(data)
      }
    }
    

    setPlan({
      fecha_inicio:  obtenerFechaHora(),
      fecha_fin: obtenerFechaHora(1),
      longitud: 0,
      ancho: 0,
      espesor: 0,
      activo: true,
    })

    resetOrdenList()
    resetConsumoList()

  }

  const [lengthConsumo, setLengthConsumo] = useState<number>(0);

  useEffect(() => {
    setLengthConsumo(consumoList.length)
  }, [consumoList])

  const [modalCreateOrden, setModalCreateOrden] = useState(false);
  const [modalAssociateOrden, setModalAssociateOrden] = useState(false);
  const [modalConsumo, setModalConsumo] = useState(false);

  const handleModalCreate = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalCreateOrden((value) => (!value))
  }

  const handleModalConsumo = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalConsumo((value) => (!value))
  }

  const handleModalAssociate = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalAssociateOrden((value) => (!value))
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="w-3/4 mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear nuevo plan de produccion</h2>
            <div className="mb-4">
              <Input 
                type="datetime-local"
                id="fecha_inicio"
                name="fecha_inicio"
                value={plan.fecha_inicio}
                onChange={handleChange}
                required
                label='Fecha inicio'
              />
            </div>
            <div className="mb-4">
              <Input 
                type="datetime-local"
                id="fecha_fin"
                name="fecha_fin"
                value={plan.fecha_fin}
                onChange={handleChange}
                required
                label='Fecha fin'
              />
            </div>
            <div className="w-full box-border mb-4 bg-gray-100 p-4 rounded-sm ">
              <p className="text-1xl font-bold mb-2 text-center">Esquema de corte</p>
              <div className="mb-4">
                <Input 
                  type="number"
                  id="longitud"
                  name="longitud"
                  value={plan.longitud}
                  onChange={handleChangeNumber}
                  required
                  label='Longitud'
                />
              </div>
              <div className="mb-4">
                <Input 
                  type="number"
                  id="ancho"
                  name="ancho"
                  value={plan.ancho}
                  onChange={handleChangeNumber}
                  required
                  label='Ancho'
                />
              </div>
              <div className="mb-4">
                <Input 
                  type="number"
                  id="espesor"
                  name="espesor"
                  value={plan.espesor}
                  onChange={handleChangeNumber}
                  required
                  label='Espesor'
                />
              </div>
            </div>

            <div className="w-full box-border mb-4 bg-gray-100 p-4 rounded-sm ">
                <p className="text-1xl font-bold mb-2 text-center">Asociar ordenes de produccion</p>
                <div className="flex md:flex-row flex-col">
                  <span className="md:w-1/2 w-full box-border p-4">
                    <ButtonDumb type="button" onClick={handleModalCreate} text="Crear nueva orden" icon={<CirclePlus className="mx-2"/>} />

                  </span>
                  <span className="md:w-1/2 w-full flex box-border p-4">
                    <ButtonDumb onClick={handleModalAssociate} type="button" text="Asociar orden existente" icon={<CirclePlus className="mx-2"/>} />
                  </span>
                </div>
                <div>
                  {ordenList.map((item, index) => (
                    <OrdenItemList {...item} key={index} />
                  ))}
                </div>
            </div>
            
            <div className="w-full box-border mb-4 bg-gray-100 p-4 rounded-sm ">
                <p className="text-1xl font-bold mb-2 text-center">Registrar consumo</p>
                <div className="flex md:flex-row flex-col">
                  <span className="md:w-1/2 w-full box-border p-4">
                    <ButtonDumb type="button" onClick={handleModalConsumo} text="Agregar consumo de posicion" icon={<CirclePlus className="mx-2"/>} />

                  </span>

                  <span className="md:w-1/2 w-full flex items-center justify-center box-border p-4">
                    <p className="font-semibold text-lime-900">{lengthConsumo > 0 ? `${lengthConsumo} posiciones a consumir`:'Sin consumos asignados'}</p>
                  </span>
                </div>
                <div>
                  {
                    consumoList.map((item, index) => (
                      <ConsumoItem key={index} {...item} />
                    ))
                  }
                </div>
                
            </div>

            <Button text="Crear" loading={postLoading || postLoadingConsumo || postLoadingOrden} type="submit" />
      </form>
      {
        modalCreateOrden && !modalAssociateOrden
        &&
        <CreateOrdenModal onClose={handleModalCreate} />
      }
      {
        modalAssociateOrden && !modalCreateOrden
        &&
        <AssociateOrdenModal onClose={handleModalAssociate} />
      }
      {
        modalConsumo
        &&
        <AssociateConsumoModal onClose={handleModalConsumo} />
      }
    </Layout>
  )
}

export default AltaPlanPage;