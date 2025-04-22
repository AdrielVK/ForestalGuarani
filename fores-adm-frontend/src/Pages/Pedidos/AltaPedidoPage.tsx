import React, { useEffect, useRef, useState } from 'react';
import Layout from '../Layouts/Layout';
import { useGet } from '../../hooks/useGet';
import Input from '../../Components/ui/Input';
import Button from '../../Components/ui/Button';
import { usePost } from '../../hooks/usePost';
import { CreatePedidoReq, CreatePedidoState, Pedido } from '../../models/interfaces/pedidos.interface';
import { parseISO, set } from 'date-fns';



const CrearPedidoPage: React.FC = () => {
  const [pedido, setPedido] = useState<CreatePedidoState>({
    proveedor_nombre: '',
    pedido_fecha: new Date().toISOString().split('T')[0], // Set default to today's date
    rollisos: [{ rolliso_tipo: '', rolliso_longitud: 0, rolliso_diametro: 0, cantidad_equipos: 1 }],
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data: proveedores } = useGet<{ id: number; nombre: string }[]>('proveedor/list');
  const autocompleteRef = useRef<HTMLDivElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'proveedor_nombre') {
      setPedido({ ...pedido, [name]: value });
      setShowSuggestions(true);
    } else {
      setPedido({ ...pedido, [name]: value });
    }
  };

  const handleProveedorSelect = (nombre: string) => {
    setPedido({ ...pedido, proveedor_nombre: nombre });
    setShowSuggestions(false);
  };

  const handleRollisoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newRollisos = [...pedido.rollisos];
    newRollisos[index] = { ...newRollisos[index], [name]: (name.includes('cantidad')  && !isNaN(Number(value)) ) ? parseInt(value, 10) || 0 : (name.includes('rolliso_diametro') || name.includes('rolliso_longitud') && !isNaN(Number(value))) ? value : parseFloat(value) || 0 };
    setPedido({ ...pedido, rollisos: newRollisos });
  };

  const handleRollisoStringsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newRollisos = [...pedido.rollisos];
    newRollisos[index] = { ...newRollisos[index], [name]: value };
    setPedido({ ...pedido, rollisos: newRollisos });
  };

  const addRolliso = () => {
    setPedido({
      ...pedido,
      rollisos: [...pedido.rollisos, { rolliso_tipo: '', rolliso_longitud: 0, rolliso_diametro: 0, cantidad_equipos: 1 }],
    });
  };

  const removeRolliso = (index: number) => {
    const newRollisos = pedido.rollisos.filter((_, i) => i !== index);
    setPedido({ ...pedido, rollisos: newRollisos });
  };

  const { postLoading, post } = usePost<Pedido, CreatePedidoReq>('pedidos/create');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formattedPedido: CreatePedidoReq = {
      ...pedido,
      pedido_fecha: set(parseISO(pedido.pedido_fecha),{
        hours: 12,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      })
    };
  
    try {
      await post(formattedPedido);
      setPedido({
        proveedor_nombre: '',
        pedido_fecha: new Date().toISOString().split('T')[0],
        rollisos: [{ rolliso_tipo: '', rolliso_longitud: 0, rolliso_diametro: 0, cantidad_equipos: 1 }],
      })
      
    }catch{ /* empty */ }
  };

  const filteredProveedores = proveedores?.filter(p => 
    p.nombre.toLowerCase().includes(pedido.proveedor_nombre.toLowerCase())
  );

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Pedido</h2>
        
        <div className="mb-4">
          <Input 
            type="date"
            id="pedido_fecha"
            name="pedido_fecha"
            value={pedido.pedido_fecha}
            onChange={handleChange}
            required
            label='Fecha'
          />
        </div>

        <div className="mb-4 relative" ref={autocompleteRef}>
          <Input 
            type="text"
            id="proveedor_nombre"
            name="proveedor_nombre"
            value={pedido.proveedor_nombre}
            onChange={handleChange}
            required
            label='Nombre proveedor'
          />
          
          {showSuggestions && filteredProveedores && filteredProveedores.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredProveedores.map((proveedor) => (
                <li
                  key={proveedor.id}
                  onClick={() => handleProveedorSelect(proveedor.nombre)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {proveedor.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {pedido.rollisos.map((rolliso, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Rolliso {index + 1}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label='Tipo'
                type="text"
                id={`rolliso_tipo-${index}`}
                name="rolliso_tipo"
                value={rolliso.rolliso_tipo}
                onChange={(e) => handleRollisoStringsChange(index,e)}
                required
              />
              <Input 
                label='Diámetro'
                type="number"
                id={`rolliso_diametro-${index}`}
                name="rolliso_diametro"
                value={rolliso.rolliso_diametro}
                onChange={(e) => handleRollisoChange(index, e)}
                required
                step="0.01"
              />
              <Input 
                label='Longitud'
                type="number"
                id={`rolliso_longitud-${index}`}
                name="rolliso_longitud"
                value={rolliso.rolliso_longitud}
                onChange={(e) => handleRollisoChange(index, e)}
                required
                step="0.01"
              />
              <Input 
                label='Cantidad de Equipos'
                type="number"
                id={`cantidad_equipos-${index}`}
                name="cantidad_equipos"
                value={rolliso.cantidad_equipos}
                onChange={(e) => handleRollisoChange(index, e)}
                required
                min="1"
              />
            </div>
            {pedido.rollisos.length > 1 && (
              <button
                type="button"
                onClick={() => removeRolliso(index)}
                className="mt-2 px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Eliminar Rolliso
              </button>
            )}
          </div>
        ))}

        <div className="mt-4">
          <button
            type="button"
            onClick={addRolliso}
            className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
          >
            Agregar Rolliso
          </button>
        </div>

        <div className="mt-6">
          <Button 
            type='submit'
            text='Crear pedido'
            loading={postLoading}
          />
        </div>
      </form>
    </Layout>
  );
};

export default CrearPedidoPage;

