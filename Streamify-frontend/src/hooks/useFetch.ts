import { useEffect, useMemo, useState } from "react";

export type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  headers?: {
    [keys: string]: string;
  };
  body?: string | null;
  credentials?: "include" | "omit" | "same-origin";
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
const useFetch = <T>(
  url: string,
  options: Options = { method: "GET" }
): { data: T | undefined; isLoading: boolean; error: string | null } => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const OPTIONS = useMemo(
    () => ({
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : null,
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
      credentials: options.credentials || "same-origin",
    }),
    [options.method, options.body, options.headers, options.credentials]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, OPTIONS);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
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
  }, [url, OPTIONS]);

  return { data, isLoading, error };
};

export default useFetch;
