export interface IEscuadria {
  id: number;
  longitud: string;
  altura: string;
  ancho: string;
}

export interface IPieza {
  id: number;
  volumen: string;
  espesor: string;
  longitud: string;
  ancho: string;
  escuadriaId: number | null
  escuadria: IEscuadria | null
}