import { useState } from "react"
import Input from "../ui/Input"
import Modal from "./Modal"
import { usePatch } from "../../hooks/usePatch"
import Button from "../ui/Button"
import { SetEgresoRequest } from "../../models/interfaces/ciclo.interfaces"
import { CiclosStore, useCicloStore } from "../../store/cicloStore"

const SetEgresoCicloModal = ({onClose, id}: {id:number, onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void}) => {
  
  const [dateValue, setDateValue] = useState<string>('')

  const {reFetch, handleReFetch} = useCicloStore((state: CiclosStore) => state);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDateValue(e.target.value)
  }

  const {patchLoading, patch} = usePatch<string, SetEgresoRequest>('ciclo/edit/egreso')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (dateValue !== '') {

      const data: SetEgresoRequest = {
        id: id,
        egreso: new Date(dateValue)
      }
      await patch(data)

      handleReFetch(!reFetch)
    }

  }
  
  return (
    <Modal onClose={onClose} title={`Agregar egreso al ciclo #${id}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          type="datetime-local"
          id="valueEstado"
          name="valueEstado"
          value={dateValue}
          onChange={handleChange}
          required
          label="Estado"
        />
        
        
        <Button text="Cambiar" type="submit" loading={patchLoading}/>
      </form>
    </Modal>
  )
}

export default SetEgresoCicloModal;