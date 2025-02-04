import { useEffect, useMemo, useRef, useState } from "react";
import { FetchRequest, Options, QueryOptions } from "../types";

/**
 * A custom react hook for making HTTP request using the in-built fetch API.
 *
 * This hook abstracts of making HTTP requests while providing state management
 * for data, loading, and error handling. It supports all HTTP methods along with
 * ability to pass other additional options as well.
 *
 * Only supports JSON.
 *
 * TODO: Implement AbortController.
 * @param url URL string
 * @param queryOptions Query options object
 * @param options Fetch request options object
 * @returns  Array [data, isLoading, error]
 */
const useFetch = <T, S extends QueryOptions = QueryOptions>(
  url: string,
  queryOptions?: S,
  options: Options = { method: "GET" }
): FetchRequest<S, T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [query, setQuery] = useState<S | undefined>(queryOptions);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const optionsRef = useRef<Options>(options);

  useEffect(() => {
    optionsRef.current = {
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : null,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: options.credentials || "same-origin",
    };
  }, [options]);

  const addQuery = (query: S) => {
    setQuery((prev) => ({ ...(prev ?? {}), ...query } as S));
  };

  const updateQuery = (key: string, value: string | number) => {
    setQuery((prev) => ({ ...(prev ?? {}), [key]: value } as S));
  };

  const deleteQuery = (key: string) => {
    setQuery((prev) => {
      if (!prev) return prev;
      const { [key]: _, ...rest } = prev;
      return Object.keys(rest).length ? (rest as S) : undefined;
    });
  };

  const formattedQuery = useMemo(() => {
    if (!query) return "";
    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(
      ([key, val]) => val && searchParams.append(key, String(val))
    );
    return `?${searchParams.toString()}`;
  }, [query]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${url}${formattedQuery}`,
        optionsRef.current
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(`Error: ${err.err}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, formattedQuery]);

  return {
    data,
    query,
    refetch: fetchData,
    addQuery,
    deleteQuery,
    updateQuery,
    isLoading,
    error,
  };
};

export default useFetch;
