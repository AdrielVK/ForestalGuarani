import { useEffect, useState } from "react"
import { useGet } from "../../hooks/useGet"
import Layout from "../Layouts/Layout"
import { BarChart2, Filter, MapPinned } from "lucide-react"
import { PosicionStock } from "../../models/interfaces/ingresos.interface"
import PosicionStockItem from "../../Components/Stocks/Ingresos/PosicionStockItem"
import Input from "../../Components/ui/Input"

interface RollisoType {
  tipo: string
  cantidad: number
}

const StockEquipoPage = () => {
  const { data, loading } = useGet<PosicionStock[]>("posicion/list/stock")
  const { data:dataCount } = useGet<number>('posicion/count');

  const [dataRender, setDataRender] = useState<PosicionStock[]>([])
  const [statsRolliso, setStatsRolliso] = useState<RollisoType[]>([])
  const [porcentaje, setPorcentaje] = useState<number>(0);
  const [posiciones, setPosiciones] = useState<number>(0);

  const [tipo, setTipo] = useState<string | null>(null)
  const [posicion, setPosicion] = useState<number | null>(null)

  useEffect(() => {
    if (data){
      setDataRender(data)
    }
  }, [data])

  const onChangePosicion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ''){
      setPosicion(null)
    }
    if ( parseInt(e.target.value) === 0) {
      setPosicion(0)
    }
    if (e.target.value !== null && Number((e.target.value))) {
      setPosicion( parseInt(e.target.value))
      
    }
  }


  const onChangeTipo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ''){
      setTipo(null)
    }
    if (e.target.value !== null ) {
      setTipo(e.target.value)
    }
  }

  useEffect(() => {
    if (!data) return;
  
    let filteredData = [...data]; 
  
    if (posicion !== null) {
      filteredData = filteredData.filter((item) => item.identificador === posicion);
    }
  
    if (tipo) {
      filteredData = filteredData.filter((item) =>
        item.equipo.rolliso.tipo.toLowerCase().includes(tipo.toLowerCase())
      );
    }
  
    setDataRender(filteredData);
  }, [data, posicion, tipo]);
  

  useEffect(() => {
    
    if (data) {
      setPosiciones(data.length)
      const updatedStats = data.reduce<RollisoType[]>((acc, posicion) => {
        const existingStat = acc.find((stat) => stat.tipo === posicion.equipo.rolliso.tipo)
        if (existingStat) {
          existingStat.cantidad++
        } else {
          acc.push({ tipo: posicion.equipo.rolliso.tipo, cantidad: 1 })
        }
        return acc
      }, [])
      
      setStatsRolliso(updatedStats)
    }
    
    if (dataCount) {
      setPorcentaje( posiciones/dataCount*100)
    }
  }, [data, dataCount, posiciones])

  return (
    <Layout>
      <section className="box-border w-full justify-center flex flex-col space-y-6">
        <header className="w-full bg-white rounded-lg ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Posiciones</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPinned className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Total de posiciones ocupadas</h2>
              </div>
              <p className="text-3xl font-bold text-blue-600">{posiciones}</p>
              <p className="text-xl font-bold text-blue-600">{porcentaje.toFixed(2)} % de la playa ocupada</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BarChart2 className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">Posiciones por tipo</h2>
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

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex flex-col items-center mb-2 space-y-3">
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
                  label="Posicion"
                  id="posicion"
                  name="posicion"
                  type="text"
                  value={posicion ?? ''}
                  onChange={onChangePosicion}
                />
              </div>
            
            </div>
          </div>
        </header>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Detalles de Stock</h1>

        <div className="w-full">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : dataRender ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataRender.map((equipo, index) => (
                <PosicionStockItem {...equipo} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-red-600">Error al cargar los datos</p>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default StockEquipoPage

