import { useEffect, useState } from "react";
import { api } from "../interceptors/axios.interceptor";

interface Props<T> {
  data: T | null;
  loading: boolean;
}

export const useGet = <T>(url: string, reFetch?: boolean): Props<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {

    const controller = new AbortController();

    const fetch = async () => {

      setLoading(true)
      try {
        const response = await api.get(url)
        if(response.statusText.toUpperCase() === 'OK'){
          setData(response.data.payload)
        }
      } catch {
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetch()

    return () => { controller.abort(); }
  },[url, reFetch])

  return {data, loading}

}