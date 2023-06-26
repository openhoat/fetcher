import { FetchURL } from '../types/fetcher/fetcher.d.ts'

export const JSON_TYPE_MIME = 'application/json'

export const isJsonResponse = (response: Response) =>
  response.headers.get('Content-Type')?.includes(JSON_TYPE_MIME)

export const isRequest = (url: FetchURL): url is Request =>
  url instanceof Request

export const toURL = (url: FetchURL, baseURL?: string): URL =>
  new URL(isRequest(url) ? url.url : url, baseURL)
