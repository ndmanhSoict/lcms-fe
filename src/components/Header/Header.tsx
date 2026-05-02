import { useState } from 'react';
import { Badge, Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography, Box } from '@mui/material';
import { Search, NotificationsNone, KeyboardArrowDown, Logout, PersonOutline } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import * as S from './header.style';
import { useAuthStore } from '@/store/authStore';

export const Header = ({ title = "Tổng quan" }: { title?: string }) => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        navigate({ to: '/login' });
    };

    return (
        <S.StyledHeader position="fixed">
            <S.HeaderToolbar>
                <S.PageTitle variant="h6">
                    {title}
                </S.PageTitle>

                <S.HeaderActions>
                    <S.SearchContainer>
                        <Search color="action" fontSize="small" style={{ marginRight: 8 }} />
                        <S.SearchInput placeholder="Tìm kiếm..." />
                    </S.SearchContainer>

                    <S.ActionIconButton>
                        <Badge badgeContent={3} color="error" variant="dot">
                            <NotificationsNone color="action" />
                        </Badge>
                    </S.ActionIconButton>

                    <S.UserProfileBox
                        onClick={e => setAnchorEl(e.currentTarget)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Avatar>
                            {user?.fullName?.charAt(0) || 'A'}
                        </Avatar>
                        <KeyboardArrowDown color="action" fontSize="small" />
                    </S.UserProfileBox>
                </S.HeaderActions>
            </S.HeaderToolbar>

            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{ paper: { sx: { mt: 1, minWidth: 220 } } }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight={600} noWrap>
                        {user?.fullName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                        {user?.email}
                    </Typography>
                </Box>
                <Divider />
                <MenuItem disabled sx={{ opacity: 0.6 }}>
                    <ListItemIcon><PersonOutline fontSize="small" /></ListItemIcon>
                    Hồ sơ cá nhân
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </S.StyledHeader>
    );
};
