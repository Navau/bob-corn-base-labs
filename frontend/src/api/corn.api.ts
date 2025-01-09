import { API_ROUTES, BASE_API } from "@/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { uniqueId } from "lodash";

//?  Establece el clientId en la cookie si no existe
const ensureClientId = () => {
  if (!Cookies.get("clientId")) {
    const clientId = uniqueId();
    Cookies.set("clientId", clientId, { sameSite: "Strict", path: "/" });
  }
  return Cookies.get("clientId")!;
};

//?  API para comprar maíz
export const buyCornApi = async () => {
  const clientId = ensureClientId(); //?  Asegúrate de que el clientId exista
  const response = await axios.post(`${BASE_API}/${API_ROUTES.corn.buy}`, {
    clientId,
  });

  return response.data;
};

//?  API para obtener registros paginados
export const getPaginatedCornsApi = async (page: number, limit: number) => {
  const response = await axios.get(`${BASE_API}/${API_ROUTES.corn.paginated}`, {
    params: { page, limit },
  });

  return response.data;
};

//?  API para obtener todos los registros (por clientId si existe)
export const getAllCornsApi = async (clientId?: string) => {
  const _clientId = Cookies.get("clientId") || ""; //?  Obtén el clientId de la cookie
  const response = await axios.get(`${BASE_API}/${API_ROUTES.corn.all}`, {
    params: _clientId ? { clientId: _clientId } : clientId ? { clientId } : {},
  });

  return response.data;
};
