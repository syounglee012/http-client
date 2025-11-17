import { useState, useCallback } from "react";
import type { ApiState } from "../types/api";

export function useApiServer<T>() {
  const [state, setState] = useState<ApiState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchData = useCallback(async (endpoint: string = "") => {
    setState((prev) => ({ ...prev, loading: true, error: null, data: null }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`
      );

      if (response.status === 302) {
        window.location.href = response.headers.get("Location") || "";
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = (await response.json()) as T;

      setState((prev) => ({
        ...prev,
        loading: false,
        error: null,
        data: json,
      }));

      return json;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        data: null,
      }));

      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({ ...prev, loading: false, error: null, data: null }));
  }, []);

  return { ...state, fetchData, reset };
}
