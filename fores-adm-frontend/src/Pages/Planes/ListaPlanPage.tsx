import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { Plan, PlanStats, PlanStatsMonths } from "../../models/interfaces/plan.interface";
import Layout from "../Layouts/Layout"
import PlanListItem from "../../Components/Plan/PlanItemList";
import { CalendarSearch, Filter, SquareChartGantt } from "lucide-react";
import Input from "../../Components/ui/Input";
import { obtenerFechaHora } from "../../utils/get-date";
import { FilterPlan, primitiveFilterPlan } from "../../store/planStore";

const ListaPlanPage = () => {

  const {data, loading} = useGet<Plan[]>('plan/list')
  const [dataRender, setDataRender] = useState<Plan[]>([])
  
  const [filterLocal, setFilterLocal]=useState<FilterPlan>(primitiveFilterPlan)
  //const {setFilter, applyFilter, filteredPlanes} = usePlanStore((state:PlanStore) => state)
 
  useEffect(() => {
    if (!data) return;
  
    let filteredData = [...data];
  
    if (filterLocal.ancho != null && filterLocal.ancho.toString() !== "") {
      filteredData = filteredData.filter((item) =>
        item.esquema.ancho.toString().startsWith(filterLocal.ancho!.toString())
      );
    }
  
    if (filterLocal.espesor != null && filterLocal.espesor.toString() !== "") {
      filteredData = filteredData.filter((item) =>
        item.esquema.espesor.toString().startsWith(filterLocal.espesor!.toString())
      );
    }
  
    if (filterLocal.longitud != null && filterLocal.longitud.toString() !== "") {
      filteredData = filteredData.filter((item) =>
        item.esquema.longitud.toString().startsWith(filterLocal.longitud!.toString())
      );
    }
  
    if (filterLocal.date) {
      const filterDate = new Date(filterLocal.date);
      filteredData = filteredData.filter(
        (item) => 
          new Date(item.fecha_inicio) <= filterDate &&
          new Date(item.fecha_fin) >= filterDate
      );
    }
  
    setDataRender(filteredData);
  }, [data, filterLocal]);
  
  
  const onChangeNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFilterLocal((prev) => ({
      ...prev,
      [name]: value ? value : "", // Evita que `null` cause errores en las comparaciones
    }));
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLocal(prev => ({
      ...prev,
      date: e.target.value ? e.target.value : null // Convierte el string a Date
    }));
  };


  const [statsMonths, setStatsMonths] = useState<PlanStatsMonths>({
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0
  });

  const [stats, setStats] = useState<PlanStats>({
    plans: 0,
    active_plans: 0,
    not_active_plans: 0,
    current_plans_by_date: 0,
  })

  useEffect(() => {
    if (data) {
      const monthStats: PlanStatsMonths = {
        enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0,
        julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0
      };
      setDataRender(data)
      const currentDate = new Date(obtenerFechaHora())
      const NumberOfPlans = data.length
      const NumberOfActivePlans = data.filter((plan) => plan.activo === true).length
      const NumberOfNotActivePlans = NumberOfPlans - NumberOfActivePlans;
      const NumberOfCurrentPlansByDate = data.filter((plan) => {
        const startDate = new Date(plan.fecha_inicio);
        const endDate = new Date(plan.fecha_fin);
        return startDate <= currentDate && endDate >= currentDate;
      }).length;

      setStats({
        plans: NumberOfPlans,
        active_plans: NumberOfActivePlans,
        not_active_plans: NumberOfNotActivePlans,
        current_plans_by_date: NumberOfCurrentPlansByDate
      })

      data.forEach((plan) => {
        const month = new Date(plan.fecha_inicio).getMonth(); 
        const monthNames = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        monthStats[monthNames[month] as keyof PlanStatsMonths] += 1;
      });

      setStatsMonths(monthStats);

    }
  
  },[data])

  

  return (
    <Layout>
      <div className="w-full flex flex-col">

      
        <header className="w-full bg-white mx-3 mb-4 rounded-lg ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Planes</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <SquareChartGantt className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Total de Planes </h2>
                <p className="ml-4 text-3xl font-bold text-blue-600">{stats.plans}</p>
              </div>
              <div className="flex w-full items-center mb-2">
                <p className="text-lg ml-8 font-semibold text-gray-700">Planes activos:  </p>

                <p className="text-xl font-bold ml-4 text-blue-600">{stats.active_plans}</p>
              
                <span className="ml-auto text-base font-bold text-lime-700">{(stats.active_plans * 100 / stats.plans).toFixed(1)}%</span>

              </div>
              <div className="flex w-full items-center mb-2">
                <p className="text-lg ml-8 font-semibold text-gray-700">Planes no activos:  </p>

                <p className="text-xl font-bold ml-4 text-blue-600">{stats.not_active_plans}</p>
              
                <span className="ml-auto text-base font-bold text-lime-700">{(stats.not_active_plans * 100 / stats.plans).toFixed(1)}%</span>

              </div>
              <div className="flex w-full items-center mb-2">
                <p className="text-lg ml-8 font-semibold text-gray-700">Planes corrientes a la fecha:  </p>

                <p className="text-xl font-bold ml-4 text-blue-600">{stats.current_plans_by_date}  </p>
                <span className="ml-auto text-base font-bold text-lime-700">{(stats.current_plans_by_date * 100 / stats.plans).toFixed(1)}%</span>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <span className="box-border w-full flex justify-center">
                  <Filter className="w-6 h-6 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-700">Filtrar</h2>
                </span>
                <div className="w-full grid grid-cols-2">
                  <div className="m-3 space-y-2">
                    <Input
                      label="Fecha"
                      id="fecha"
                      name="fecha"
                      type="datetime-local"
                      value={filterLocal.date ?? ''}
                      onChange={onChangeDate}
                    />
                    <Input
                      label="Espesor"
                      id="espesor"
                      name="espesor"
                      type="text"
                      value={filterLocal.espesor ?? ''}
                      onChange={onChangeNumbers}
                    />
                  </div>
                  <div className="m-3 space-y-2">
                    <Input
                      label="Ancho"
                      id="ancho"
                      name="ancho"
                      type="text"
                      value={filterLocal.ancho ?? ''}
                      onChange={onChangeNumbers}
                    />
                    <Input 
                      label="Longitud"
                      id="longitud"
                      name="longitud"
                      type="text"
                      value={filterLocal.longitud ?? ''}
                      onChange={onChangeNumbers}
                    />
                    
                  </div>

                </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <span className="box-border w-full flex justify-center">
                <CalendarSearch className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Planes por meses</h2>
              </span>

              <ul>
              {Object.entries(statsMonths)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, count]) => count > 0) 
                .map(([month, count]) => (
                  <li className="text-md flex" key={month}>
                    {month}: <p className="ml-3 font-semibold">{count}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
        {
          loading? 
          <p>Cargando..</p>
          :
          dataRender.length > 0 && dataRender ? 
          (
            <div className="w-full">
              <section className="w-full grid grid-cols-2">
              
                {
                  
                  dataRender.map((item, index) => (
                    <div className="box-border mx-3">

                      <PlanListItem {...item} key={index} />
                    </div>
                  ))
                }
              </section>
            </div>
          )
          :
          <p>Sin resultados para ver</p>
        }
      </div>
    </Layout>
  )
}

export default ListaPlanPage;