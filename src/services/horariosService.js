// services/horariosService.js
import api from "./api";

export const obtenerHorariosBloqueados = async () => {
  const { data } = await api.get("/horarios-bloqueados");
  return data;
};
