import {create} from 'zustand';
import { FilterCiclos, ICicloSecadero } from '../models/interfaces/ciclo.interfaces';
import { obtenerFecha } from '../utils/get-date';
import { format, parseISO } from "date-fns";

export interface CicloState {
  ciclos: ICicloSecadero[]
  filteredCiclos: ICicloSecadero[]
  filter: FilterCiclos;
  reFetch: boolean
}

export type CicloActios = {
  setCiclos: (data: ICicloSecadero[]) => void;
  setFilteredCiclos: (data: ICicloSecadero[]) => void;
  resetFilteredCiclos: () => void

  setFilter: (filter: FilterCiclos) => void;
  resetFilter: () => void;

  applyFilter: () => void;
  removeCiclo: (id: number) => void;

  handleReFetch: (value: boolean) => void;
}

export const defaultFilterCiclos: FilterCiclos = {
  estado: null,
  identificador: null,
  numeroOrden: null,
  fecha: null,
  activos: null,
  fechaStrategy: 'desde',
  nombreCliente: null,
  cabado: null,
}

export type CiclosStore = CicloState & CicloActios;

export const InitialState: CicloState = {
  ciclos: [],
  filteredCiclos: [],
  filter: defaultFilterCiclos,
  reFetch: false
}

export const useCicloStore = create<CiclosStore>((set) => ({
  ...InitialState,
  handleReFetch: (value: boolean) => {
    set({reFetch: value})
  },

  setCiclos: (data: ICicloSecadero[]) => {
    set({ ciclos: data});
  },

  setFilteredCiclos: (data: ICicloSecadero[]) => {
    set({ filteredCiclos: data});
  }, 

  resetFilteredCiclos: () => {
    set({ filteredCiclos: []})
  },

  resetFilter: () => {
    set({filter: defaultFilterCiclos})
  },

  setFilter: (filter: FilterCiclos) => {
    set({filter: filter})
  },

  removeCiclo: (id: number) => {
    set((state) => ({
      ciclos: state.ciclos.filter((ciclo) => ciclo.id !== id),
      filteredCiclos: state.filteredCiclos.filter((ciclo) => ciclo.id !== id)
    }))
  },

  applyFilter: () => {
    set((state) => {
      const {filter, ciclos } = state;

      const filtCiclos = ciclos.filter((ciclo) => {
        let matches: boolean = true;

        if (filter.activos) {
          const actualDate = new Date(obtenerFecha())
          const ingresoDate = new Date(ciclo.ingreso)
          
          matches = matches && (actualDate >= ingresoDate)

          if (ciclo.egreso) {
            matches = matches && (actualDate <= new Date(ciclo.egreso))
          }
        }

        if (filter.cabado) {
          matches = matches && ciclo.paquete?.orden?.cabado.nombre.toLocaleLowerCase().includes(filter.cabado.toLowerCase()) || false
        }

        if (filter.estado) {
          matches = matches && ciclo.paquete?.estado.value.toLocaleLowerCase().includes(filter.estado.toLowerCase()) || false
        }

        if (filter.fecha) {
          const filterDate = format(new Date(parseISO(filter.fecha)), "yyyy-MM-dd");
          
          if (filter.fechaStrategy === "desde") {
            matches = matches && format(new Date(ciclo.ingreso), "yyyy-MM-dd") >= filterDate;
          } 
          else if (filter.fechaStrategy === "exacta") {
            matches = matches && format(new Date(ciclo.ingreso), "yyyy-MM-dd") === filterDate;
          } 
          else if (filter.fechaStrategy === "egreso" && ciclo.egreso) {
            matches = matches && format(new Date(ciclo.egreso), "yyyy-MM-dd") === filterDate;
          } 
          else {
            matches = false;
          }
        } 

        if (filter.identificador) {
          matches = matches && ciclo.paquete?.identificador.toLowerCase().includes(filter.identificador.toLowerCase()) || false
        }

        if (filter.nombreCliente) {
          matches = matches && ciclo.paquete?.orden?.cliente.nombre.toLowerCase().includes(filter.nombreCliente.toLowerCase()) || false
        }

        if (filter.numeroOrden) {
          matches = matches && ciclo.paquete?.orden?.numero.toLowerCase().includes(filter.numeroOrden.toLowerCase()) || false
        }

        return matches
      })

      return { filteredCiclos: filtCiclos}
    })
  }
  

}))