import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
    themeMode: 'light' | 'dark';
    toggleTheme: () => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useUiStore = create<UiState>()(
    persist(
        (set) => ({
            themeMode: 'light', // Mặc định theo design
            toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
            isSidebarOpen: true,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        }),
        {
            name: 'lcms-ui-storage', // Lưu theme vào localStorage để F5 không bị mất
        }
    )
);