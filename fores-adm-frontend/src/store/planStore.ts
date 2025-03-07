import { create } from "zustand";
import { Plan } from "../models/interfaces/plan.interface";

export interface FilterPlan {
  date: string | null;
  espesor: number | null;
  ancho: number | null;
  longitud: number | null;
}

export const primitiveFilterPlan: FilterPlan = {
  date: null,
  espesor: null,
  ancho: null,
  longitud: null,
};

export interface PlanState {
  filter: FilterPlan;
  planes: Plan[];
  filteredPlanes: Plan[];
}

export type PlanActions = {
  setFilter: (filter: FilterPlan) => void;
  applyFilter: () => void;
  resetFilteredPedidos: () => void;
};

export type PlanStore = PlanActions & PlanState;

export const InitialState: PlanState = {
  planes: [],
  filteredPlanes: [],
  filter: primitiveFilterPlan,
};

export const usePlanStore = create<PlanStore>((set) => ({
  ...InitialState,

  setFilter: (filter: FilterPlan) => {
    set({ filter });
  },

  resetFilteredPedidos: () => {
    set({ filter: primitiveFilterPlan, filteredPlanes: [] });
  },

  applyFilter: () => {
    set((state) => {
      const { filter, planes } = state;

      const filteredPlanes = planes.filter((plan) => {
        let matches = true;

        // Convertimos las fechas a objetos Date para comparación
        const fechaInicio = new Date(plan.fecha_inicio);
        const fechaFin = new Date(plan.fecha_fin);
        const fechaFiltro = filter.date ? new Date(filter.date) : null;

        // Filtrar si la fecha de filtro está dentro del rango
        if (fechaFiltro) {
          matches =
            matches &&
            fechaFiltro >= fechaInicio &&
            fechaFiltro <= fechaFin;
        }

        if (filter.espesor !== null) {
          matches = matches && plan.esquema.espesor === filter.espesor;
        }

        if (filter.ancho !== null) {
          matches = matches && plan.esquema.ancho === filter.ancho;
        }

        if (filter.longitud !== null) {
          matches = matches && plan.esquema.longitud === filter.longitud;
        }

        return matches;
      });

      return { filteredPlanes };
    });
  },
}));
