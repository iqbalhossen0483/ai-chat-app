import { DefaultOptions, QueryClient } from "@tanstack/react-query";

// Define default options for queries and mutations
const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  },
  mutations: {
    retry: 1,
  },
};

// Create the QueryClient instance
const queryClient = new QueryClient({ defaultOptions: defaultQueryOptions });

export default queryClient;
