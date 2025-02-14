import { useEffect, useState } from "react";
import Layout from "../Layouts/Layout"
import { CreateIngresosRequest, CreateIngresosState, IngresoDetail, Posicion } from "../../models/interfaces/ingresos.interface";
import Input from "../../Components/ui/Input";
import { useGet } from "../../hooks/useGet";
import { useRef } from "react";
import Button from "../../Components/ui/Button";
import { usePost } from "../../hooks/usePost";
import { parseISO, set } from "date-fns";


const AltaIngresoPage: React.FC = () => {

  const [ingreso, setIngreso] = useState<CreateIngresosState>({
    proveedorName: '',
    fuente_controlada: false,
    fecha: new Date().toISOString().split('T')[0],
    chofer: '',
    patente: '',
    peso: 0,
    equipos: [{tipo:'', diametro:0, longitud:0, posicion:0}]
  })

  const [reFetchPos, setReFetchPos] = useState(false);

  const [posiciones, setPosiciones] = useState<Posicion[]>([])

  const {data, loading} = useGet<Posicion[]>('posicion/list', reFetchPos);

  useEffect(() => {
    if(data){
      setPosiciones(data)
    }
  },[data])

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

  const filteredProveedores = proveedores?.filter(p => 
    p.nombre.toLowerCase().includes(ingreso.proveedorName.toLowerCase())
  );

  const handleProveedorSelect = (nombre: string) => {
    setIngreso({ ...ingreso, proveedorName: nombre });
    setShowSuggestions(false);
  };

  

  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (parseInt(e.target.value) === 1 ){
      setIngreso({...ingreso, fuente_controlada: true})
    } else {
      setIngreso({...ingreso, fuente_controlada: false})

    }

  }

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);
    if (numberValue && numberValue > 0) {
      setIngreso({ ...ingreso, [name]: numberValue });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'proveedorName') {
      setIngreso({ ...ingreso, [name]: value });
      setShowSuggestions(true);
    } else {
      setIngreso({ ...ingreso, [name]: value });
    }
  };

  const handleEquipoStringsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEquipo = [...ingreso.equipos];
    newEquipo[index] = { ...newEquipo[index], [name]: value };
    setIngreso({ ...ingreso, equipos: newEquipo });
  };

  const handleEquipoChange = (index: number, e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newEquipo = [...ingreso.equipos];
    newEquipo[index] = { ...newEquipo[index], [name]: (name.includes('cantidad')  && !isNaN(Number(value)) ) ? parseInt(value, 10) || 0 : (name.includes('rolliso_diametro') || name.includes('rolliso_longitud') && !isNaN(Number(value))) ? value : parseFloat(value) || 0 };
    setIngreso({ ...ingreso, equipos: newEquipo });
  };

  const removeEquipo = (index: number) => {
    const newRollisos = ingreso.equipos.filter((_, i) => i !== index);
    setIngreso({ ...ingreso, equipos: newRollisos });
  };

  const addEquipo= () => {
    setIngreso({
      ...ingreso,
      equipos: [...ingreso.equipos, { tipo:'', diametro:0, longitud:0, posicion:0 }],
    });
  };

  const { postLoading, post } = usePost<IngresoDetail, CreateIngresosRequest>('ingresos/create');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formattedIngreso: CreateIngresosRequest = {
      ...ingreso,
      fecha: set(parseISO(ingreso.fecha), {
        hours: 12,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      })
    }
    console.log(formattedIngreso)
    try {
      await post(formattedIngreso);
      setIngreso({
        proveedorName: '',
        fuente_controlada: false,
        fecha: new Date().toISOString().split('T')[0],
        chofer: '',
        patente: '',
        peso: 0,
        equipos: [{tipo:'', diametro:0, longitud:0, posicion:0}]
      })
      setReFetchPos(!reFetchPos)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Ingreso</h2>

        <div className="mb-4">
          <Input 
            type="date"
            id="fecha"
            name="fecha"
            value={ingreso.fecha}
            onChange={handleChange}
            required
            label='Fecha'
          />
        </div>

        <div className="mb-4">
          <label htmlFor={"fuente_controlada"} className="block text-sm font-medium text-gray-700">
              Fuente controlada
          </label>
          <select
            id="fuente_controlada"
            className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
            name="fuente_controlada"
            onChange={handleChangeSelect}
          >
            <option className="rounded-none" value={0}>No</option>
            <option className="rounded-none" value={1}>Sí</option>
          </select>
        </div>

        <div className="mb-4 relative" ref={autocompleteRef}>
          <Input 
            type="text"
            id="proveedorName"
            name="proveedorName"
            value={ingreso.proveedorName}
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

        <div className="mb-4">
          <Input 
            type="text"
            id="chofer"
            name="chofer"
            value={ingreso.chofer}
            onChange={handleChange}
            required
            label='Nombre del chofer'
          />
        </div>

        <div className="mb-4">
          <Input 
            type="text"
            id="patente"
            name="patente"
            value={ingreso.patente}
            onChange={handleChange}
            required
            label='Patente del camion'
          />
        </div>
        
        <div className="mb-4">
          <Input 
            type="text"
            id="peso"
            name="peso"
            value={ingreso.peso}
            onChange={handleChangeNumber}
            required
            label='Peso total en toneladas'
          />
        </div>

        {
          ingreso.equipos.map((equipo, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Equipo {index + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label='Tipo'
                type="text"
                id={`tipo-${index}`}
                name="tipo"
                value={equipo.tipo}
                onChange={(e) => handleEquipoStringsChange(index,e)}
                required
              />
              <Input 
                label='Diámetro'
                type="number"
                id={`diametro-${index}`}
                name="diametro"
                value={equipo.diametro}
                onChange={(e) => handleEquipoChange(index, e)}
                required
                step="0.1"
              />
              <Input 
                label='Longitud'
                type="number"
                id={`longitud-${index}`}
                name="longitud"
                value={equipo.longitud}
                onChange={(e) => handleEquipoChange(index, e)}
                required
                step="0.1"
              />
              <label htmlFor={`posicion-${index}`} className="block text-sm font-medium text-gray-700">
                Posicion en playa de acopio
                <p className="text-xs text-red-600">Cuidado: si selecciona una posicion que esta ocupada, en esta ultima se almacenara el ultimo equipo que en ella se almacene</p>
              </label>
              <select
                id={`posicion-${index}`}
                className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                name="posicion"
                onChange={(e) => handleEquipoChange(index, e)}
              >
                { loading ?
                  <p>Cargando...</p>
                  :
                  posiciones.map((posicion, index) => (
                    <option key={index} className="rounded-none" value={posicion.identificador}>Posicion: {posicion.identificador} {posicion.ocupado ? <span className="space-x-1 font-semibold">ocupado</span> : <span className="space-x-1 font-semibold">libre</span>}</option>
                  ))
                }
              </select>
              </div>
              {ingreso.equipos.length > 1 && (
              <button
                type="button"
                onClick={() => removeEquipo(index)}
                className="mt-2 px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Eliminar Rolliso
              </button>
            )}
            </div>
          ))
        }

        <div className="mt-4">
          <button
            type="button"
            onClick={addEquipo}
            className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
          >
            Agregar Equipo
          </button>
        </div>

        <div className="mt-6">
          <Button 
            type="submit"
            text='Crear ingreso'
            loading={postLoading}
          />
        </div>

      </form>
    </Layout>
  )
}

export default AltaIngresoPage;