import {
    Dialog, DialogTitle, DialogContent,
    Button, Typography, Box, Avatar, Divider,
    IconButton, CircularProgress, alpha,
} from '@mui/material';
import { Close, Phone, Email, FamilyRestroom } from '@mui/icons-material';
import { useStudentParents } from '../hooks/useStudents';
import { getStudentName } from '../utils/student.utils';
import type { Student } from '../types/student.types';

interface Props {
    student: Student | null;
    onClose: () => void;
}

export function StudentParentsDialog({ student, onClose }: Props) {
    const { data, isLoading } = useStudentParents(student?._id);
    const parents = data?.data ?? [];

    return (
        <Dialog open={!!student} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box>
                    <Typography variant="h4" component="div">Phụ huynh</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {student ? getStudentName(student) : ''}
                    </Typography>
                </Box>
                <IconButton size="small" onClick={onClose}><Close /></IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 3, minHeight: 200 }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress size={32} />
                    </Box>
                ) : parents.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, py: 6, color: 'text.secondary' }}>
                        <FamilyRestroom sx={{ fontSize: 48, opacity: 0.3 }} />
                        <Typography variant="body2">Chưa có thông tin phụ huynh</Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {parents.map((parent, idx) => (
                            <Box key={parent._id}>
                                {idx > 0 && <Divider sx={{ mb: 2 }} />}
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                    <Avatar
                                        sx={{
                                            width: 48, height: 48, borderRadius: 2, fontWeight: 700, flexShrink: 0,
                                            background: theme => `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
                                        }}
                                    >
                                        {getStudentName(parent).charAt(0).toUpperCase() || '?'}
                                    </Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="subtitle1" fontWeight={600} noWrap>
                                            {getStudentName(parent) || '—'}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'inline-flex', alignItems: 'center', gap: 0.5,
                                                px: 1.5, py: 0.25, borderRadius: 10, mb: 1,
                                                backgroundColor: theme => alpha(theme.palette.warning.main, 0.10),
                                                color: 'warning.main', fontSize: '0.7rem', fontWeight: 600,
                                            }}
                                        >
                                            Phụ huynh
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            {parent.phone && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                                    <Phone sx={{ fontSize: 14 }} />
                                                    <Typography variant="body2">{parent.phone}</Typography>
                                                </Box>
                                            )}
                                            {parent.email && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                                    <Email sx={{ fontSize: 14 }} />
                                                    <Typography variant="body2">{parent.email}</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>

            <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onClose}>Đóng</Button>
            </Box>
        </Dialog>
    );
}
