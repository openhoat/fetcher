export type FetchURL = URL | Request | string

export type FetchLike = (
  input: FetchURL,
  init?: RequestInit,
) => Promise<Response>

export type ResponseFetcher<O extends RequestInit> = {
  fetch: (
    url: FetchURL,
    options?: O,
  ) => Promise<Response>
}

export type JsonFetcher<O extends RequestInit> = {
  fetch: <T = unknown>(
    url: FetchURL,
    options?: O,
  ) => Promise<T>
}
