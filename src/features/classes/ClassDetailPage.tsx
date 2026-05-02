import { useState, useMemo } from 'react';
import {
    Typography, Box, Button, Skeleton, Tabs, Tab, Snackbar, Alert,
    IconButton, Tooltip, Chip,
} from '@mui/material';
import {
    ArrowBackOutlined, EditOutlined, DoDisturbOn,
    EventNoteOutlined, PeopleOutlined, InfoOutlined,
    PersonRemoveOutlined, SearchOff, CalendarTodayOutlined,
    AccessTimeOutlined, SchoolOutlined, PaidOutlined,
    PeopleAltOutlined, ScheduleOutlined,
} from '@mui/icons-material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import * as S from './classDetail.style';
import { teacherApi } from '@/features/teachers/api/teacher.api';
import { getInitials, formatDate, formatCurrency } from '@/utils/format.utils';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useClassDetail } from './hooks/useClasses';
import { useSessionList } from './hooks/useSessions';
import { useClassStudents } from './hooks/useEnrollments';
import { EditClassDialog } from './components/EditClassDialog';
import { CloseClassDialog } from './components/CloseClassDialog';
import { CreateSessionDialog } from './components/detail/CreateSessionDialog';
import { AddStudentDialog } from './components/detail/AddStudentDialog';
import { RemoveStudentDialog } from './components/detail/RemoveStudentDialog';
import type { ClassItem, ClassSession, ClassStudentItem } from './types/class.types';

interface Props { classId: string; }

const SESSION_STATUS_LABELS: Record<ClassSession['status'], string> = {
    scheduled: 'Lên lịch',
    ongoing: 'Đang diễn ra',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
};

export const ClassDetailPage = ({ classId }: Props) => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCloseOpen, setIsCloseOpen] = useState(false);
    const { snackbar, showSuccess, showError, close: closeSnackbar } = useSnackbar();

    const { data: classData, isLoading: classLoading } = useClassDetail(classId);
    const classItem = classData?.data;
    const isActive = classItem?.status === 'active';

    const handleClassMutated = (msg: string) => {
        showSuccess(msg);
        setIsEditOpen(false);
        setIsCloseOpen(false);
    };

    return (
        <S.PageContainer>
            <S.BackButton onClick={() => navigate({ to: '/classes' })}>
                <ArrowBackOutlined sx={{ fontSize: 18 }} />
                <span>Danh sách lớp học</span>
            </S.BackButton>

            <S.HeaderCard>
                <S.HeaderLeft>
                    {classLoading
                        ? <Skeleton variant="rounded" width={64} height={64} sx={{ borderRadius: 2, flexShrink: 0 }} />
                        : <S.ClassAvatar>{getInitials(classItem?.name ?? '')}</S.ClassAvatar>
                    }
                    <S.HeaderInfo>
                        {classLoading ? (
                            <Box>
                                <Skeleton width="40%" height={32} />
                                <Skeleton width="25%" height={22} sx={{ mt: 1 }} />
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                    <Typography variant="h2" color="text.primary">{classItem?.name}</Typography>
                                    {classItem?.code && (
                                        <Chip label={`#${classItem.code}`} size="small" variant="outlined" />
                                    )}
                                    {classItem && (
                                        <S.StatusChip
                                            classstatus={classItem.status}
                                            label={isActive ? 'Đang hoạt động' : 'Đã đóng'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                                <S.HeaderMeta>
                                    {classItem?.subjectName && (
                                        <S.MetaItem>
                                            <SchoolOutlined />
                                            <span>{classItem.subjectName}</span>
                                        </S.MetaItem>
                                    )}
                                    <S.MetaItem>
                                        <PeopleAltOutlined />
                                        <span>
                                            {classItem?.studentCount ?? 0}
                                            {classItem?.maxStudents ? `/${classItem.maxStudents}` : ''} học sinh
                                        </span>
                                    </S.MetaItem>
                                    {classItem?.schedule && (
                                        <S.MetaItem>
                                            <ScheduleOutlined />
                                            <span>{classItem.schedule}</span>
                                        </S.MetaItem>
                                    )}
                                    <S.MetaItem>
                                        <PaidOutlined />
                                        <span>{classItem ? formatCurrency(classItem.tuitionFee) : '—'}</span>
                                    </S.MetaItem>
                                </S.HeaderMeta>
                            </>
                        )}
                    </S.HeaderInfo>
                </S.HeaderLeft>

                <S.HeaderActions>
                    <Tooltip title={!isActive ? 'Lớp đã đóng' : ''} arrow>
                        <span>
                            <Button
                                variant="outlined"
                                startIcon={<EditOutlined />}
                                onClick={() => setIsEditOpen(true)}
                                disabled={!isActive || classLoading}
                                size="small"
                            >
                                Chỉnh sửa
                            </Button>
                        </span>
                    </Tooltip>
                    <Tooltip title={!isActive ? 'Lớp đã đóng' : ''} arrow>
                        <span>
                            <Button
                                variant="outlined"
                                color="warning"
                                startIcon={<DoDisturbOn />}
                                onClick={() => setIsCloseOpen(true)}
                                disabled={!isActive || classLoading}
                                size="small"
                            >
                                Đóng lớp
                            </Button>
                        </span>
                    </Tooltip>
                </S.HeaderActions>
            </S.HeaderCard>

            <S.TabsWrapper>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                    <Tab icon={<EventNoteOutlined fontSize="small" />} iconPosition="start" label="Tiết học" />
                    <Tab icon={<PeopleOutlined fontSize="small" />} iconPosition="start" label="Học sinh" />
                    <Tab icon={<InfoOutlined fontSize="small" />} iconPosition="start" label="Thông tin lớp" />
                </Tabs>
            </S.TabsWrapper>

            {tab === 0 && (
                <SessionsPanel classId={classId} isActive={!!isActive} onError={showError} onSuccess={showSuccess} />
            )}
            {tab === 1 && (
                <StudentsPanel classId={classId} isActive={!!isActive} onError={showError} onSuccess={showSuccess} />
            )}
            {tab === 2 && classItem && (
                <ClassInfoPanel classItem={classItem} />
            )}

            <EditClassDialog
                classItem={isEditOpen ? (classItem ?? null) : null}
                onClose={() => setIsEditOpen(false)}
                onSuccess={() => handleClassMutated('Cập nhật lớp học thành công!')}
                onError={showError}
            />
            <CloseClassDialog
                classItem={isCloseOpen ? (classItem ?? null) : null}
                onClose={() => setIsCloseOpen(false)}
                onSuccess={() => handleClassMutated('Đã đóng lớp học.')}
                onError={showError}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} variant="filled" onClose={closeSnackbar} sx={{ minWidth: 280 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </S.PageContainer>
    );
};

// ─── Sessions Panel ───────────────────────────────────────────────────────────

interface SessionsPanelProps {
    classId: string;
    isActive: boolean;
    onError: (msg: string) => void;
    onSuccess: (msg: string) => void;
}

function SessionsPanel({ classId, isActive, onError, onSuccess }: SessionsPanelProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { sessions, isLoading } = useSessionList(classId);

    return (
        <Box>
            <S.SectionHeader>
                <Box>
                    <Typography variant="h4" color="text.primary">Danh sách Tiết học</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.25}>
                        {isLoading ? '...' : `${sessions.length} tiết học`}
                    </Typography>
                </Box>
                {isActive && (
                    <Button variant="contained" startIcon={<EventNoteOutlined />} onClick={() => setIsCreateOpen(true)} size="small">
                        Thêm tiết học
                    </Button>
                )}
            </S.SectionHeader>

            <Box sx={{ mt: 2 }}>
                <S.SessionListHeader>
                    <Typography variant="inherit">Ngày học</Typography>
                    <Typography variant="inherit">Giờ học</Typography>
                    <Typography variant="inherit">Chủ đề</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit">Điểm danh</Typography>
                </S.SessionListHeader>

                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <S.SessionRow key={i}>
                            <Skeleton width="70%" height={18} />
                            <Skeleton width="80%" height={18} />
                            <Skeleton width="60%" height={18} />
                            <Skeleton width={90} height={24} sx={{ borderRadius: 4 }} />
                            <Skeleton width={90} height={24} sx={{ borderRadius: 4 }} />
                        </S.SessionRow>
                    ))
                    : sessions.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 56, opacity: 0.25 }} />
                                <Typography variant="h5">Chưa có tiết học nào</Typography>
                                <Typography variant="body2">
                                    {isActive ? 'Nhấn "Thêm tiết học" để tạo tiết học mới' : 'Lớp học đã đóng'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : sessions.map(session => (
                            <S.SessionRow key={session._id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CalendarTodayOutlined sx={{ fontSize: 15, color: 'text.secondary' }} />
                                    <Typography variant="body2" fontWeight={500}>
                                        {formatDate(session.sessionDate)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AccessTimeOutlined sx={{ fontSize: 15, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {session.startTime} – {session.endTime}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {session.topic ?? '—'}
                                </Typography>
                                <S.SessionStatusChip sessionstatus={session.status}>
                                    {SESSION_STATUS_LABELS[session.status]}
                                </S.SessionStatusChip>
                                <S.AttendanceChip done={session.attendanceStatus === 'submitted'}>
                                    {session.attendanceStatus === 'submitted' ? 'Đã điểm danh' : 'Chưa điểm danh'}
                                </S.AttendanceChip>
                            </S.SessionRow>
                        ))
                }
            </Box>

            <CreateSessionDialog
                open={isCreateOpen}
                classId={classId}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => { setIsCreateOpen(false); onSuccess('Thêm tiết học thành công!'); }}
                onError={onError}
            />
        </Box>
    );
}

// ─── Students Panel ───────────────────────────────────────────────────────────

interface StudentsPanelProps {
    classId: string;
    isActive: boolean;
    onError: (msg: string) => void;
    onSuccess: (msg: string) => void;
}

function StudentsPanel({ classId, isActive, onError, onSuccess }: StudentsPanelProps) {
    const queryClient = useQueryClient();
    const [studentStatus, setStudentStatus] = useState<'active' | 'left'>('active');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [removeStudent, setRemoveStudent] = useState<ClassStudentItem | null>(null);

    const { students, isLoading } = useClassStudents(classId, studentStatus);

    const handleAdded = () => {
        queryClient.invalidateQueries({ queryKey: ['class-students', classId] });
        queryClient.invalidateQueries({ queryKey: ['class-detail', classId] });
        queryClient.invalidateQueries({ queryKey: ['students-search', classId] });
    };

    return (
        <Box>
            <S.SectionHeader>
                <Box>
                    <Typography variant="h4" color="text.primary">Danh sách Học sinh</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.25}>
                        {isLoading ? '...' : `${students.length} học sinh`}
                    </Typography>
                </Box>
                {isActive && (
                    <Button variant="contained" startIcon={<PeopleOutlined />} onClick={() => setIsAddOpen(true)} size="small">
                        Thêm học sinh
                    </Button>
                )}
            </S.SectionHeader>

            <Box sx={{ mt: 1, mb: 2 }}>
                <Tabs value={studentStatus} onChange={(_, v) => setStudentStatus(v)} sx={{ minHeight: 36 }}>
                    <Tab value="active" label="Đang học" sx={{ minHeight: 36, py: 0.5 }} />
                    <Tab value="left" label="Đã rút" sx={{ minHeight: 36, py: 0.5 }} />
                </Tabs>
            </Box>

            <Box>
                <S.StudentListHeader>
                    <Typography variant="inherit">Học sinh</Typography>
                    <Typography variant="inherit">Mã học sinh</Typography>
                    <Typography variant="inherit">Liên hệ</Typography>
                    <Typography variant="inherit">Ngày tham gia</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.StudentListHeader>

                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <S.StudentRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 1, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="55%" height={18} />
                                    <Skeleton width="35%" height={14} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Skeleton width="60%" height={16} />
                            <Skeleton width="70%" height={16} />
                            <Skeleton width="65%" height={16} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </S.StudentRow>
                    ))
                    : students.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 56, opacity: 0.25 }} />
                                <Typography variant="h5">Chưa có học sinh nào</Typography>
                                <Typography variant="body2">
                                    {studentStatus === 'active'
                                        ? (isActive ? 'Nhấn "Thêm học sinh" để đăng ký học sinh vào lớp' : 'Lớp học đã đóng')
                                        : 'Không có học sinh đã rút'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : students.map(item => (
                            <S.StudentRow key={item._id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                                    <S.StudentAvatar>{getInitials(item.studentId.fullName)}</S.StudentAvatar>
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="subtitle2" fontWeight={600} noWrap>
                                            {item.studentId.fullName || '—'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" noWrap>
                                            {item.studentId.email ?? '—'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                                    {item.studentId.userCode ?? '—'}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {item.studentId.phone ?? '—'}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {formatDate(item.enrolledAt)}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {isActive && studentStatus === 'active' && (
                                        <Tooltip title="Rút khỏi lớp" arrow>
                                            <IconButton size="small" color="warning" onClick={() => setRemoveStudent(item)}>
                                                <PersonRemoveOutlined fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            </S.StudentRow>
                        ))
                }
            </Box>

            <AddStudentDialog
                open={isAddOpen}
                classId={classId}
                onClose={() => setIsAddOpen(false)}
                onAdded={handleAdded}
            />
            <RemoveStudentDialog
                student={removeStudent}
                classId={classId}
                onClose={() => setRemoveStudent(null)}
                onSuccess={() => { setRemoveStudent(null); onSuccess('Đã rút học sinh khỏi lớp.'); }}
                onError={onError}
            />
        </Box>
    );
}

// ─── Class Info Panel ─────────────────────────────────────────────────────────

interface ClassInfoPanelProps {
    classItem: ClassItem;
}

function ClassInfoPanel({ classItem }: ClassInfoPanelProps) {
    const { data: teacherData } = useQuery({
        queryKey: ['teachers-list', ''],
        queryFn: () => teacherApi.getAll({ limit: 100 }),
    });

    const teacher = useMemo(
        () => teacherData?.data.find(t => t._id === classItem.teacherId),
        [teacherData, classItem.teacherId],
    );

    const fields = [
        { icon: <SchoolOutlined fontSize="small" />, label: 'Môn học', value: classItem.subjectName },
        { icon: <PeopleAltOutlined fontSize="small" />, label: 'Giáo viên', value: teacher?.fullName ?? classItem.teacherId },
        { icon: <PeopleOutlined fontSize="small" />, label: 'Sĩ số', value: `${classItem.studentCount}${classItem.maxStudents ? `/${classItem.maxStudents}` : ''} học sinh` },
        { icon: <PaidOutlined fontSize="small" />, label: 'Học phí', value: formatCurrency(classItem.tuitionFee) },
        { icon: <ScheduleOutlined fontSize="small" />, label: 'Lịch học', value: classItem.schedule ?? '—' },
        { icon: <CalendarTodayOutlined fontSize="small" />, label: 'Ngày bắt đầu', value: formatDate(classItem.startDate) },
        { icon: <CalendarTodayOutlined fontSize="small" />, label: 'Ngày kết thúc', value: formatDate(classItem.endDate) },
        { icon: <CalendarTodayOutlined fontSize="small" />, label: 'Ngày tạo', value: formatDate(classItem.createdAt) },
    ];

    return (
        <Box>
            <S.SectionHeader>
                <Typography variant="h4" color="text.primary">Thông tin Lớp học</Typography>
            </S.SectionHeader>
            <S.InfoGrid sx={{ mt: 2 }}>
                {fields.map(f => (
                    <S.InfoCell key={f.label}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                            {f.icon}
                            <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.5}>
                                {f.label}
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={500} color="text.primary">
                            {f.value}
                        </Typography>
                    </S.InfoCell>
                ))}
            </S.InfoGrid>
        </Box>
    );
}
