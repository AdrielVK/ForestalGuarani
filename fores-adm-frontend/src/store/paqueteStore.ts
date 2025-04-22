import { create } from "zustand";
import { FilterPaquete, IPaqueteDetail, IPaqueteForCiclo } from "../models/interfaces/paquete.interface";

export interface PaqueteState {
  paquetes: IPaqueteDetail[]
  filteredPaquetes: IPaqueteDetail[]
  filter: FilterPaquete

  paqueteToAssociate: IPaqueteForCiclo | null
}

export const primitiveFilter:FilterPaquete = {
  identificador: null,
  vol: null,
  ingreso: null,

  orden: {
    numero: null,
    volumen: null,
    cabado_nombre: null,
    cliente_nombre: null,
  },

  estado_value: null,

  pieza: {
    volumen: null,
    espesor: null,
    longitud: null,
    ancho: null,
    escuadria: {
      longitud: null,
      altura: null,
      ancho: null,
    },
  }
}

export type PaqueteActions = {
  setPaquetes: (paquetes: IPaqueteDetail[]) => void;
  setFilteredPaquetes: (paquetes: IPaqueteDetail[]) => void;
  resetFilteredPaquetes: () => void
  resetFilter: () => void;
  setFilter: (filter:FilterPaquete) => void;
  
  applyFilter: () => void,
  removePaquete: (paqueteId: number) => void

  setPaqueteToAssociate: (paquete: IPaqueteForCiclo) => void;
  resetPaqueteToAssociate: () => void;
}

export type PaqueteStore = PaqueteActions & PaqueteState;

export const InitialState: PaqueteState = {
  paquetes: [],
  filteredPaquetes:[],
  filter: primitiveFilter,
  paqueteToAssociate: null,
}

export const usePaqueteStore = create<PaqueteStore>((set) => ({
  ...InitialState,

  setPaqueteToAssociate: (paquete: IPaqueteForCiclo) => {
    set({ paqueteToAssociate: paquete})
  },

  resetPaqueteToAssociate: () => {
    set({paqueteToAssociate : null})
  },

  setPaquetes: (data: IPaqueteDetail[]) => {
    set({ paquetes: data });
  },

  removePaquete: (paqueteId: number) => {
    set((state) => ({
      paquetes: state.paquetes.filter((paquete) => paquete.id !== paqueteId),
      filteredPaquetes: state.filteredPaquetes.filter((paquete) => paquete.id !== paqueteId),
    }));
  },

  setFilteredPaquetes: (data: IPaqueteDetail[]) => {
    set({ filteredPaquetes: data});
  },

  resetFilteredPaquetes: () => {
    set({ filteredPaquetes: [] })
  },

  /*removePedido: (pedidoId) =>
    set((state) => ({
      pedidos: state.pedidos.filter((pedido) => pedido.id !== pedidoId),
      filteredPedidos: state.filteredPedidos.filter((pedido) => pedido.id !== pedidoId),
  })),*/

  resetFilter: () => {
    set({filter: primitiveFilter})
  },

  setFilter: (filter: FilterPaquete) => {
    set({filter:filter})
  },

  applyFilter: () => {
    set((state) => {
      const { filter, paquetes } = state;
  
      const filtPaquetes = paquetes.filter((paquete) => {
        let matches: boolean = true;
  
        if (filter.identificador) {
          matches = matches && paquete.identificador.toLowerCase().includes(filter.identificador.toLowerCase());
        }
  
        if (filter.vol) {
          matches = matches && paquete.vol.toLowerCase().includes(filter.vol.toLowerCase());
        }
        
        if (filter.ingreso) {
          const paqueteDate = new Date(paquete.ingreso);
          const ingresoDate = new Date(filter.ingreso);
          matches = matches && paqueteDate === ingresoDate;
        }
        
        if (filter.orden ) {
          if (filter.orden.cabado_nombre) {
            matches = matches && paquete?.orden?.cabado.nombre.toLowerCase().includes(filter.orden.cabado_nombre) || false
          }

          if (filter.orden.cliente_nombre) {
            matches = matches && paquete?.orden?.cliente.nombre.toLowerCase().includes(filter.orden.cliente_nombre) || false
          }

          if (filter.orden.numero) {
            matches = matches && paquete?.orden?.numero.toLowerCase().includes(filter.orden.numero) || false
          }

          if (filter.orden.volumen) {
            matches = matches && paquete?.orden?.volumen.toString().toLowerCase().includes(filter.orden.volumen.toString()) || false
          }
        }

        if (filter.estado_value) {
          matches = matches && paquete.estado.value.toLowerCase().includes(filter.estado_value.toLowerCase());
        }
        

        if (filter.pieza) {
          if (filter.pieza.volumen) {
            matches = matches && paquete.pieza.volumen.toLowerCase().includes(filter.pieza.volumen)
          }

          if (filter.pieza.espesor) {
            matches = matches && paquete.pieza.espesor.toLowerCase().includes(filter.pieza.espesor)
          }

          if (filter.pieza.longitud) {
            matches = matches && paquete.pieza.longitud.toLowerCase().includes(filter.pieza.longitud)
          }

          if (filter.pieza.ancho) {
            matches = matches && paquete.pieza.ancho.toLowerCase().includes(filter.pieza.ancho.toLowerCase())

          }

          if (filter.pieza.escuadria) {
            if (filter.pieza.escuadria.altura) {
              matches = matches && paquete.pieza?.escuadria?.altura.toLowerCase().includes(filter.pieza.escuadria.altura.toLowerCase()) || false
            }

            if (filter.pieza.escuadria.ancho) {
              matches = matches && paquete.pieza?.escuadria?.ancho.toLowerCase().includes(filter.pieza.escuadria.ancho.toLowerCase()) || false
            }

            if (filter.pieza.escuadria.longitud) {
              matches = matches && paquete.pieza?.escuadria?.longitud.toLowerCase().includes(filter.pieza.escuadria.longitud.toLowerCase()) || false
            }
          }
        }
  
        return matches;
      });
  
      return { filteredPaquetes: filtPaquetes };
    });
  },
  
  
  
}))