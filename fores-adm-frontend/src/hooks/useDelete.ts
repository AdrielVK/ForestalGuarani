import { useState, useCallback } from "react";
import { api } from "../interceptors/axios.interceptor";

interface Props<T> {
  deleteResponse: T | null;
  deleteLoading: boolean;
  deleteError: string | null;
  deleteAction: () => Promise<void>; 

}

export const useDelete = <T>(url: string): Props<T> => {
  const [deleteResponse, setDeleteResponse] = useState<T | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteAction = useCallback(
    async () => {
      setDeleteLoading(true);
      setDeleteError(null); 
      try {
        const response = await api.delete(url);
        console.log("delete response", response)
        if (response.status === 200) {
          setDeleteResponse(response.data.payload);
        } else {
          setDeleteError(response.statusText || "Error desconocido");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        
        setDeleteError(err.response?.data?.message || "Error en la eliminacion");        
        setDeleteResponse(null);
      } finally {
        setDeleteLoading(false);
      }
    },
    [ url] 
  );


  return { deleteResponse, deleteLoading, deleteError, deleteAction };
};
