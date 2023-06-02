import { FetchURL } from '../types/fetcher.d.ts'

export const isRequest = (url: FetchURL): url is Request =>
  url instanceof Request

export const toURL = (url: FetchURL, baseURL?: string): URL =>
  new URL(isRequest(url) ? url.url : url, baseURL)
