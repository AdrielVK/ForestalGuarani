import { useEffect, useState } from "react";
import Modal from "./Modal";
import { FilterCiclos } from "../../models/interfaces/ciclo.interfaces";
import { CiclosStore, useCicloStore } from "../../store/cicloStore";
import Input from "../ui/Input";
import Switch from 'react-switch';

const FilterCicloModal = ({
  onClose
}: { onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void }) => {
  
  
  const {setFilter, applyFilter, filter} = useCicloStore((state:CiclosStore) => state)
  
  const [localFilters, setLocalFilters] = useState<FilterCiclos>(filter)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const updatedFilters = { ...localFilters, [name]: value };
    
    setLocalFilters(updatedFilters);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.stopPropagation()
    setFilter(localFilters)
    applyFilter()
    onClose(e)
  }

  const [activeCicloFilter, setActiveCicloFilter] = useState(filter.activos)

  const handleViewDetalles = () => {
    setActiveCicloFilter((prev) =>  !prev);

  };
  
  useEffect(() => {
    setLocalFilters({...localFilters, ['activos']: activeCicloFilter})
  },[activeCicloFilter])

  
  return (
    <Modal title="Filtrar ciclos de secado" onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="space-y-4">
          <Input
            type="text"
            id="estado"
            name="estado"
            value={localFilters.estado ?? ""}
            onChange={(e) => handleInputChange(e)}
            label="Estado del paquete"
          />

          <Input
            type="text"
            id="identificador"
            name="identificador"
            value={localFilters.identificador ?? ""}
            onChange={(e) => handleInputChange(e)}
            label="Identificador del paquete"
          />

          <Input
            type="text"
            id="numeroOrden"
            name="numeroOrden"
            value={localFilters.numeroOrden ?? ""}
            onChange={(e) => handleInputChange(e)}
            label="Numero de orden de prod"
          />

          <label className="text-gray-500 text-sm flex flex-row w-full items-center md:justify-center">
            Ver ciclos activos
            <Switch
              onChange={handleViewDetalles}
              checked={activeCicloFilter ?? false}
              offColor="#ccc"
              onColor="#65a30d"
              className="items-center mx-1 justify-center"
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </label>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            id="nombreCliente"
            name="nombreCliente"
            value={localFilters.nombreCliente ?? ""}
            onChange={(e) => handleInputChange(e)}
            label="Nombre del cliente"
          />

          <Input
            type="text"
            id="cabado"
            name="cabado"
            value={localFilters.cabado ?? ""}
            onChange={(e) => handleInputChange(e)}
            label="Acabado"
          />
          <div className="bg-gray-100 p-2 rounded-md space-y-3">
            <Input
              type="date"
              id="fecha"
              name="fecha"
              label="Fecha"
              value={localFilters.fecha ?? ""}
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="fechaStrategy" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de filtrado segun la fecha
            </label>
            <select
              id="fechaStrategy"
              name="fechaStrategy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
              value={localFilters.fechaStrategy}
              onChange={handleInputChange}
            >
              <option value={'desde'}>Ingreso desde</option>
              <option value={'exacta'}>Ingreso exacto</option>
              <option value={'egreso'}>Egreso exacto</option>
            </select>

          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onClose}
          className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium text-white bg-lime-600 hover:bg-lime-700" rounded-md transition-colors`}
        >
          Aplicar Filtro
        </button>
      </div>
      </form>
    </Modal>
  )
}

export default FilterCicloModal;