import { useEffect, useMemo, useRef, useState } from "react";

export type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  headers?: {
    [keys: string]: string;
  };
  body?: string | null;
  credentials?: "include" | "omit" | "same-origin";
};

export type QueryOptions = {
  [key: string]: string | number;
};

/**
 * A custom react hook for making HTTP request using the in-built fetch API.
 *
 * This hook abstracts of making HTTP requests while providing state management
 * for data, loading, and error handling. It supports all HTTP methods along with
 * ability to pass other additional options as well.
 * @param url URL string
 * @param options Fetch request options object
 * @returns  Array [data, isLoading, error]
 */
const useFetch = <T, S extends QueryOptions = QueryOptions>(
  url: string,
  queryOptions?: S,
  options: Options = { method: "GET" }
): {
  data: T | undefined;
  query: S | undefined;
  addQuery: (query: S) => void;
  deleteQuery: (key: string) => void;
  updateQuery: (key: string, value: string | number) => void;
  isLoading: boolean;
  error: string | null;
} => {
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
    Object.entries(query).forEach(([key, val]) =>
      val && searchParams.append(key, String(val))
    );
    return `?${searchParams.toString()}`;
  }, [query]);

  useEffect(() => {
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

    fetchData();
  }, [url, formattedQuery]);

  return { data, query, addQuery, deleteQuery, updateQuery, isLoading, error };
};

export default useFetch;
