export interface ApiResponse {
  message: string;
  status: string;
  path: string;
  redirect?: boolean;
  url?: string;
  data: {
    timestamp: string;
    server: string;
    port: number;
  };
}

export interface ApiState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

export class ApiError extends Error {
  status?: number;
  statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}
