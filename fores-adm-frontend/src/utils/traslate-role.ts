import { ROLE } from "../models/interfaces/auth.interfaces"

export type Roles = "Administrador" | "Colaborador" | "Ayudante" 

export const TraslateRole = (value: ROLE): Roles => {
  switch (value) {
    case ROLE.ADMIN:
      return "Administrador";
    case ROLE.EDITOR:
      return "Colaborador";
    case ROLE.READER:
      return "Ayudante";
    default:
      throw new Error(`Rol no reconocido: ${value}`);
  }
}
