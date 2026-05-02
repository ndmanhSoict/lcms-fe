import {
    Typography, IconButton, TextField, MenuItem,
    Button, Box
} from '@mui/material';
import { Close } from '@mui/icons-material';
import * as S from './invite-branch-drawer.style';

interface InviteBranchDrawerProps {
    open: boolean;
    onClose: () => void;
}

const SUBSCRIPTION_PLANS = [
    { value: 'standard', label: 'Gói Tiêu chuẩn' },
    { value: 'premium', label: 'Gói Cao cấp' },
    { value: 'basic', label: 'Gói Cơ bản' },
];

export const InviteBranchDrawer = ({ open, onClose }: InviteBranchDrawerProps) => {
    const handleSendInvitation = () => {
        onClose();
    };

    return (
        <S.StyledDrawer anchor="right" open={open} onClose={onClose}>
            {/* Header */}
            <S.DrawerHeader>
                <Typography variant="h2" color="primary.main">
                    Mời Cơ sở Mới
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </S.DrawerHeader>

            {/* Form Fields */}
            <S.FormContainer>
                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Tên cơ sở</Typography>
                    <TextField fullWidth placeholder="VD: Học viện Phương Đông" />
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Địa chỉ Email</Typography>
                    <TextField fullWidth placeholder="admin@cosovd.com" />
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Thành phố</Typography>
                    <TextField fullWidth select defaultValue="">
                        <MenuItem value="" disabled>Chọn thành phố...</MenuItem>
                        <MenuItem value="hcm">Hồ Chí Minh</MenuItem>
                        <MenuItem value="hn">Hà Nội</MenuItem>
                        <MenuItem value="dn">Đà Nẵng</MenuItem>
                        <MenuItem value="ct">Cần Thơ</MenuItem>
                        <MenuItem value="hp">Hải Phòng</MenuItem>
                    </TextField>
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Gói dịch vụ</Typography>
                    <TextField fullWidth select defaultValue="standard">
                        {SUBSCRIPTION_PLANS.map((plan) => (
                            <MenuItem key={plan.value} value={plan.value}>
                                {plan.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Lời nhắn (Tùy chọn)</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Nhập lời nhắn cá nhân hóa cho lời mời..."
                    />
                </S.InputGroup>

                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleSendInvitation}
                        sx={{ height: 56 }}
                    >
                        Gửi Lời Mời
                    </Button>
                </Box>

                <S.FooterDisclaimer>
                    <Typography>
                        Email mời sẽ được gửi đến quản trị viên.
                        Họ có 48 giờ để kích hoạt tài khoản.
                    </Typography>
                </S.FooterDisclaimer>
            </S.FormContainer>
        </S.StyledDrawer>
    );
};
