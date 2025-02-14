import { Esquema } from "./esquema.interface";

export interface CreatePlan {
  fecha_inicio: string;
  fecha_fin: string;
  longitud: number;
  ancho: number;
  espesor: number;
  activo: boolean;
}

export interface CreatePlanBody {
  fecha_inicio: Date;
  fecha_fin: Date;
  longitud: number;
  ancho: number;
  espesor: number;
  activo: boolean;
}

export interface Plan {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  activo: boolean;
  esquema: Esquema;
}

export interface PlanStats {
  plans: number;
  active_plans: number;
  not_active_plans: number;
  current_plans_by_date: number;
}

export interface PlanStatsMonths {
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
}