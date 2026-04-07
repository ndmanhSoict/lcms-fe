import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export const socket: Socket = io(SOCKET_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export const connectSocket = () => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        socket.auth = { token };
        socket.connect();
    } else {
        console.warn('[Socket] Không tìm thấy Token, bỏ qua kết nối.');
    }
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

socket.on('connect', () => {
    console.log('[Socket] Kích hoạt thành công. ID:', socket.id);
});

socket.on('disconnect', (reason) => {
    console.log('[Socket] Đã ngắt kết nối. Lý do:', reason);
});

socket.on('connect_error', (error) => {
    console.error('[Socket] Lỗi kết nối:', error.message);
});