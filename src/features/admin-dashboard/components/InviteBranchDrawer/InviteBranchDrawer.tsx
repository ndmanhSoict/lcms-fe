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
    { value: 'standard', label: 'Standard Growth' },
    { value: 'premium', label: 'Premium Enterprise' },
    { value: 'basic', label: 'Basic Starter' },
];

export const InviteBranchDrawer = ({ open, onClose }: InviteBranchDrawerProps) => {
    
    const handleSendInvitation = () => {
        // Logic xử lý gửi invitation ở đây
        console.log("Invitation Sent");
        onClose();
    };

    return (
        <S.StyledDrawer anchor="right" open={open} onClose={onClose}>
            {/* Header */}
            <S.DrawerHeader>
                <Typography variant="h2" color="primary.main">
                    Invite New Branch
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </S.DrawerHeader>

            {/* Form Fields */}
            <S.FormContainer>
                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Branch Name</Typography>
                    <TextField fullWidth placeholder="e.g. Skyline Academy" />
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Email Address</Typography>
                    <TextField fullWidth placeholder="admin@branch.com" />
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">City</Typography>
                    <TextField fullWidth select defaultValue="">
                        <MenuItem value="" disabled>Select city...</MenuItem>
                        <MenuItem value="hcm">Ho Chi Minh City</MenuItem>
                        <MenuItem value="hn">Ha Noi</MenuItem>
                        <MenuItem value="ny">New York</MenuItem>
                    </TextField>
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Subscription Plan</Typography>
                    <TextField fullWidth select defaultValue="standard">
                        {SUBSCRIPTION_PLANS.map((plan) => (
                            <MenuItem key={plan.value} value={plan.value}>
                                {plan.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </S.InputGroup>

                <S.InputGroup>
                    <Typography variant="overline" color="text.secondary">Message (Optional)</Typography>
                    <TextField 
                        fullWidth 
                        multiline 
                        rows={4} 
                        placeholder="Personalize your invitation..." 
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
                        Send Invitation
                    </Button>
                </Box>

                {/* Footer Disclaimer */}
                <S.FooterDisclaimer>
                    <Typography>
                        An invitation email will be sent to the administrator. 
                        They will have 48 hours to activate the account.
                    </Typography>
                </S.FooterDisclaimer>
            </S.FormContainer>
        </S.StyledDrawer>
    );
};