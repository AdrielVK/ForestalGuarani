import { create } from "zustand";
import { Orden } from "../models/interfaces/orden.interfaces";

export interface OrdenState {
  ordenList: Orden[];
  prevOrdenList: Orden[];
}

export type OrdenActions = {
  addToOrdenList: (value: Orden) => void;
  resetOrdenList: () => void;
  removeFromOrdenList: (id: number) => void;
  resetPrevOrdenList: () => void;
  addToPrevOrdenList: (value: Orden) => void;
  removeFromPrevOrdenList: (id: number) => void;
};

export type OrdenStore = OrdenActions & OrdenState;

export const InitialState: OrdenState = {
  ordenList: [],
  prevOrdenList: []
};

export const useOrdenStore = create<OrdenStore>((set) => ({
  ...InitialState,

  addToOrdenList: (value: Orden) => {
    set((state) => ({ ordenList: [...state.ordenList, value] }));
  },

  resetOrdenList: () => {
    set({ ordenList: []})
  },

  resetPrevOrdenList: () => {
    set({ prevOrdenList: []})
  },

  addToPrevOrdenList: (value: Orden) => {
    set((state) => ({
      prevOrdenList: state.prevOrdenList.some((orden) => orden.id === value.id)
        ? state.prevOrdenList
        : [...state.prevOrdenList, value],
    }));
  },
  

  removeFromOrdenList: (id: number) => {
    set((state) => ({
      ordenList: state.ordenList.filter((orden) => orden.id !== id),
    }));
  },

  removeFromPrevOrdenList: (id: number) => {
    set((state) => ({
      prevOrdenList: state.prevOrdenList.filter((orden) => orden.id !== id),
    }));
  },

}));
