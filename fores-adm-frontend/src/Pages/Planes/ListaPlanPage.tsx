import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { Plan, PlanStats, PlanStatsMonths, TypeFilterPlan } from "../../models/interfaces/plan.interface";
import Layout from "../Layouts/Layout"
import PlanListItem from "../../Components/Plan/PlanItemList";
import { CalendarSearch, Filter, SquareChartGantt } from "lucide-react";
import Input from "../../Components/ui/Input";
import { obtenerFechaHora } from "../../utils/get-date";
import { FilterPlan, primitiveFilterPlan } from "../../store/planStore";

const ListaPlanPage = () => {

  const {data, loading} = useGet<Plan[]>('plan/list')
  const [dataRender, setDataRender] = useState<Plan[]>([])
  const [viewFilter, setViewFilter] = useState<TypeFilterPlan>('todos')
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
    
    switch(viewFilter) {
      case 'activo':
        filteredData = filteredData.filter(item => item.activo);
        break;
      
      case 'no_activo':
        filteredData = filteredData.filter(item => !item.activo);
        break;
      
      case 'fecha':
        { const currentDate = new Date(obtenerFechaHora());
        filteredData = filteredData.filter(item => 
          new Date(item.fecha_inicio) <= currentDate && 
          new Date(item.fecha_fin) >= currentDate
        );
        break; }
      
      case 'todos':
      default:
        break;
    }
  

    setDataRender(filteredData);
  }, [data, filterLocal, viewFilter]);
  
  
  const onChangeNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFilterLocal((prev) => ({
      ...prev,
      [name]: value ? value : "", // Evita que `null` cause errores en las comparaciones
    }));
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TypeFilterPlan
    setViewFilter(value);
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
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <Filter className="w-6 h-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-700">Filtrar</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Fecha"
                    id="fecha"
                    name="fecha"
                    type="datetime-local"
                    value={filterLocal.date ?? ""}
                    onChange={onChangeDate}
                  />
                </div>
                <div>
                  <Input
                    label="Espesor"
                    id="espesor"
                    name="espesor"
                    type="number"
                    value={filterLocal.espesor ?? ""}
                    onChange={onChangeNumbers}
                  />
                </div>
                <div>
                  <Input
                    label="Ancho"
                    id="ancho"
                    name="ancho"
                    type="number"
                    value={filterLocal.ancho ?? ""}
                    onChange={onChangeNumbers}
                  />
                </div>
                <div>
                  <Input
                    label="Longitud"
                    id="longitud"
                    name="longitud"
                    type="number"
                    value={filterLocal.longitud ?? ""}
                    onChange={onChangeNumbers}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de filtro
                </label>
                <select
                  id="filterType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                  value={viewFilter}
                  onChange={onChangeSelect}
                >
                  <option value={'todos'}>Todos</option>
                  <option value={'activo'}>Activos</option>
                  <option value={'no_activo'}>No activos</option>
                  <option value={'fecha'}>Actuales a la fecha</option>
                </select>
                
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
          dataRender.length > 0 ? 
          (
            <div className="w-full">
              <section className="w-full grid md:grid-cols-2 grid-cols-1">
              
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