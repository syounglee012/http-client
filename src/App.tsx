import { useApiServer } from "./services/useApiServer";
import type { ApiResponse } from "./types/api";

function App() {
  const { data, loading, error, fetchData, reset } =
    useApiServer<ApiResponse>();
  return (
    <>
      <h1>Hello, World!</h1>
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
      {data && <p>Data: {JSON.stringify(data)}</p>}
      <button type="button" onClick={() => fetchData()}>
        Fetch Data
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </>
  );
}

export default App;
