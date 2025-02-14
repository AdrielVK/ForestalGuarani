import type React from "react"
import { useState } from "react"
import Input from "../ui/Input"
import Modal from "./Modal"
import { parseISO } from "date-fns"
import { type IngresoStore, useIngresoStore } from "../../store/ingresoStore"
import type { IFilterIngresos } from "../../Pages/Ingresos/ListaIngresoPage"

const FilterIngresoModal = ({
  onClose,
}: { onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void }) => {
  const { setFilter, applyFilter, filter } = useIngresoStore((state: IngresoStore) => state)

  const [errorDate, setErrorDate] = useState(false)

  const validateSearch = (startDate: string, endDate: string): boolean => {
    if (startDate === "" || endDate === "") return false
    console.log("inicio", parseISO(startDate), "fin", parseISO(endDate))
    return parseISO(startDate) >= parseISO(endDate)
  }

  const [localFilters, setLocalFilters] = useState<IFilterIngresos>(filter)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const updatedFilters = { ...localFilters, [name]: value };
  
    const startDate = name === "startDate" ? value : updatedFilters.startDate ?? "";
    const endDate = name === "endDate" ? value : updatedFilters.endDate ?? "";
  
    setLocalFilters(updatedFilters);
    setErrorDate(validateSearch(startDate, endDate));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setFilter(localFilters)
    applyFilter()
    onClose(e)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number.parseInt(e.target.value) === 1) {
      setLocalFilters({ ...localFilters, fuente_controlada: true })
    } else {
      setLocalFilters({ ...localFilters, fuente_controlada: false })
    }
  }

  return (
    <Modal
      onClose={(e) => {
        onClose(e)
      }}
      title="Filtrar Pedidos"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-4">
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={localFilters.startDate ?? ""}
              onChange={(e) => handleInputChange(e)}
              label="Fecha inicial"
            />
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={localFilters.endDate ?? ""}
              onChange={(e) => handleInputChange(e)}
              label="Fecha final"
            />
            <Input
              label="Nombre de proveedor"
              id="nombre"
              name="nombre"
              value={localFilters.nombre || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              label="Tipo de rolliso"
              id="tipo"
              name="tipo"
              value={localFilters.tipo || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              label="Longitud de rolliso"
              id="longitud"
              name="longitud"
              value={localFilters.longitud || ""}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="space-y-4">
            <Input
              label="Diametro de rolliso"
              id="diametro"
              name="diametro"
              value={localFilters.diametro || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              label="Nombre del chofer"
              id="chofer"
              name="chofer"
              value={localFilters.chofer || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              label="Patente del camion"
              id="patente"
              name="patente"
              value={localFilters.patente || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              label="Peso"
              id="peso"
              name="peso"
              value={localFilters.peso || ""}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="space-y-1">
              <label htmlFor="fuente_controlada" className="block text-sm font-medium text-gray-700">
                Fuente controlada
              </label>
              <select
                id="fuente_controlada"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                name="posicion"
                onChange={(e) => handleSelectChange(e)}
                value={localFilters.fuente_controlada === true? 1 : localFilters.fuente_controlada === false? 0 : ''}
              >
                <option></option>
                <option value={1}>Si</option>
                <option value={0}>No</option>
              </select>
            </div>
          </div>
        </div>

        {errorDate && <p className="text-red-700 text-sm mt-4">La fecha inicial debe ser menor a la fecha final</p>}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            disabled={errorDate}
            type="submit"
            className={`px-4 py-2 text-sm font-medium text-white ${errorDate ? "bg-gray-300" : "bg-lime-600 hover:bg-lime-700"} rounded-md transition-colors`}
          >
            Aplicar Filtro
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default FilterIngresoModal

