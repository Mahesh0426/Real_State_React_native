import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

// Configuration options for the hook
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

// Return type of the hook
interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        // Call the Appwrite function
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  // Fetch data on component mount (unless skip=true)
  useEffect(() => {
    if (!skip) {
      fetchData(params); // Calls function when component mounts
    }
  }, []);

  // Public refetch function to manually trigger data refresh
  const refetch = async (newParams: P) => await fetchData(newParams);

  // Return state and refetch function for component use
  return { data, loading, error, refetch };
};
