import "server-only";
import { create, type AxiosRequestConfig } from "axios";

// The site only reads public invite and share data, on the server. Inside Docker the API is
// http://api:4000; in production it's the internal address of the api container.
export const api = create({
  baseURL: `${process.env.API_URL ?? "http://localhost:4000"}/v1`,
  timeout: 5_000,
});

/** Orval mutator: performs the request and returns the response body. */
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> =>
  api.request<T>({ ...config, ...options }).then((response) => response.data);

export type BodyType<B> = B;
