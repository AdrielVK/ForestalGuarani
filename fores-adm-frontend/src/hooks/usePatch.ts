import { useState, useCallback } from "react";
import { api } from "../interceptors/axios.interceptor";

interface Props<TResponse, TBody> {
  patchResponse: TResponse | null;
  patchLoading: boolean;
  patchError: string | null;
  patch: (body: TBody) => Promise<void>; 
}

/*interface PropsTypeNotBody<T> {
  patchResponse: T | null;
  patchLoading: boolean;
  patchError: string | null;
  patch: (body: TBody) => Promise<void>;
}*/

export const usePatch = <TResponse, TBody>(url: string): Props<TResponse, TBody> => {
  const [patchResponse, setPatchResponse] = useState<TResponse | null>(null);
  const [patchLoading, setLoading] = useState(false);
  const [patchError, setError] = useState<string | null>(null);

  const patch = useCallback(
    async (body?: TBody) => {
      setLoading(true);
      setError(null); 
      try {
        const response = await api.patch(url, body);

        if (response.status === 200) {
          setPatchResponse(response.data.payload.response); 
        } else {
          setError(response.statusText || "Error desconocido");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || "Error en la solicitud");        
        setPatchResponse(null);
      } finally {
        setLoading(false);
      }
    },
    [url]  // Solo url como dependencia
  );

  return { patchResponse, patchLoading, patchError, patch };
};
