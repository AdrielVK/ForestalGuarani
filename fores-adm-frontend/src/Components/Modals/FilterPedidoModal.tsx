import React, { useState } from 'react';
import Input from '../ui/Input';
import Modal from './Modal';
import { PedidoStore, usePedidoStore } from '../../store/pedidoStore';
import { parseISO } from 'date-fns';



const FilterModal = ({ onClose }: { onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void }) => {
  const { setFilter, applyFilter } = usePedidoStore();
  const filterState = usePedidoStore((state:PedidoStore) => state.filter)
  const [errorDate, setErrorDate] = useState(false);

  const validateSearch = (startDate: string, endDate:string): boolean => {
    if (startDate === '' || endDate === '') return false;
    return parseISO(startDate) >= parseISO(endDate);
  };

  const [localFilters, setLocalFilters] = useState(filterState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
    
      const updatedFilters = { ...localFilters, [name]: value };
    
      const startDate = name === "startDate" ? value : updatedFilters.startDate ?? "";
      const endDate = name === "endDate" ? value : updatedFilters.endDate ?? "";
    
      setLocalFilters(updatedFilters);
      setErrorDate(validateSearch(startDate, endDate));
    };


  const handleSubmit = (e: React.FormEvent) => {
    setFilter(localFilters); 
    applyFilter(); 
    onClose(e); 
  };



  return (
    <Modal onClose={(e) => {onClose(e)}} title="Filtrar Pedidos">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4 space-y-2">
          <Input 
            type="date"
            id="startDate"
            name="startDate" // Asegúrate de que el name sea el correcto
            value={localFilters.startDate}
            onChange={(e) => handleInputChange(e)}
            label='Fecha inicial'
            
          />
          <Input 
            type="date"
            id="endDate"
            name="endDate" 
            value={localFilters.endDate}
            onChange={(e) => handleInputChange(e)}
            label='Fecha final'
            
          />

          <Input 
            label='Nombre de proveedor'
            id="nombre"
            name="nombre" 
            value={localFilters.nombre || ''}
            onChange={(e) => handleInputChange(e)}
          />

          <Input 
            label='Tipo de rolliso'
            id="tipo"
            name="tipo" 
            value={localFilters.tipo || ''}
            onChange={(e) => handleInputChange(e)}
          />

          <Input 
            label='Longitud de rolliso'
            id="longitud"
            name="longitud" 
            value={localFilters.longitud || ''}
            onChange={(e) => handleInputChange(e)}
          />

          <Input 
            label='Diametro de rolliso'
            id="diametro"
            name="diametro" 
            value={localFilters.diametro || ''}
            onChange={(e) => handleInputChange(e)}
          />          
        </div>
        
        
        {errorDate && <p className="text-red-700 text-sm">La fecha inicial debe ser menor a la fecha final</p>}
        <div className="flex justify-end">
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
            className={`px-4 py-2 text-sm font-medium text-white ${errorDate ? "bg-gray-300 ":"bg-lime-600 hover:bg-lime-700" }  rounded-szm transition-colors`}
          >
            Aplicar Filtro
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FilterModal;
