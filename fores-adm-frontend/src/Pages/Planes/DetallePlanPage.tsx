import { useParams } from "react-router-dom";
import Layout from "../Layouts/Layout"
import { useGet } from "../../hooks/useGet";
import { IPlanDetail } from "../../models/interfaces/plan.interface";
import PlanDetail from "../../Components/Plan/PlanDetail";
import { ConsumoStore, useConsumoStore } from "../../store/consumoStore";
import { OrdenStore, useOrdenStore } from "../../store/ordenStore";
import { useEffect, useState } from "react";

const DetallePlanPage = () => {
  
  const {id} = useParams()
  const {reFetch} = useConsumoStore((state:ConsumoStore) => state)
  const {reFetch:reFetchOrden} = useOrdenStore((state:OrdenStore) => state)

  const [fetchHandler, setFetchHandler] = useState(false);

  useEffect(() => {
    setFetchHandler((value) => !value)
  }, [reFetch,reFetchOrden])
  
  const {data, loading} = useGet<IPlanDetail>(`plan/detail/${id}`, fetchHandler)

  return (
    <Layout>
      {
        loading ? 
        (
          <p>Cargando...</p>
        )
        :
        data ?
        (
          <PlanDetail {...data} />
        )
        :
        <p>Error al obtener el detalle del plan</p>
      }
    </Layout>
  )
}

export default DetallePlanPage;