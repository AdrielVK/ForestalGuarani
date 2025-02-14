import { create } from "zustand";

export interface PosicionState {
  reFetchFlag: boolean;
  
}


export type PosicionActions = {
  switchReFetchFlag: (value:boolean) => void;
}

export type PosicionStore = PosicionActions & PosicionState;

export const InitialState: PosicionState = {
  reFetchFlag: false,
}

export const usePosicionStore = create<PosicionStore>((set) => ({
  ...InitialState,

  switchReFetchFlag: (value: boolean) => {
    set({ reFetchFlag: value });
  },

  
  
  
}))