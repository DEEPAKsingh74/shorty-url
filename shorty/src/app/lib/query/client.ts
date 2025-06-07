import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      // @ts-ignore
      retry: (failureCount, error) => {
        if (error.message?.includes('Unauthorized')) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});
