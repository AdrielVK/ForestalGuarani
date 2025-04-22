import { useEffect, useRef, useState } from "react"
import Input from "../ui/Input"
import Modal from "./Modal"
import { useGet } from "../../hooks/useGet"
import { usePatch } from "../../hooks/usePatch"
import { EditEstadoPaqueteRequest } from "../../models/interfaces/paquete.interface"
import Button from "../ui/Button"

const EditEstadoPaqueteModal = ({onClose, idPaquete}: {idPaquete:number, onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void}) => {
  
  const [valueEstado, setValueEstado] = useState<string>('')

  const [showSuggestions, setShowSuggestions] = useState(false);
    
  const autocompleteRef = useRef<HTMLDivElement>(null);
  
  const {data: dataEstadosValue} = useGet<string[]>('estado/list')
 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValueEstado(e.target.value)
    setShowSuggestions(e.target.value.length > 0);
  }

  const handleEstadoSelect = (value: string) => {
    setValueEstado(value)
    setShowSuggestions(false)
  }
  const {patchLoading, patch} = usePatch<string, EditEstadoPaqueteRequest>('paquete/edit/estado')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      id: idPaquete,
      estadoValue: valueEstado
    }

    await patch(data)
  }
  
  return (
    <Modal onClose={onClose} title="Cambiar estado del paquete">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative" ref={autocompleteRef}>
          <Input 
            type="text"
            id="valueEstado"
            name="valueEstado"
            value={valueEstado}
            onChange={handleChange}
            required
            label="Estado"
          />

          {showSuggestions && dataEstadosValue && dataEstadosValue.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {dataEstadosValue.map((estado, index) => (
                <li
                  key={index}
                  onClick={() => handleEstadoSelect(estado)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {estado}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <Button text="Cambiar" type="submit" loading={patchLoading}/>
      </form>
    </Modal>
  )
}

export default EditEstadoPaqueteModal;