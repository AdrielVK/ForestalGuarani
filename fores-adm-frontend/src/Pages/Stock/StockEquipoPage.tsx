import { useEffect, useState } from "react"
import EquipoStockItem from "../../Components/Stocks/Equipos/EquipoStockItem"
import { useGet } from "../../hooks/useGet"
import type { EquipoStock } from "../../models/interfaces/equipo.interfaces"
import Layout from "../Layouts/Layout"
import { Truck, BarChart2, Filter } from "lucide-react"
import Input from "../../Components/ui/Input"

interface RollisoType {
  tipo: string
  cantidad: number
}

const StockEquipoPage = () => {
  const { data, loading } = useGet<EquipoStock[]>("equipo/list/stock")
  const [dataRender, setDataRender] = useState<EquipoStock[]>([])
  
  const numberOfEquipos = data?.length || 0
  const [tipo, setTipo] = useState<string | null>(null)

  const [diametro, setDiametro] = useState<number | null>(null)
  const [longitud, setLongitud] = useState<number | null>(null)
  const [statsRolliso, setStatsRolliso] = useState<RollisoType[]>([])

  useEffect(() => {
    if (data){
      setDataRender(data)
    }
  }, [data])

  useEffect(() => {
    if (!data) return;
  
    let filteredData = [...data]; // Siempre partimos de los datos originales
  
  
    if (tipo) {
      filteredData = filteredData.filter((item) =>
        item.rolliso.tipo.toLowerCase().includes(tipo.toLowerCase())
      );
    }

    if (longitud !== null){
      filteredData = filteredData.filter((item) => item.rolliso.longitud === longitud.toString())
    }
    
    if (diametro !== null){
      filteredData = filteredData.filter((item) => item.rolliso.diametro === diametro.toString())
    }
    setDataRender(filteredData);
  }, [data, diametro, longitud, tipo]);

  const onChangeTipo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ''){
      setTipo(null)
    }
    if (e.target.value !== null ) {
      setTipo(e.target.value)
    }
  }

  const onChangeLongitud = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ''){
      setLongitud(null)
    }
    if ( parseInt(e.target.value) === 0) {
      setLongitud(0)
    }
    if (e.target.value !== null && Number((e.target.value))) {
      setLongitud(Number(e.target.value))
    }
  }

  const onChangeDiametro = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ''){
      setDiametro(null)
    }
    if ( parseInt(e.target.value) === 0) {
      setDiametro(0)
    }
    if (e.target.value !== null && Number((e.target.value))) {
      setDiametro(Number(e.target.value))
    }
  }

  useEffect(() => {
    if (data) {
      const updatedStats = data.reduce<RollisoType[]>((acc, equipo) => {
        const existingStat = acc.find((stat) => stat.tipo === equipo.rolliso.tipo)
        if (existingStat) {
          existingStat.cantidad++
        } else {
          acc.push({ tipo: equipo.rolliso.tipo, cantidad: 1 })
        }
        return acc
      }, [])

      setStatsRolliso(updatedStats)
    }
  }, [data])

  return (
    <Layout>
      <section className="box-border w-full justify-center flex flex-col space-y-6">
        <header className="w-full bg-white rounded-lg ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Equipos</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Truck className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Total de Equipos</h2>
              </div>
              <p className="text-3xl font-bold text-blue-600">{numberOfEquipos}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <span className="box-border w-full flex justify-center">
                  <Filter className="w-6 h-6 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-700">Filtrar</h2>
                </span>
                <Input
                  label="Tipo de rollizo"
                  id="tipo"
                  name="tipo"
                  type="text"
                  value={tipo ?? ''}
                  onChange={onChangeTipo}
                />
                <Input
                  label="Diametro"
                  id="diametro"
                  name="diametro"
                  type="text"
                  value={diametro ?? ''}
                  onChange={onChangeDiametro}
                />
                <Input
                  label="Longitud"
                  id="longitud"
                  name="longitud"
                  type="text"
                  value={longitud ?? ''}
                  onChange={onChangeLongitud}
                />
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BarChart2 className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Rollizos por Tipo</h2>
              </div>
              <div className="space-y-2">
                {statsRolliso.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{stat.tipo}</span>
                    <span className="text-gray-800 font-semibold">{stat.cantidad}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Detalles de Stock</h1>

        <div className="w-full">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : dataRender.length > 0 && !loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataRender.map((equipo, index) => (
                <EquipoStockItem {...equipo} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-900">Sin resultados</p>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default StockEquipoPage

