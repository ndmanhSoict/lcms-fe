import { ReactNode, memo } from 'react';
import { Toolbar, Box, Typography } from '@mui/material';
import { School } from '@mui/icons-material';
import * as S from './auth-layout.style';

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <S.LayoutContainer>
            <S.StyledAppBar position="sticky" color="transparent" elevation={0}>
                <Toolbar>
                    <Box mt={0.5} display="flex" alignItems="center" gap={1}>
                        <School color="primary" />
                        <Typography variant="h6" color="primary" fontWeight="bold">
                            LCM
                        </Typography>
                    </Box>
                </Toolbar>
            </S.StyledAppBar>

            <S.ContentBox>
                {children}
            </S.ContentBox>
        </S.LayoutContainer>
    );
};

export default memo(AuthLayout);