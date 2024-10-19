import { useState, useCallback } from 'react';

interface RetrieveDataResponse {
  message: string; // Adjust based on what the server actually sends back
}

const useRetrieveData = () => {
  const [data, setData] = useState<RetrieveDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const retrieveData = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/retrieve-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }), // Send the address in the POST body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result: RetrieveDataResponse = await response.json();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, retrieveData };
};

export default useRetrieveData;
