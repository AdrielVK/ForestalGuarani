import React from 'react';
import PedidoListItem from './PedidoItem';
import { Pedido } from '../../models/interfaces/pedidos.interface';

interface PedidoListProps {
  pedidos: Pedido[];
}

const PedidoList: React.FC<PedidoListProps> = ({ pedidos }) => {
  return (
    <div className="space-y-4">
      {pedidos.map((pedido, index) => (
        <PedidoListItem key={index} {...pedido} />
      ))}
    </div>
  );
};

export default PedidoList;

