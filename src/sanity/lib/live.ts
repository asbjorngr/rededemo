import { client } from './client'
import type { QueryParams } from 'next-sanity'

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: QueryParams
}): Promise<T> {
  return client.fetch<T>(query, params)
}
