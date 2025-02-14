import { create } from "zustand";
import { Pedido } from "../models/interfaces/pedidos.interface";
import { IFilter } from "../Pages/Pedidos/ListPedidoPage";

export interface PedidoState {
  viewDetalles: boolean;
  pedidos: Pedido[]
  filteredPedidos: Pedido[]
  filter: IFilter
}

export const primitiveFilter = {
  startDate: '',
  endDate: '',
  nombre: null,
  tipo: null,
  longitud: null,
  diametro: null,
}

export type PedidoActions = {
  switchViewDetalles: (value:boolean) => void;
  setPedidos: (pedidos: Pedido[]) => void;
  removePedido: (pedidoId: number) => void;
  resetFilter: () => void;
  setFilter: (filter:IFilter) => void;
  applyFilter: () => void,
  resetFilteredPedidos: () => void
}

export type PedidoStore = PedidoActions & PedidoState;

export const InitialState: PedidoState = {
  viewDetalles: true,
  pedidos: [],
  filteredPedidos: [],
  filter: primitiveFilter
}

export const usePedidoStore = create<PedidoStore>((set) => ({
  ...InitialState,

  switchViewDetalles: (value: boolean) => {
    set({ viewDetalles: value });
  },

  setPedidos: (data: Pedido[]) => {
    set({ pedidos: data});
  },

  resetFilteredPedidos: () => {
    set({ filteredPedidos: [] })
  },

  removePedido: (pedidoId) =>
    set((state) => ({
      pedidos: state.pedidos.filter((pedido) => pedido.id !== pedidoId),
      filteredPedidos: state.filteredPedidos.filter((pedido) => pedido.id !== pedidoId),
  })),

  resetFilter: () => {
    set({filter: primitiveFilter})
  },

  setFilter: (filter: IFilter) => {
    set({filter:filter})
  },

  applyFilter: () => {
    set((state) => {
      const { filter, pedidos } = state;
  
      // Aplica el filtro (ajustado al nuevo tipado)
      const filtPedidos = pedidos.filter((pedido) => {
        let matches: boolean = true;
  
        // Filtrar por nombre del proveedor
        if (filter.nombre) {
          matches = matches && pedido.proveedor.nombre.toLowerCase().includes(filter.nombre.toLowerCase());
        }
  
        // Filtrar por tipo de rolliso en equipos
        if (filter.tipo) {
          matches =
            matches &&
            (pedido.equipos?.some((equipo) => equipo.rolliso.tipo === filter.tipo) ?? false); // Asegura un booleano
        }
        
        if (filter.startDate || filter.endDate) {
          const pedidoDate = new Date(pedido.fecha);
          const startDate = filter.startDate ? new Date(filter.startDate) : null;
          const endDate = filter.endDate ? new Date(filter.endDate) : null;
  
          if (startDate) {
            matches = matches && pedidoDate >= startDate;
          }
          if (endDate) {
            matches = matches && pedidoDate <= endDate;
          }
        }
  
        // Filtrar por longitud de rolliso
        if (filter.longitud !== null) {
          matches =
            matches &&
            (pedido.equipos?.some((equipo) => equipo.rolliso.longitud === filter.longitud) ?? false); // Asegura un booleano
        }
  
        // Filtrar por diámetro de rolliso
        if (filter.diametro !== null) {
          matches =
            matches &&
            (pedido.equipos?.some((equipo) => equipo.rolliso.diametro === filter.diametro) ?? false); // Asegura un booleano
        }
  
        return matches;
      });
  
      return { filteredPedidos: filtPedidos }; // Actualiza los pedidos filtrados
    });
  },
  
  
  
}))