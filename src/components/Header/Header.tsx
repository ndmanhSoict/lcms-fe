import { Badge, Avatar } from '@mui/material';
import { Search, NotificationsNone, KeyboardArrowDown } from '@mui/icons-material';
import * as S from './header.style';
import { useAuthStore } from '@/store/authStore';

export const Header = ({ title = "Dashboard" }: { title?: string }) => {
    const user = useAuthStore((state) => state.user);

    return (
        <S.StyledHeader position="fixed">
            <S.HeaderToolbar>
                {/* Left: Page Title */}
                <S.PageTitle variant="h6">
                    {title}
                </S.PageTitle>

                {/* Right: Actions & User */}
                <S.HeaderActions>
                    {/* Global Search */}
                    <S.SearchContainer>
                        <Search color="action" fontSize="small" style={{ marginRight: 8 }} />
                        <S.SearchInput placeholder="Search anything..." />
                    </S.SearchContainer>

                    {/* Notifications */}
                    <S.ActionIconButton>
                        <Badge badgeContent={3} color="error" variant="dot">
                            <NotificationsNone color="action" />
                        </Badge>
                    </S.ActionIconButton>

                    {/* User Quick Menu */}
                    <S.UserProfileBox>
                        <Avatar>
                            {user?.fullName?.charAt(0) || 'A'}
                        </Avatar>
                        <KeyboardArrowDown color="action" fontSize="small" />
                    </S.UserProfileBox>
                </S.HeaderActions>
            </S.HeaderToolbar>
        </S.StyledHeader>
    );
};