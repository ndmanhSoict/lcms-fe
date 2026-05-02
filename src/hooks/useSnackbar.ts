import { useState, useCallback } from 'react';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

const INITIAL: SnackbarState = { open: false, message: '', severity: 'success' };

export function useSnackbar() {
    const [snackbar, setSnackbar] = useState<SnackbarState>(INITIAL);

    const showSuccess = useCallback((message: string) =>
        setSnackbar({ open: true, message, severity: 'success' }), []);

    const showError = useCallback((message: string) =>
        setSnackbar({ open: true, message, severity: 'error' }), []);

    const close = useCallback(() =>
        setSnackbar(s => ({ ...s, open: false })), []);

    return { snackbar, showSuccess, showError, close };
}
