import { useEffect, useMemo, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { FilterOrden, OrdenDetail, StatsOrden, TypeFilterOrden } from "../../models/interfaces/orden.interfaces";
import Layout from "../Layouts/Layout";
import OrdenItemDetail from "../../Components/Orden/OrdenDetailItem";
import { Filter, Layers2, SquareChartGantt } from "lucide-react";
import Input from "../../Components/ui/Input";
import { OrdenStore, useOrdenStore } from "../../store/ordenStore";

const ListaOrdenPage = () => {

  const {reFetch} = useOrdenStore((state:OrdenStore) => state)

  const { data, loading } = useGet<OrdenDetail[]>("orden/list", reFetch)

  const [dataRender, setDataRender] = useState<OrdenDetail[]>([])
  
  const [filterView, setFilterView] = useState<TypeFilterOrden>('todos')

  const [filterLocal, setFilterLocal] = useState<FilterOrden>({
    acabado: '',
    cliente: ''
  })

  const [stats, setStats] = useState<StatsOrden>({
    total: 0,
    asignados:0,
    no_asignados:0,
    volumen: 0,
    cant_filtrada: 0,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setFilterLocal((prev) => ({
      ...prev,
      [name]: value ? value : ''
    }))
  }

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TypeFilterOrden
    setFilterView(value);
  };


  useEffect(() => {
    if (!data) return;
    //setDataRender(data);
    let filteredData = [...data]
    const totalLength = data.length;
    const asignadosLength = data.filter((item) => item.planId !== null).length;
  
    setStats((prevStats) => ({
      ...prevStats, 
      total: totalLength,
      asignados: asignadosLength,
      no_asignados: totalLength - asignadosLength
    }));

    
    if (filterLocal.acabado != null && filterLocal.acabado.toString() !== ''){
      filteredData = filteredData.filter((item) => 
        item.cabado.nombre.toString().startsWith(filterLocal.acabado ?? '')
      );
    }

    if (filterLocal.cliente != null && filterLocal.cliente !== '') {
      filteredData = filteredData.filter((item) => item.cliente.nombre.startsWith(filterLocal.cliente) || item.cliente.numero.startsWith(filterLocal.cliente))
    }

    switch(filterView){
      case 'asignados':
        filteredData = filteredData.filter(item => item.planId)
        break;
      
      case 'no_asignados':
        filteredData = filteredData.filter(item => !item.planId)
        break
      
      case 'todos':
      default:
        break;
    }

    setStats((prevStats) => ({
      ...prevStats, 
      cant_filtrada: filteredData.length
    }));

    setDataRender(filteredData);

  }, [data, filterLocal, filterView]);
  
  const totalVolumen = useMemo(() => {
    return dataRender.reduce((acc, orden) => acc + orden.volumen, 0)
  }, [dataRender])

  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      volumen: totalVolumen,
    }));
  }, [totalVolumen]);


  return (
    <Layout>
      <div className="flex flex-col w-full">
        <header className="w-full bg-white mx-3 mb-4 rounded-lg ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Planes</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <SquareChartGantt className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Total de Ordenes </h2>
                <p className="ml-4 text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <div className="flex w-full items-center mb-2">
                <p className="text-lg ml-8 font-semibold text-gray-700">Ordenes asignadas:  </p>

                <p className="text-xl font-bold ml-4 text-blue-600">{stats.asignados}</p>
              
                <span className="ml-auto text-base font-bold text-lime-700">{(stats.asignados * 100 / stats.total).toFixed(1)}%</span>

              </div>
              <div className="flex w-full items-center mb-2">
                <p className="text-lg ml-8 font-semibold text-gray-700">Ordenes no asignados:  </p>

                <p className="text-xl font-bold ml-4 text-blue-600">{stats.no_asignados}</p>
              
                <span className="ml-auto text-base font-bold text-lime-700">{(stats.no_asignados * 100 / stats.total).toFixed(1)}%</span>

              </div>
              
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center flex-col justify-center mb-4">
                <div className="flex ">
                  <Filter className="w-6 h-6 text-green-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-700">Filtrar</h2>
                </div>
                <div className="w-full space-y-2">
                  <Input 
                    type="text"
                    label="Cliente"
                    name="cliente"
                    placeholder="Nombre o numero"
                    id="cliente"
                    onChange={onChange}
                    value={filterLocal.cliente}
                  />
                  <Input 
                    type="text"
                    label="Acabado"
                    name="acabado"
                    placeholder="Tipo de acabado"
                    id="acabado"
                    onChange={onChange}
                    value={filterLocal.acabado}
                  />
                  <div className="mt-4">
                    <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de filtro
                    </label>
                    <select
                      id="filterType"
                      className="w-full px-3 mt-2 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                      value={filterView}
                      onChange={onChangeSelect}
                    >
                      <option value={'todos'}>Todos</option>
                      <option value={'asignados'}>Asignados</option>
                      <option value={'no_asignados'}>No asignados</option>
                    </select>
                    
                  </div>
                </div>
              </div>
              
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="w-full mb-2 flex justify-center items-center">
                <Layers2 className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-700">Estadisticas</h2>
              </div>
              <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Volumen total: {stats.volumen}</p>
              <p className="ml-4 mb-2 text-lg font-semibold text-yellow-600">Cantidad ordenes filtrada: {stats.cant_filtrada}</p>

            </div>
          </div>
        </header>
        {loading ? (
          <p>Cargando...</p>
        ) : dataRender.length > 0 ? (
          <section className="grid md:grid-cols-3 grid-cols-1 w-full">
            {
              dataRender.map((item) => <OrdenItemDetail {...item} key={item.id} />)
            }
          </section>
        ) : (
          <p className="w-full text-center mb-5">Sin órdenes disponibles...</p>
        )}

      </div>
    </Layout>
  )
}

export default ListaOrdenPage;