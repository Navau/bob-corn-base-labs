import { useState } from "react";
import {
  buyCornApi,
  getAllCornsApi,
  getPaginatedCornsApi,
  IPageResponse,
} from "@/api";
import { ICornEntity } from "@/interfaces";
import { Socket } from "socket.io-client";
import { sendBuyCorn } from "@/api/corn.socket";

export function useCorn() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [corns, setCorns] = useState<ICornEntity[]>([]);
  const [cornsPaginated, setCornsPaginated] = useState<
    IPageResponse<ICornEntity>
  >({
    data: [],
    total: 0,
    page: 0,
    lastPage: 0,
  });

  const buyCornSocket = async (socket: Socket) => {
    try {
      setLoading(true);
      sendBuyCorn(socket);
    } catch (err) {
      console.error("Error al comprar maíz:", err);
      setLoading(false);
      throw err;
    }
  };

  const buyCorn = async () => {
    try {
      setLoading(true);
      const response: { message: string } = await buyCornApi();
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedCorns = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const response: IPageResponse<ICornEntity> = await getPaginatedCornsApi(
        page,
        limit
      );
      setLoading(false);

      setCornsPaginated(response);
    } catch (err: any) {
      setLoading(false);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAll = async (clientId?: string) => {
    try {
      setLoading(true);
      const response: ICornEntity[] = await getAllCornsApi(clientId);
      setLoading(false);

      setCorns(response);
    } catch (err: any) {
      setLoading(false);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    buyCorn,
    buyCornSocket,
    getPaginatedCorns,
    getAll,
    loading,
    error,
    corns,
    cornsPaginated,
  };
}
