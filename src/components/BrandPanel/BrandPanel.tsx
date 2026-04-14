import { Box, Typography } from '@mui/material';
import { School, Insights, Hub, VerifiedUser } from '@mui/icons-material';
import * as S from './brand-panel.style';

const FEATURES = [
    { icon: <Insights />, title: 'Predictive Analytics', desc: 'Real-time student progress tracking.' },
    { icon: <Hub />, title: 'Unified Ecosystem', desc: 'Seamless multi-branch synchronization.' },
    { icon: <VerifiedUser />, title: 'Compliance Shield', desc: 'Enterprise-grade security and privacy.' },
];

export const BrandPanel = () => {
    return (
        <S.PanelContainer>
            {/* Decorative Background Blurs */}
            <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', bgcolor: 'primary.main', opacity: 0.1, filter: 'blur(120px)', borderRadius: '50%' }} />
            <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', bgcolor: 'secondary.main', opacity: 0.1, filter: 'blur(120px)', borderRadius: '50%' }} />

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 480 }}>
                <S.LogoOrb>
                    <School sx={{ fontSize: 40, color: 'white' }} />
                </S.LogoOrb>

                <S.GradientText variant="h1" sx={{ mb: 2 }}>
                    EduCore
                </S.GradientText>
                
                <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 500 }}>
                    Empowering every learner, every branch, every day.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', alignItems: 'center' }}>
                    {FEATURES.map((feat, idx) => (
                        <S.FeatureCard key={idx}>
                            <S.FeatureIconBox>{feat.icon}</S.FeatureIconBox>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="subtitle2" fontWeight="bold">{feat.title}</Typography>
                                <Typography variant="caption" color="text.secondary">{feat.desc}</Typography>
                            </Box>
                        </S.FeatureCard>
                    ))}
                </Box>
            </Box>
        </S.PanelContainer>
    );
};