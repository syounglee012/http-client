import { useApiServer } from "./services/useApiServer";
import type { ApiResponse } from "./types/api";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const { data, loading, error, fetchData, reset } =
    useApiServer<ApiResponse>();

  const handleFetchData = () => {
    fetchData();
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (data?.redirect && data?.url) {
      // Redirect after 3 seconds
      const timer = setTimeout(() => {
        window.location.href = data.url!;
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleReset = () => {
    setCount(0);
    reset();
  };
  return (
    <>
      <h1>Hello, This is Sam's web client.</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error:{" "}
          {typeof error === "string"
            ? error
            : error && "message" in error
            ? (error as { message: string }).message
            : "Unknown error"}
        </p>
      )}
      {data && (
        <div>
          <p>Message: {data.message}</p>
          <p>Status: {data.status}</p>
          <p>Server: {data.data.server}</p>
          <p>Port: {data.data.port}</p>
          <p>Time: {data.data.timestamp}</p>
          <p>API Call Count: {count}</p>
        </div>
      )}
      <button type="button" onClick={handleFetchData}>
        Fetch Data
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </>
  );
}

export default App;
