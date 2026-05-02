import { Box, Typography } from '@mui/material';
import { School, Insights, Hub, VerifiedUser } from '@mui/icons-material';
import * as S from './brand-panel.style';

const FEATURES = [
    { icon: <Insights />, title: 'Phân tích thông minh', desc: 'Theo dõi tiến độ học sinh theo thời gian thực.' },
    { icon: <Hub />, title: 'Hệ sinh thái thống nhất', desc: 'Đồng bộ liền mạch giữa các cơ sở.' },
    { icon: <VerifiedUser />, title: 'Bảo mật doanh nghiệp', desc: 'Bảo mật và riêng tư ở tiêu chuẩn doanh nghiệp.' },
];

export const BrandPanel = () => {
    return (
        <S.PanelContainer>
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
                    Nâng cao chất lượng học tập — mọi học viên, mọi cơ sở, mỗi ngày.
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
