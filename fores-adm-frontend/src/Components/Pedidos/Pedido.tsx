import React from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Equipo, Proveedor } from '../../models/interfaces/pedidos.interface';

interface PedidoProps {
  id: number;
  fecha: string;
  proveedor: Proveedor;
  equipos: Equipo[];
}

const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return isValid(date) ? format(date, 'dd/MM/yyyy') : 'Fecha inválida';
};

const Pedido: React.FC<PedidoProps> = ({ id, fecha, proveedor, equipos }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Pedido #{id}</h2>
        <span className="text-sm text-gray-600">
          {formatDate(fecha)}
        </span>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Proveedor</h3>
        <p className="text-gray-600">{proveedor.nombre}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Equipos</h3>
        {equipos.map((equipo) => (
          <div key={equipo.id} className="mb-4 bg-gray-50 p-4 rounded-md">
            <h4 className="text-md font-medium text-gray-700 mb-2">
              Equipo #{equipo.id}
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Diámetro</th>
                    <th className="px-4 py-2 text-left">Longitud</th>
                    <th className="px-4 py-2 text-left">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2">{equipo.rolliso.id}</td>
                      <td className="px-4 py-2">{equipo.rolliso.diametro}</td>
                      <td className="px-4 py-2">{equipo.rolliso.longitud}</td>
                      <td className="px-4 py-2">{equipo.rolliso.tipo}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedido;

