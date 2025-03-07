import { format } from "date-fns"
import { Calendar, Ruler, Package, Clock, CirclePlus } from "lucide-react"
import { IPlanDetail } from "../../models/interfaces/plan.interface"
import { AssociateOrdenBody, Orden } from "../../models/interfaces/orden.interfaces"
import { Consumo, CreateConsumoBody, CreateConsumoResponse } from "../../models/interfaces/consumo.interface"
import { Equipo } from "../../models/interfaces/pedidos.interface"
import ButtonDumb from "../ui/ButtonDumb"
import { colors } from "../../models/ui.models"
import OrdenItemList from "../Orden/OrdenItemList"
import { useEffect, useState } from "react"
import { OrdenStore, useOrdenStore } from "../../store/ordenStore"
import CreateOrdenModal from "../Modals/CreateOrdenModal"
import AssociateOrdenModal from "../Modals/AssociateOrdenModal"
import ConsumoItem from "../Consumo/ConsumoItem"
import { ConsumoStore, useConsumoStore } from "../../store/consumoStore"
import AssociateConsumoModal from "../Modals/AssociateConsumoModal"
import { obtenerFechaHora } from "../../utils/get-date"
import { usePost } from "../../hooks/usePost"
import Button from "../ui/Button"
import ChangeStatusPlan from "../Modals/ChangeStatusPlan"

const PlanDetail = ( plan:IPlanDetail ) => {
  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm")
  }
  
  const [volumenTotal, setVolumenTotal] = useState<number>(0)
  
  const {ordenList, resetOrdenList, reFetch:reFetchOrden, reFetchHandler:reFetchHandlerOrden} = useOrdenStore((state:OrdenStore) => state);
  const {consumoList, resetConsumoList, reFetch, reFetchHandler} = useConsumoStore((state:ConsumoStore) => state)
  
  const [modalChangeConsumo, setModalChangeConsumo] = useState(false);

  const [modalConsumo, setModalConsumo] = useState(false);
  const [modalCreateOrden, setModalCreateOrden] = useState(false);
  const [modalAssociateOrden, setModalAssociateOrden] = useState(false);
  const [lengthConsumo, setLengthConsumo] = useState<number>(0);
  
  const calcularVolumen = () => {
    const nuevoVolumen = plan.ordenes.reduce((total: number, orden: Orden) => {
      return total + orden.volumen;
    }, 0);
    
    setVolumenTotal(nuevoVolumen);
  };

  useEffect(() => {
    resetOrdenList()
    resetConsumoList()
    calcularVolumen()
    
  },[])

  const { postLoading:postLoadingConsumo, post:postConsumo} = usePost<CreateConsumoResponse, CreateConsumoBody>('consumo/create')
  

  const handleUpdateConsumo = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (consumoList.length > 0) {
      const dateToConsumo = new Date(obtenerFechaHora())
      for (const consumo of consumoList) {
        
        const data:CreateConsumoBody = {
          fecha: dateToConsumo,
          planId: plan.id,
          equipoId: consumo.equipo.id,
        }
        
        
        await postConsumo(data)

        reFetchHandler(!reFetch)
      }
    }
  }
  
  const { postLoading:postLoadingOrden, post:postOrden} = usePost<Orden, AssociateOrdenBody>('orden/associate/plan')
  

  const handleUpdateOrden = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (ordenList.length > 0) {
      for (const ord of ordenList) {
        await postOrden({planId:plan.id, ordenId:ord.id})

        reFetchHandlerOrden(!reFetchOrden)
      }
    }
  }

  useEffect(() => {
    setLengthConsumo(consumoList.length)
  }, [consumoList])

  const handleModalAssociate = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalAssociateOrden((value) => (!value))
  }

  const handleModalCreate = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalCreateOrden((value) => (!value))
  }

  const handleModalConsumo = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalConsumo((value) => (!value))
  }

  const handleModalChangeStatus = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.stopPropagation()
    setModalChangeConsumo((value) => (!value))
  }


  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full flex">
          <h1 className="text-3xl font-bold mb-6">Detalle del Plan de Producción #{plan.id}</h1>
          <span className="ml-auto">
            <ButtonDumb onClick={handleModalChangeStatus} color={ plan.activo ? colors.danger: undefined} text={plan.activo ? 'Cambiar a no activo' : 'Cambiar a activo'} />
          </span>
        </div>

        <div className="flex justify-between bg-gray-100 rounded-lg p-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Información General</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Fecha de inicio:</span> {formatDate(plan.fecha_inicio)}
              </p>
              <p className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Fecha de fin:</span> {formatDate(plan.fecha_fin)}
              </p>
              
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Esquema de Corte</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <Ruler className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Longitud:</span> {plan.esquema.longitud} cm
              </p>
              <p className="flex items-center">
                <Ruler className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Ancho:</span> {plan.esquema.ancho} cm
              </p>
              <p className="flex items-center">
                <Ruler className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Espesor:</span> {plan.esquema.espesor} cm
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Volumen total</h2>
            {volumenTotal}
          </div>

          <div className="flex h-min items-center">
            <span
              className={`px-2 py-1 rounded-full text-md font-medium ${plan.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {plan.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Órdenes Asociadas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Número</th>
                  <th className="px-4 py-2 text-left">Volumen</th>
                  <th className="px-4 py-2 text-left">Acabado</th>
                  <th className="px-4 py-2 text-left">Cliente</th>
                </tr>
              </thead>
              <tbody>
                {plan.ordenes.map((orden: Orden) => (
                  <tr key={orden.numero} className="border-b">
                    <td className="px-4 py-2">{orden.numero}</td>
                    <td className="px-4 py-2">{orden.volumen} m³</td>
                    <td className="px-4 py-2">{orden.cabado.nombre}</td>
                    <td className="px-4 py-2">{orden.cliente.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <div className="">
              {
                ordenList.length > 0
                &&
                <div className="w-20 ml-auto">
                  <Button loading={postLoadingOrden} onClick={handleUpdateOrden} text="Asociar" />
                </div>
              }
            </div>
        </div>

        <div className="bg-gray-100 mb-4 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Consumo de Equipos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.consumo.map((consumo:Consumo) => (
              <div key={consumo.id} className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Equipo #{(consumo.equipo as Equipo).id}</h3>
                <p className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Fecha: {formatDate(consumo.fecha)}
                </p>
                <p className="flex items-center text-sm mt-1">
                  <Package className="w-4 h-4 mr-2 text-blue-500" />
                  Tipo: {(consumo.equipo as Equipo).rolliso.tipo}
                </p>
              </div>
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
            {
              lengthConsumo > 0
              &&
              <div className="w-20 ml-auto">
                <Button loading={postLoadingConsumo} onClick={handleUpdateConsumo} text="Registrar" />
              </div>
            }
        </div>
      
      </div>

      {
        modalCreateOrden &&
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
      {
        modalChangeConsumo
        &&
        <ChangeStatusPlan onClose={handleModalChangeStatus} id={plan.id} value={plan.activo} />
      }
    </>
  )
}

export default PlanDetail

