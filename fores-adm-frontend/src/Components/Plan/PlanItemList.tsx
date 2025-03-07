import { format } from "date-fns"
import { Calendar, Ruler } from "lucide-react"
import { Plan } from "../../models/interfaces/plan.interface"
import { useNavigate } from "react-router-dom"



const PlanListItem = (data:Plan) => {
  const navigate = useNavigate()

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy HH:mm")

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/plan/detalle/${data.id}`) // Redirige a la ruta con el ID del plan
  }

  

  return (
    <div title="Ver en detalle el plan"  onClick={handleClick} className="bg-white  border-2 border-lime-300 cursor-pointer shadow-sm rounded-lg p-4 mb-4 hover:border-lime-400 hover:bg-gray-100 transition-bg transition-border duration-300">
      <div className="flex justify-between items-center mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${data.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {data.activo ? "Activo" : "Inactivo"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <p>Inicio: {formatDate(data.fecha_inicio)}</p>
            <p>Fin: {formatDate(data.fecha_fin)}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Ruler className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <p>
              Longitud: {data.esquema.longitud}
            </p>
            <p>Ancho: {data.esquema.ancho}</p>
            <p>Espesor: {data.esquema.espesor}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanListItem

