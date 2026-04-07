import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { getAppTheme } from './style/theme';
import { useUiStore } from './store/uiStore';
import { routeTree } from './routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Component này giúp theme cập nhật real-time khi Zustand state thay đổi
const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useUiStore((state) => state.themeMode);
  const theme = getAppTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);