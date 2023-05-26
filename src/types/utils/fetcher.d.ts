export type FetchLike = (
  input: URL | Request | string,
  init?: RequestInit,
) => Promise<Response>

export interface ResponseFetcher<O extends RequestInit> {
  fetch: (
    url: string,
    options?: O,
  ) => Promise<Response>
}

export interface JsonFetcher<O extends RequestInit> {
  fetch: <T = unknown>(
    url: string,
    options?: O,
  ) => Promise<T>
}
