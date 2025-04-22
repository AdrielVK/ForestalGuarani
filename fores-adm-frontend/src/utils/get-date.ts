import { addDays, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const obtenerFechaHora = (diasSumar: number = 0): string => {
  const zonaHoraria = "America/Argentina/Buenos_Aires";
  const ahora = new Date();
  const fechaModificada = addDays(ahora, diasSumar); // Suma días según el parámetro
  const ahoraEnArgentina = toZonedTime(fechaModificada, zonaHoraria);
  
  return format(ahoraEnArgentina, "yyyy-MM-dd'T'HH:mm"); // Formato compatible con <input type="datetime-local">
};

export const obtenerFecha = (): string => {
  const zonaHoraria = "America/Argentina/Buenos_Aires";
  const ahora = new Date();
  const ahoraEnArgentina = toZonedTime(ahora, zonaHoraria);
  return format(ahoraEnArgentina, "yyyy-MM-dd"); // Formato compatible con <input type="datetime-local">

}