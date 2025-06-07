import api from '@/network/api_config';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ApiQueryOptions<TData, TError = AxiosError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

interface UseApiQueryProps<TData> {
  key: QueryKey;
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  options?: ApiQueryOptions<TData>;
  enabled?: boolean;
}

export function useApiQuery<TData = unknown>({
  key,
  url,
  params = {},
  headers = {},
  options = {},
  enabled = true,
}: UseApiQueryProps<TData>): UseQueryResult<TData, AxiosError> {
  return useQuery<TData, AxiosError>({
    queryKey: key,
    queryFn: async () => {
      const response = await api.get<TData>(url, {
        params,
        headers: {
          ...headers,
        },
      });
      return response.data;
    },
    enabled,
    ...options,
  });
}