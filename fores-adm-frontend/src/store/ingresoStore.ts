import { create } from "zustand";
import { IngresoDetail } from "../models/interfaces/ingresos.interface";
import { IFilterIngresos } from "../Pages/Ingresos/ListaIngresoPage";

export interface IngresoState {
  viewDetail: boolean;
  ingresos: IngresoDetail[];
  filteredIngresos: IngresoDetail[];
  filter: IFilterIngresos;
}

export const defaultFilter = {
  startDate : null,
  endDate : null,
  nombre : null,
  tipo : null,
  longitud : null,
  diametro : null,
  fuente_controlada : null,
  chofer : null,
  patente : null,
  peso : null,
}

export type IngresoActions = {
  switchViewDetalles: (value:boolean) => void;
  setIngresos: (ingresos: IngresoDetail[]) => void;
  removeIngreso: (ingresoId: number) => void;
  resetFilter: () => void;
  setFilter: (filter:IFilterIngresos) => void;
  applyFilter: () => void,
  resetFilteredIngresos: () => void
}

export type IngresoStore = IngresoActions & IngresoState;

export const InitialState:IngresoState = {
  viewDetail: false,
  ingresos: [],
  filteredIngresos: [],
  filter: defaultFilter,
}

export const useIngresoStore = create<IngresoStore>((set) => ({
  ...InitialState,
  switchViewDetalles: (value: boolean) => {
    set({ viewDetail: value })
  },

  setIngresos: (ingresos: IngresoDetail[]) => {
    set({ ingresos: ingresos})
  },

  removeIngreso: (ingresoId) => 
    set((state) => ({
      ingresos: state.ingresos.filter((ingreso) => ingreso.id !== ingresoId),
      filteredIngresos: state.filteredIngresos.filter((ingreso) => ingreso.id !== ingresoId)
  })),
  
  resetFilter: () => {
    set({filter: defaultFilter})
  },

  setFilter: (filter: IFilterIngresos) => {
    set({filter:filter})
  },

  applyFilter: () => {
    set((state) => {
      const { filter, ingresos } = state;

      const filtIngresos = ingresos.filter((ingreso) => {
        let matches: boolean = true;

        if (filter.chofer) {
          matches = matches && ingreso.chofer.toLowerCase().includes(filter.chofer.toLowerCase())
        }

        if (filter.diametro !== null) {
          matches = matches && (ingreso.equipos?.some((equipo) => equipo.diametro === filter.diametro) ?? false)
        }
        if (filter.fuente_controlada !== null) {
          matches = matches && ingreso.fuente_controlada === filter.fuente_controlada
        }

        if (filter.longitud) {
          matches = matches && (ingreso.equipos?.some((equipo) => equipo.longitud === filter.longitud) ?? false)
        }

        if (filter.nombre) {
          matches = matches && ingreso.proveedor.nombre.toLowerCase().includes(filter.nombre.toLowerCase()) 
        }

        if (filter.patente) {
          matches = matches && ingreso.patente.toLowerCase().includes(filter.patente.toLowerCase())
        }

        if (filter.peso) {
          matches = matches && ingreso.remito.peso === filter.peso
        }

        if (filter.tipo) {
          matches = matches && (ingreso.equipos?.some((equipo) => equipo.tipo.toLowerCase() === filter.tipo?.toLocaleLowerCase()) ?? false) 
        }

        if (filter.startDate || filter.endDate) {
          const ingresoDate = new Date(ingreso.fecha);
          const startDate = filter.startDate ? new Date(filter.startDate) : null;
          const endDate = filter.endDate ? new Date(filter.endDate) : null;
  
          if (startDate) {
            matches = matches && ingresoDate >= startDate;
          }
          if (endDate) {
            matches = matches && ingresoDate <= endDate;
          }
        }

        return matches
      })

      return { filteredIngresos: filtIngresos }
    })
  },

  resetFilteredIngresos: () => {
    set({ filteredIngresos: []})
  },
}))