import api from '@/network/api_config';
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

interface UseApiMutationProps<TData, TVariables> {
  getRequestConfig: (variables: TVariables) => AxiosRequestConfig;
  options?: UseMutationOptions<TData, AxiosError, TVariables>;
}

export function useApiMutation<TData = unknown, TVariables = unknown>({
  getRequestConfig,
  options = {},
}: UseApiMutationProps<TData, TVariables>): UseMutationResult<TData, AxiosError, TVariables> {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const config = getRequestConfig(variables);
      const response = await api.request<TData>(config);
      return response.data;
    },
    ...options,
  });
}
