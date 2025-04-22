import type React from "react"
import {  useState } from "react"
import Input from "../ui/Input"
import Modal from "./Modal"
import { PaqueteStore, usePaqueteStore } from "../../store/paqueteStore"
import { FilterPaquete } from "../../models/interfaces/paquete.interface"
import { ChevronDown, ChevronUp } from "lucide-react"

const FilterPaquetesModal = ({
  onClose,
}: { onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void }) => {
  
  const { setFilter, applyFilter, filter } = usePaqueteStore((state: PaqueteStore) => state)

  
  const [localFilters, setLocalFilters] = useState<FilterPaquete>(filter)

  const [ordenInfo, setOrdenInfo] = useState<boolean>(false)
  const [piezaInfo, setPiezaInfo] = useState<boolean>(false)
  const [escuadriaInfo, setEscuadriaInfo] = useState<boolean>(false)

  const toggleOrdenInfo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOrdenInfo((prev) => !prev)

    setPiezaInfo(false)
    setEscuadriaInfo(false)
  }

  const togglePiezaInfo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPiezaInfo((prev) => !prev)

    setOrdenInfo(false)
    setEscuadriaInfo(false)
  }

  const toggleEscuadriaInfo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEscuadriaInfo((prev) => !prev)

    setOrdenInfo(false)
    setPiezaInfo(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const updatedFilters = { ...localFilters, [name]: value };
    
    setLocalFilters(updatedFilters);
  };

  const handleOrdenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      orden: {
        ...(prevFilters.orden),
        [name]: value,
      },
    }));
  };
  
  const handlePiezaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      pieza: {
        ...(prevFilters.pieza),
        [name]: value,
      },
    }));
  };
  
  const handleEscuadriaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      pieza: {
        ...(prevFilters.pieza),
        escuadria: {
          ...(prevFilters.pieza.escuadria), // Asegura que `escuadria` existe antes de hacer spread
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setFilter(localFilters)
    applyFilter()
    onClose(e)
  }


  return (
    <Modal
      onClose={(e) => {
        onClose(e)
      }}
      title="Filtrar Paquetes"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-4">
            <Input
              type="text"
              id="identificador"
              name="identificador"
              value={localFilters.identificador ?? ""}
              onChange={(e) => handleInputChange(e)}
              label="Identificador"
            />
            <Input
              type="text"
              id="vol"
              name="vol"
              value={localFilters.vol ?? ""}
              onChange={(e) => handleInputChange(e)}
              label="Volumen del paquete"
            />
            <Input
              type="date"
              label="Ingreso"
              id="ingreso"
              name="ingreso"
              value={localFilters.ingreso ?? ""}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              label="Estado"
              type="text"
              id="estado_value"
              name="estado_value"
              value={localFilters.estado_value || ""}
              onChange={(e) => handleInputChange(e)}
            />
            
          </div>
          <div className="space-y-4">
            <button
              type="button"
              onClick={toggleOrdenInfo}
              className="flex items-center text-sm text-lime-600 hover:text-lime-800 focus:outline-none mb-4"
            >
              {!ordenInfo ? (
                <>
                  <ChevronDown className="w-5 h-5 mr-1" />
                  Ver parametros de orden 
                </>
              ) : (
                <>
                  <ChevronUp className="w-5 h-5 mr-1" />
                  Ocultar parametros de orden 
                </>
              )}
            </button>
            {
              ordenInfo &&
              <>   
                <p className="text-sm font-semibold">Informacion de orden</p>
                <div className="grid grid-cols-2">
                  <Input
                    label="Numero"
                    id="numero"
                    name="numero"
                    value={localFilters.orden?.numero || ""}
                    onChange={(e) => handleOrdenChange(e)}
                  />
                  <Input
                    label="Volumen"
                    id="volumen"
                    name="volumen"
                    value={localFilters.orden?.volumen || ""}
                    onChange={(e) => handleOrdenChange(e)}
                  />
                  <Input
                    label="Cabado"
                    id="cabado_nombre"
                    name="cabado_nombre"
                    value={localFilters.orden?.cabado_nombre || ""}
                    onChange={(e) => handleOrdenChange(e)}
                  />
                  <Input
                    label="Nombre de cliente"
                    id="cliente_nombre"
                    name="cliente_nombre"
                    value={localFilters.orden?.cliente_nombre || ""}
                    onChange={(e) => handleOrdenChange(e)}
                  />
                </div>
              </>
            }
            <button
              type="button"
              onClick={togglePiezaInfo}
              className="flex items-center text-sm text-lime-600 hover:text-lime-800 focus:outline-none mb-4"
            >
              {!piezaInfo ? (
                <>
                  <ChevronDown className="w-5 h-5 mr-1" />
                  Ver parametros de pieza 
                </>
              ) : (
                <>
                  <ChevronUp className="w-5 h-5 mr-1" />
                  Ocultar parametros de pieza 
                </>
              )}
            </button>
            {
              piezaInfo &&
              <>
              
              <p className="text-sm font-semibold">Informacion de la pieza</p>
              <div className="grid grid-cols-2">
                <Input
                  label="Volumen"
                  type="text"
                  id="volumen"
                  name="volumen"
                  value={localFilters.pieza.volumen || ""}
                  onChange={(e) => handlePiezaChange(e)}
                />
                <Input
                  label="Espesor"
                  type="text"
                  id="espesor"
                  name="espesor"
                  value={localFilters.pieza.espesor || ""}
                  onChange={(e) => handlePiezaChange(e)}
                />
                <Input
                  label="Longitud"
                  type="text"
                  id="longitud"
                  name="longitud"
                  value={localFilters.pieza.longitud || ""}
                  onChange={(e) => handlePiezaChange(e)}
                />
                <Input
                  label="Ancho"
                  type="text"
                  id="ancho"
                  name="ancho"
                  value={localFilters.pieza.ancho || ""}
                  onChange={(e) => handlePiezaChange(e)}
                />
              </div>
              </>
            }
            <button
              type="button"
              onClick={toggleEscuadriaInfo}
              className="flex items-center text-sm text-lime-600 hover:text-lime-800 focus:outline-none mb-4"
            >
              {!escuadriaInfo ? (
                <>
                  <ChevronDown className="w-5 h-5 mr-1" />
                  Ver parametros de escuadria 
                </>
              ) : (
                <>
                  <ChevronUp className="w-5 h-5 mr-1" />
                  Ocultar parametros de escuadria 
                </>
              )}
            </button>
            {
              escuadriaInfo &&
              <>
              
              <p className="text-sm font-semibold mb-4">Informacion de la escuadria</p>
              <div className="grid grid-cols-2">
                <Input
                  label="Longitud"
                  id="longitud"
                  name="longitud"
                  value={localFilters.pieza.escuadria.longitud || ""}
                  onChange={(e) => handleEscuadriaChange(e)}
                />
                <Input
                  label="Altura"
                  id="altura"
                  name="altura"
                  value={localFilters.pieza.escuadria.altura || ""}
                  onChange={(e) => handleEscuadriaChange(e)}
                />
                <Input
                  label="Ancho"
                  id="ancho"
                  name="ancho"
                  value={localFilters.pieza.escuadria.ancho || ""}
                  onChange={(e) => handleEscuadriaChange(e)}
                />
                
              </div>
              </>
            }
            
            
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

export default FilterPaquetesModal

