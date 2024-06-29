'use client';

import { SnackbarUtilsConfiguration } from '@/hooks/useMessageRef';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

export default function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <SnackbarProvider preventDuplicate>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <SnackbarUtilsConfiguration />
    </SnackbarProvider>
  );
}
