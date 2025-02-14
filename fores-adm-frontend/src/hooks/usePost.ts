import { useState, useCallback } from "react";
import { api } from "../interceptors/axios.interceptor";

interface Props<TResponse, TBody> {
  postResponse: TResponse | null;
  postLoading: boolean;
  postError: string | null;
  post: (body: TBody) => Promise<TResponse | null>; // Exponemos una función para disparar la solicitud
}

export const usePost = <TResponse, TBody>(url: string): Props<TResponse, TBody> => {
  const [postResponse, setPostResponse] = useState<TResponse | null>(null);
  const [postLoading, setLoading] = useState(false);
  const [postError, setError] = useState<string | null>(null);

  const post = useCallback(
    async (body: TBody): Promise<TResponse | null> => { // Cambiado de void a Promise<TResponse | null>
      setLoading(true);
      setError(null);
      try {
        const response = await api.post(url, body);
        if (response.status === 200 || response.status === 201) {
          const data = response.data.payload.response;
          setPostResponse(data);
          return data; // Ahora devuelve la respuesta
        } else {
          setError(response.statusText || "Error desconocido");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || "Error en la solicitud");
        setPostResponse(null);
      } finally {
        setLoading(false);
      }
      return null;
    },
    [url]
  );

  return { postResponse, postLoading, postError, post };
};

