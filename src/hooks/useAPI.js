import { useEffect, useState } from "react";

function useApi(URL) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const responseJson = await response.json();
          setData(responseJson);
        } else {
          setError(`HTTP error: ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fecthData();
  }, [URL]);

  return { data, loading, error };
}

export default useApi;
