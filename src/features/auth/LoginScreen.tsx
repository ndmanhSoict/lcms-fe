import { BrandPanel } from '@/components/BrandPanel/BrandPanel';
import * as S from './login-screen.style';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Box } from '@mui/material';

export const LoginScreen = () => {
    return (
        <S.ScreenContainer>
            {/* Panel thông tin thương hiệu (chỉ hiện trên PC) */}
            <BrandPanel />
            
            {/* Panel chứa Form đăng nhập */}
            <S.FormPanel>
                {/* Ánh sáng mờ trang trí phía sau form */}
                <div style={{ position: 'absolute', top: '20%', right: '10%', width: 250, height: 250, background: 'rgba(37,99,235,0.1)', filter: 'blur(100px)', zIndex: 0 }} />
                
                <Box sx={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <LoginForm />
                </Box>
            </S.FormPanel>
        </S.ScreenContainer>
    );
};