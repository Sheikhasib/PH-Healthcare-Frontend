"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

// TODO: use react-query devtools
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

// We want to create a single instance of QueryClient for the browser, but create a new instance for each request on the server.
let browserQueryClient: QueryClient | undefined = undefined;

// This function returns a QueryClient instance. If we're on the server, it creates a new instance for each request. If we're on the client, it returns a single instance that is shared across the entire application.
function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}

// This component provides the QueryClient to the rest of the application. It should be used at the root of the application, so that all components can access the QueryClient.
export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
