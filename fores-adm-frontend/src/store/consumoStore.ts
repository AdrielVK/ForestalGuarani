import { create } from "zustand";
import { PosicionStock } from "../models/interfaces/ingresos.interface";

export interface ConsumoState {
  consumoList: PosicionStock[];
  prevConsumoList: PosicionStock[];
  reFetch: boolean;
}

export type ConsumoActions = {
  addToConsumoList: (value: PosicionStock) => void;
  resetConsumoList: () => void;
  removeFromConsumoList: (id: number) => void;
  resetPrevConsumoList: () => void;
  addToPrevConsumoList: (value: PosicionStock) => void;
  removeFromPrevConsumoList: (id: number) => void;

  reFetchHandler: (value: boolean) => void;
};

export type ConsumoStore = ConsumoActions & ConsumoState;

export const InitialState: ConsumoState = {
  consumoList: [],
  prevConsumoList: [],
  reFetch: false
};

export const useConsumoStore = create<ConsumoStore>((set) => ({
  ...InitialState,
  reFetchHandler:(value: boolean) => {
    set({ reFetch: value})
  },
  addToConsumoList: (value: PosicionStock) => {
    set((state) => ({ consumoList: [...state.consumoList, value] }));
  },

  resetConsumoList: () => {
    set({ consumoList: []})
  },

  removeFromConsumoList: (id: number) => {
    set((state) => ({
      consumoList: state.consumoList.filter((posicion) => posicion.id !== id),
    }));
  },

  resetPrevConsumoList: () => {
    set({ prevConsumoList: []})
  },

  addToPrevConsumoList: (value: PosicionStock) => {
    set((state) => ({
      prevConsumoList: state.prevConsumoList.some((posicion) => posicion.id === value.id)
        ? state.prevConsumoList
        : [...state.prevConsumoList, value],
    }));
  },
  


  removeFromPrevConsumoList: (id: number) => {
    set((state) => ({
      prevConsumoList: state.prevConsumoList.filter((posicion) => posicion.id !== id),
    }));
  },

}));
