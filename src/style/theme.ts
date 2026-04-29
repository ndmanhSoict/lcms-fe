import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';

// ============================================================
// TYPE AUGMENTATION — mở rộng Palette & Typography của MUI
// ============================================================
declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
        success: Palette['primary'];
        warning: Palette['primary'];
        error: Palette['primary'];
        info: Palette['primary'];
        // Semantic colors cho LCMS
        attendance: {
            present: string;
            absent: string;
            late: string;
            excused: string;
        };
        invoice: {
            paid: string;
            unpaid: string;
            overdue: string;
            partial: string;
        };
        grade: {
            excellent: string; // A: 9-10
            good: string;      // B: 7-8
            average: string;   // C: 5-6
            poor: string;      // D/F: <5
        };
        role: {
            systemOwner: string;
            branchOwner: string;
            staff: string;
            teacher: string;
            student: string;
            parent: string;
        };
        // Neutral scale đầy đủ
        neutral: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
        attendance?: Palette['attendance'];
        invoice?: Palette['invoice'];
        grade?: Palette['grade'];
        role?: Palette['role'];
        neutral?: Palette['neutral'];
    }

    // Mở rộng Typography variants
    interface TypographyVariants {
        // Heading scale
        displayLg: React.CSSProperties;
        displayMd: React.CSSProperties;
        displaySm: React.CSSProperties;
        // Label
        labelLg: React.CSSProperties;
        labelMd: React.CSSProperties;
        labelSm: React.CSSProperties;
        // Code
        code: React.CSSProperties;
        // Dashboard specific
        metricValue: React.CSSProperties;
        metricLabel: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        displayLg?: React.CSSProperties;
        displayMd?: React.CSSProperties;
        displaySm?: React.CSSProperties;
        labelLg?: React.CSSProperties;
        labelMd?: React.CSSProperties;
        labelSm?: React.CSSProperties;
        code?: React.CSSProperties;
        metricValue?: React.CSSProperties;
        metricLabel?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        displayLg: true;
        displayMd: true;
        displaySm: true;
        labelLg: true;
        labelMd: true;
        labelSm: true;
        code: true;
        metricValue: true;
        metricLabel: true;
    }
}

// ============================================================
// DESIGN TOKENS — nguồn sự thật duy nhất cho toàn bộ FE
// ============================================================

// ── Raw color primitives ──

export const BLUE = {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
};

export const TEAL = {
    50:  '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
};

export const VIOLET = {
    50:  '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
};

export const AMBER = {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
};

export const EMERALD = {
    50:  '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
};

export const RED = {
    50:  '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
};

// PINK — dùng cho role parent, phân biệt rõ với Amber warning
export const PINK = {
    50:  '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
};

// ORANGE — dự phòng cho warning gradient, không dùng trong palette role
export const ORANGE = {
    50:  '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
};

export const SLATE = {
    50:  '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    850: '#162032',
    900: '#0F172A',
    950: '#0b1326',
};

export const DARK = {
    bg:       '#0b1326',
    surface:  '#171F33',
    elevated: '#1E2740',
    border:   '#2A3352',
    hover:    '#243050',
};


// ── Gradient presets ──

export const GRADIENTS = {
    // Primary brand gradients
    primary:        'linear-gradient(135deg, #2563EB 0%, #0D9488 100%)',
    primaryButton:  'linear-gradient(to right, #2563EB, #0D9488)',
    primarySoft:    'linear-gradient(135deg, #DBEAFE 0%, #CCFBF1 100%)',

    // Accent
    violet:         'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
    violetSoft:     'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',

    // Status
    success:        'linear-gradient(135deg, #10B981 0%, #0D9488 100%)',
    warning:        'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    error:          'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',

    // Finance / metric cards — giữ cùng tông lạnh brand
    // finance: Blue→Violet thể hiện "dữ liệu tài chính quan trọng" mà không phá tông
    // invoiceOverdue dùng Red riêng — chỉ khi cần báo động thực sự
    finance:        'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
    revenue:        'linear-gradient(135deg, #10B981 0%, #0D9488 100%)',
    studentCount:   'linear-gradient(135deg, #7C3AED 0%, #0D9488 100%)',
    // Dùng riêng cho trạng thái invoice quá hạn — KHÔNG dùng làm card decoration
    invoiceOverdue: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',

    // Dark mode variants
    primaryDark:    'linear-gradient(135deg, #B4C5FF 0%, #6BD8CB 100%)',
    violetDark:     'linear-gradient(135deg, #D2BBFF 0%, #B4C5FF 100%)',
} as const;

// ── Shadow tokens ──

export const SHADOWS = {
    light: {
        none:   'none',
        xs:     '0 1px 2px rgba(15, 23, 42, 0.04)',
        sm:     '0 2px 8px rgba(15, 23, 42, 0.06)',
        md:     '0 4px 16px rgba(15, 23, 42, 0.08)',
        lg:     '0 8px 24px rgba(15, 23, 42, 0.10)',
        xl:     '0 16px 40px rgba(15, 23, 42, 0.12)',
        '2xl':  '0 24px 64px rgba(15, 23, 42, 0.16)',
        // Colored glow shadows
        primary:   '0 8px 24px rgba(37, 99, 235, 0.20)',
        primaryLg: '0 16px 40px rgba(37, 99, 235, 0.28)',
        teal:      '0 8px 24px rgba(13, 148, 136, 0.20)',
        violet:    '0 8px 24px rgba(124, 58, 237, 0.20)',
        success:   '0 8px 24px rgba(16, 185, 129, 0.20)',
        warning:   '0 8px 24px rgba(245, 158, 11, 0.20)',
        error:     '0 8px 24px rgba(239, 68, 68, 0.20)',
        // Card default
        card:      '0px 10px 30px rgba(37, 99, 235, 0.06)',
        // Inset (input focus, dividers)
        inset:     'inset 0 1px 3px rgba(15, 23, 42, 0.06)',
    },
    dark: {
        none:   'none',
        xs:     '0 1px 2px rgba(0, 0, 0, 0.20)',
        sm:     '0 2px 8px rgba(0, 0, 0, 0.30)',
        md:     '0 4px 16px rgba(0, 0, 0, 0.35)',
        lg:     '0 8px 24px rgba(0, 0, 0, 0.40)',
        xl:     '0 16px 40px rgba(0, 0, 0, 0.45)',
        '2xl':  '0 24px 64px rgba(0, 0, 0, 0.55)',
        primary:   '0 8px 24px rgba(180, 197, 255, 0.12)',
        primaryLg: '0 16px 40px rgba(180, 197, 255, 0.18)',
        teal:      '0 8px 24px rgba(107, 216, 203, 0.12)',
        violet:    '0 8px 24px rgba(210, 187, 255, 0.12)',
        success:   '0 8px 24px rgba(52, 211, 153, 0.12)',
        warning:   '0 8px 24px rgba(251, 191, 36, 0.12)',
        error:     '0 8px 24px rgba(248, 113, 113, 0.12)',
        card:      '0px 10px 40px rgba(0, 0, 0, 0.40)',
        inset:     'inset 0 1px 3px rgba(0, 0, 0, 0.30)',
    },
} as const;

// ── Blur / backdrop tokens ──

export const BLUR = {
    none: 'blur(0px)',
    sm:   'blur(4px)',
    md:   'blur(8px)',
    lg:   'blur(12px)',
    xl:   'blur(20px)',
    '2xl': 'blur(40px)',
} as const;

// ── Spacing scale (px values, dùng tham chiếu khi cần hardcode) ──

export const SPACING = {
    0:   '0px',
    0.5: '2px',
    1:   '4px',
    1.5: '6px',
    2:   '8px',
    2.5: '10px',
    3:   '12px',
    4:   '16px',
    5:   '20px',
    6:   '24px',
    7:   '28px',
    8:   '32px',
    10:  '40px',
    12:  '48px',
    14:  '56px',
    16:  '64px',
    20:  '80px',
    24:  '96px',
} as const;

// ── Border radius ──

export const RADIUS = {
    none: '0px',
    sm:   '4px',
    md:   '8px',
    lg:   '12px',
    xl:   '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
} as const;

// ── Font size scale ──

export const FONT_SIZE = {
    '2xs': '0.625rem',  // 10px
    xs:   '0.75rem',    // 12px
    sm:   '0.875rem',   // 14px
    md:   '1rem',       // 16px
    lg:   '1.125rem',   // 18px
    xl:   '1.25rem',    // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.75rem',  // 28px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.5rem',   // 56px
} as const;

// ── Font weight ──

export const FONT_WEIGHT = {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
} as const;

// ── Line height ──

export const LINE_HEIGHT = {
    tight:   1.2,
    snug:    1.375,
    normal:  1.5,
    relaxed: 1.625,
    loose:   2,
} as const;

// ── Letter spacing ──

export const LETTER_SPACING = {
    tighter: '-0.03em',
    tight:   '-0.015em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
} as const;

// ── Transition presets ──

export const TRANSITION = {
    fast:   'all 0.15s ease-in-out',
    normal: 'all 0.2s ease-in-out',
    slow:   'all 0.35s ease-in-out',
    spring: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Individual property transitions
    color:      'color 0.15s ease-in-out',
    bg:         'background-color 0.2s ease-in-out',
    shadow:     'box-shadow 0.2s ease-in-out',
    transform:  'transform 0.2s ease-in-out',
    opacity:    'opacity 0.2s ease-in-out',
} as const;

// ── Z-index scale ──

export const Z_INDEX = {
    base:      0,
    raised:    10,
    dropdown:  200,
    sticky:    300,
    overlay:   400,
    modal:     500,
    popover:   600,
    toast:     700,
    tooltip:   800,
} as const;

// ── Breakpoints (px) — khớp với MUI defaults ──

export const BREAKPOINTS = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
} as const;

// ── Opacity scale ──

export const OPACITY = {
    0:    0,
    5:    0.05,
    10:   0.10,
    20:   0.20,
    30:   0.30,
    40:   0.40,
    50:   0.50,
    60:   0.60,
    70:   0.70,
    80:   0.80,
    90:   0.90,
    95:   0.95,
    100:  1,
} as const;

// ============================================================
// THEME FACTORY
// ============================================================

export const getAppTheme = (mode: 'light' | 'dark') => {
    const isLight = mode === 'light';

    // ── Semantic palette per mode ──
    const palette = isLight ? {
        // Brand
        // .dark giữ đúng giá trị gốc — đậm gần đen, có cá tính riêng
        primary:   { main: BLUE[600],   light: BLUE[100],    dark: '#003ea8',    contrastText: '#FFFFFF' },
        secondary: { main: TEAL[600],   light: TEAL[100],    dark: '#005049',    contrastText: '#FFFFFF' },
        tertiary:  { main: VIOLET[600], light: VIOLET[100],  dark: '#3f008e',    contrastText: '#FFFFFF' },
        // Status
        success:   { main: EMERALD[500], light: EMERALD[50],  dark: EMERALD[700], contrastText: '#FFFFFF' },
        warning:   { main: AMBER[500],   light: AMBER[50],    dark: AMBER[700],   contrastText: '#FFFFFF' },
        error:     { main: RED[500],     light: RED[50],      dark: RED[700],     contrastText: '#FFFFFF' },
        info:      { main: BLUE[500],    light: BLUE[50],     dark: BLUE[700],    contrastText: '#FFFFFF' },
        // Surface
        background: { default: SLATE[50], paper: '#FFFFFF' },
        text: {
            primary:   SLATE[900],
            secondary: SLATE[500],
            disabled:  SLATE[400],
        },
        divider: alpha(SLATE[900], 0.08),
        action: {
            hover:           alpha(BLUE[600], 0.06),
            selected:        alpha(BLUE[600], 0.10),
            focus:           alpha(BLUE[600], 0.12),
            disabledBackground: SLATE[100],
            disabled:        SLATE[400],
        },
        // LCMS semantic tokens
        neutral: {
            50:  SLATE[50],   100: SLATE[100],
            200: SLATE[200],  300: SLATE[300],
            400: SLATE[400],  500: SLATE[500],
            600: SLATE[600],  700: SLATE[700],
            800: SLATE[800],  900: SLATE[900],
        },
        attendance: {
            present: EMERALD[500],
            absent:  RED[500],
            late:    AMBER[500],
            excused: BLUE[500],
        },
        invoice: {
            paid:    EMERALD[500],
            unpaid:  AMBER[500],
            overdue: RED[500],
            partial: BLUE[500],
        },
        grade: {
            excellent: EMERALD[500],  // A: 9-10
            good:      BLUE[500],     // B: 7-8
            average:   AMBER[500],    // C: 5-6
            poor:      RED[500],      // D/F: <5
        },
        role: {
            systemOwner: VIOLET[600],  // tím — quyền lực cao nhất
            branchOwner: BLUE[600],    // xanh brand — quản lý cơ sở
            staff:       TEAL[600],    // teal — vận hành
            teacher:     EMERALD[600], // xanh lá — giảng dạy
            student:     BLUE[500],    // xanh nhạt — học sinh
            parent:      PINK[500],    // hồng — phụ huynh, khác hẳn amber warning
        },
    } : {
        // Brand — lighter for dark bg
        primary:   { main: '#B4C5FF', light: '#dbe1ff',  dark: BLUE[600],    contrastText: DARK.bg },
        secondary: { main: '#6BD8CB', light: '#89f5e7',  dark: TEAL[600],    contrastText: DARK.bg },
        tertiary:  { main: '#D2BBFF', light: '#eaddff',  dark: VIOLET[600],  contrastText: DARK.bg },
        // Status — softer on dark
        success:   { main: '#34D399', light: alpha('#34D399', 0.15), dark: EMERALD[700], contrastText: DARK.bg },
        warning:   { main: '#FBBF24', light: alpha('#FBBF24', 0.15), dark: AMBER[700],   contrastText: DARK.bg },
        error:     { main: '#F87171', light: alpha('#F87171', 0.15), dark: RED[700],      contrastText: DARK.bg },
        info:      { main: '#93C5FD', light: alpha('#93C5FD', 0.15), dark: BLUE[700],    contrastText: DARK.bg },
        // Surface
        background: { default: DARK.bg, paper: DARK.surface },
        text: {
            primary:   '#DAE2FD',
            secondary: '#C3C6D7',
            disabled:  '#6B7194',
        },
        divider: alpha('#8D90A0', 0.10),
        action: {
            hover:           alpha('#B4C5FF', 0.08),
            selected:        alpha('#B4C5FF', 0.12),
            focus:           alpha('#B4C5FF', 0.16),
            disabledBackground: alpha('#B4C5FF', 0.08),
            disabled:        '#6B7194',
        },
        neutral: {
            50:  DARK.elevated, 100: DARK.border,
            200: '#2D3654',     300: '#374060',
            400: '#475580',     500: '#6B7194',
            600: '#8D90A0',     700: '#A8ABBC',
            800: '#C3C6D7',     900: '#DAE2FD',
        },
        attendance: {
            present: '#34D399',
            absent:  '#F87171',
            late:    '#FBBF24',
            excused: '#93C5FD',
        },
        invoice: {
            paid:    '#34D399',
            unpaid:  '#FBBF24',
            overdue: '#F87171',
            partial: '#93C5FD',
        },
        grade: {
            excellent: '#34D399',
            good:      '#93C5FD',
            average:   '#FBBF24',
            poor:      '#F87171',
        },
        role: {
            systemOwner: '#D2BBFF',  // violet nhạt
            branchOwner: '#B4C5FF',  // blue nhạt
            staff:       '#6BD8CB',  // teal nhạt
            teacher:     '#34D399',  // emerald nhạt
            student:     '#93C5FD',  // blue nhạt hơn
            parent:      '#F9A8D4',  // pink nhạt — khác hẳn amber #FBBF24 của warning
        },
    };

    const shadows = isLight ? SHADOWS.light : SHADOWS.dark;

    // ── Component overrides ──
    const themeConfig: ThemeOptions = {
        palette: {
            mode,
            ...palette,
        },

        // ── Typography ──
        typography: {
            fontFamily: '"Inter", system-ui, sans-serif',

            // === Heading scale ===
            h1: {
                fontSize:      FONT_SIZE['4xl'],   // 36px
                fontWeight:    FONT_WEIGHT.bold,
                lineHeight:    LINE_HEIGHT.tight,
                letterSpacing: LETTER_SPACING.tighter,
                color: isLight ? SLATE[900] : '#DAE2FD',
            },
            h2: {
                fontSize:      FONT_SIZE['3xl'],   // 28px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.tight,
                letterSpacing: LETTER_SPACING.tight,
                color: isLight ? SLATE[900] : '#DAE2FD',
            },
            h3: {
                fontSize:      FONT_SIZE['xl'],    // 20px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.snug,
                letterSpacing: LETTER_SPACING.tight,
                color: isLight ? SLATE[800] : '#C3C6D7',
            },
            h4: {
                fontSize:      FONT_SIZE['lg'],    // 18px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.snug,
                color: isLight ? SLATE[800] : '#C3C6D7',
            },
            h5: {
                fontSize:      FONT_SIZE['md'],    // 16px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.normal,
                color: isLight ? SLATE[700] : '#A8ABBC',
            },
            h6: {
                fontSize:      FONT_SIZE['sm'],    // 14px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.normal,
                color: isLight ? SLATE[700] : '#A8ABBC',
            },
            // === Body ===
            body1: {
                fontSize:      FONT_SIZE['sm'],    // 14px
                fontWeight:    FONT_WEIGHT.regular,
                lineHeight:    LINE_HEIGHT.relaxed,
                color: isLight ? SLATE[800] : '#C3C6D7',
            },
            body2: {
                fontSize:      FONT_SIZE['xs'],    // 12px
                fontWeight:    FONT_WEIGHT.regular,
                lineHeight:    LINE_HEIGHT.normal,
                color: isLight ? SLATE[500] : '#8D90A0',
            },
            // === Subtitle ===
            subtitle1: {
                fontSize:      FONT_SIZE['sm'],    // 14px
                fontWeight:    FONT_WEIGHT.medium,
                lineHeight:    LINE_HEIGHT.normal,
                color: isLight ? SLATE[700] : '#A8ABBC',
            },
            subtitle2: {
                fontSize:      FONT_SIZE['xs'],    // 12px
                fontWeight:    FONT_WEIGHT.medium,
                lineHeight:    LINE_HEIGHT.normal,
                color: isLight ? SLATE[600] : '#8D90A0',
            },
            // === Caption & Overline ===
            caption: {
                fontSize:      FONT_SIZE['2xs'],   // 10px
                fontWeight:    FONT_WEIGHT.medium,
                lineHeight:    LINE_HEIGHT.normal,
                letterSpacing: LETTER_SPACING.wider,
                textTransform: 'uppercase' as const,
                color: isLight ? SLATE[500] : '#6B7194',
            },
            overline: {
                fontSize:      FONT_SIZE['2xs'],   // 10px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.normal,
                letterSpacing: LETTER_SPACING.widest,
                textTransform: 'uppercase' as const,
                color: isLight ? SLATE[400] : '#6B7194',
            },
            // === Custom LCMS variants ===
            displayLg: {
                fontSize:      FONT_SIZE['6xl'],   // 56px
                fontWeight:    FONT_WEIGHT.bold,
                lineHeight:    LINE_HEIGHT.tight,
                letterSpacing: LETTER_SPACING.tighter,
            },
            displayMd: {
                fontSize:      FONT_SIZE['5xl'],   // 48px
                fontWeight:    FONT_WEIGHT.bold,
                lineHeight:    LINE_HEIGHT.tight,
                letterSpacing: LETTER_SPACING.tighter,
            },
            displaySm: {
                fontSize:      FONT_SIZE['4xl'],   // 36px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.tight,
                letterSpacing: LETTER_SPACING.tight,
            },
            labelLg: {
                fontSize:      FONT_SIZE['sm'],    // 14px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.normal,
                letterSpacing: LETTER_SPACING.wide,
            },
            labelMd: {
                fontSize:      FONT_SIZE['xs'],    // 12px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.normal,
                letterSpacing: LETTER_SPACING.wide,
            },
            labelSm: {
                fontSize:      FONT_SIZE['2xs'],   // 10px
                fontWeight:    FONT_WEIGHT.semibold,
                lineHeight:    LINE_HEIGHT.normal,
                letterSpacing: LETTER_SPACING.wider,
            },
            code: {
                fontFamily:    '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
                fontSize:      FONT_SIZE['xs'],    // 12px
                fontWeight:    FONT_WEIGHT.medium,
                lineHeight:    LINE_HEIGHT.relaxed,
            },
            // Dashboard metric displays
            metricValue: {
                fontSize:      FONT_SIZE['4xl'],   // 36px
                fontWeight:    FONT_WEIGHT.bold,
                lineHeight:    1,
                letterSpacing: LETTER_SPACING.tighter,
                fontVariantNumeric: 'tabular-nums',
            },
            metricLabel: {
                fontSize:      FONT_SIZE['xs'],    // 12px
                fontWeight:    FONT_WEIGHT.medium,
                lineHeight:    LINE_HEIGHT.normal,
                letterSpacing: LETTER_SPACING.wider,
                textTransform: 'uppercase' as const,
                color: isLight ? SLATE[500] : '#6B7194',
            },
        },

        // ── Shape ──
        shape: {
            borderRadius: 12,
        },

        // ── Spacing (base = 4px) ──
        spacing: 4,

        // ── Breakpoints ──
        breakpoints: {
            values: BREAKPOINTS,
        },

        // ── Component overrides ──
        components: {

            // === Paper / Card ===
            MuiPaper: {
                defaultProps: { elevation: 0 },
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        boxShadow:  shadows.card,
                        borderRadius: RADIUS.xl,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.08) : DARK.border}`,
                        backgroundColor: isLight
                            ? alpha('#FFFFFF', 0.85)
                            : alpha(DARK.surface, 0.80),
                        backdropFilter: BLUR.lg,
                        transition: TRANSITION.normal,
                    },
                    // Elevated variant — nổi hơn (modal, dropdown)
                    elevation1: {
                        boxShadow: shadows.md,
                    },
                    elevation2: {
                        boxShadow: shadows.lg,
                    },
                    elevation3: {
                        boxShadow: shadows.xl,
                    },
                },
            },

            // === Card ===
            MuiCard: {
                defaultProps: { elevation: 0 },
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.xl,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.07) : DARK.border}`,
                        boxShadow: shadows.card,
                        backgroundImage: 'none',
                        backgroundColor: isLight ? '#FFFFFF' : DARK.surface,
                        transition: TRANSITION.normal,
                        '&:hover': {
                            boxShadow: shadows.md,
                            transform: 'translateY(-1px)',
                        },
                    },
                },
            },

            MuiCardContent: {
                styleOverrides: {
                    root: {
                        padding: SPACING[6],
                        '&:last-child': { paddingBottom: SPACING[6] },
                    },
                },
            },

            // === Button ===
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.md,
                        textTransform: 'none',
                        fontWeight: FONT_WEIGHT.semibold,
                        fontSize: FONT_SIZE.sm,
                        padding: `${SPACING[3]} ${SPACING[6]}`,
                        transition: TRANSITION.normal,
                        letterSpacing: LETTER_SPACING.wide,

                        // contained primary — gradient brand
                        '&.MuiButton-containedPrimary': {
                            background: GRADIENTS.primaryButton,
                            boxShadow: shadows.primary,
                            color: '#FFFFFF',
                            '&:hover': {
                                filter: 'brightness(1.08)',
                                boxShadow: shadows.primaryLg,
                                transform: 'translateY(-1px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                                boxShadow: shadows.primary,
                            },
                            '&.Mui-disabled': {
                                background: isLight ? SLATE[200] : DARK.border,
                                color: isLight ? SLATE[400] : '#6B7194',
                                boxShadow: 'none',
                            },
                        },

                        // contained secondary — teal solid
                        '&.MuiButton-containedSecondary': {
                            background: isLight ? TEAL[600] : '#6BD8CB',
                            boxShadow: shadows.teal,
                            color: isLight ? '#FFFFFF' : DARK.bg,
                            '&:hover': {
                                filter: 'brightness(1.08)',
                                boxShadow: `0 12px 32px ${isLight ? 'rgba(13,148,136,0.30)' : 'rgba(107,216,203,0.18)'}`,
                                transform: 'translateY(-1px)',
                            },
                        },

                        // outlined primary
                        '&.MuiButton-outlinedPrimary': {
                            borderWidth: '1.5px',
                            borderColor: isLight ? BLUE[600] : '#B4C5FF',
                            color: isLight ? BLUE[600] : '#B4C5FF',
                            '&:hover': {
                                borderWidth: '1.5px',
                                backgroundColor: isLight ? alpha(BLUE[600], 0.06) : alpha('#B4C5FF', 0.08),
                            },
                        },

                        // outlined secondary
                        '&.MuiButton-outlinedSecondary': {
                            borderWidth: '1.5px',
                            '&:hover': { borderWidth: '1.5px' },
                        },

                        // text primary
                        '&.MuiButton-textPrimary': {
                            color: isLight ? BLUE[600] : '#B4C5FF',
                            '&:hover': {
                                backgroundColor: isLight ? alpha(BLUE[600], 0.06) : alpha('#B4C5FF', 0.08),
                            },
                        },
                    },
                    // Sizes — vẫn dùng key MUI chuẩn
                    sizeSmall: {
                        fontSize: FONT_SIZE.xs,
                        padding: `${SPACING[1.5]} ${SPACING[3]}`,
                        borderRadius: RADIUS.md,
                    },
                    sizeMedium: {
                        fontSize: FONT_SIZE.sm,
                        padding: `${SPACING[2.5]} ${SPACING[5]}`,
                    },
                    sizeLarge: {
                        fontSize: FONT_SIZE.md,
                        padding: `${SPACING[3]} ${SPACING[8]}`,
                        borderRadius: RADIUS.lg,
                    },
                },
            },

            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.md,
                        transition: TRANSITION.normal,
                        '&:hover': {
                            backgroundColor: isLight ? alpha(BLUE[600], 0.06) : alpha('#B4C5FF', 0.08),
                        },
                    },
                    sizeSmall:  { padding: SPACING[1.5] },
                    sizeMedium: { padding: SPACING[2] },
                    sizeLarge:  { padding: SPACING[2.5] },
                },
            },

            // === TextField / Input ===
            MuiTextField: {
                defaultProps: { variant: 'outlined', size: 'small' },
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: isLight ? SLATE[100] : DARK.elevated,
                            borderRadius: RADIUS.md,
                            fontSize: FONT_SIZE.sm,
                            transition: TRANSITION.normal,
                            '& fieldset': {
                                borderColor: isLight ? alpha(SLATE[900], 0.10) : DARK.border,
                                transition: TRANSITION.normal,
                            },
                            '&:hover fieldset': {
                                borderColor: isLight ? BLUE[300] : '#B4C5FF',
                            },
                            '&.Mui-focused': {
                                backgroundColor: isLight ? '#FFFFFF' : alpha(DARK.elevated, 1),
                                boxShadow: `0 0 0 3px ${isLight ? alpha(BLUE[600], 0.12) : alpha('#B4C5FF', 0.15)}`,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: isLight ? BLUE[600] : '#B4C5FF',
                                borderWidth: '1.5px',
                            },
                            '&.Mui-error fieldset': {
                                borderColor: isLight ? RED[500] : '#F87171',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: isLight ? SLATE[50] : alpha(DARK.elevated, 0.5),
                                '& fieldset': {
                                    borderColor: isLight ? SLATE[200] : DARK.border,
                                },
                            },
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: FONT_SIZE.sm,
                            color: isLight ? SLATE[500] : '#8D90A0',
                            '&.Mui-focused': {
                                color: isLight ? BLUE[600] : '#B4C5FF',
                            },
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: FONT_SIZE['2xs'],
                            marginTop: SPACING[1],
                        },
                    },
                },
            },

            MuiInputBase: {
                styleOverrides: {
                    input: {
                        '&::placeholder': {
                            color: isLight ? SLATE[400] : '#6B7194',
                            opacity: 1,
                        },
                    },
                },
            },

            // === Select ===
            MuiSelect: {
                styleOverrides: {
                    select: {
                        fontSize: FONT_SIZE.sm,
                        padding: `${SPACING[2]} ${SPACING[3]}`,
                    },
                },
            },

            // === Chip / Badge ===
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.md,
                        fontWeight: FONT_WEIGHT.medium,
                        fontSize: FONT_SIZE.xs,
                        height: '24px',
                        transition: TRANSITION.normal,
                    },
                    sizeSmall: {
                        height: '20px',
                        fontSize: FONT_SIZE['2xs'],
                    },
                    colorDefault: {
                        backgroundColor: isLight ? SLATE[100] : DARK.elevated,
                        color: isLight ? SLATE[700] : '#A8ABBC',
                    },
                    colorPrimary: {
                        backgroundColor: isLight ? BLUE[100] : alpha('#B4C5FF', 0.15),
                        color: isLight ? BLUE[700] : '#B4C5FF',
                    },
                    colorSecondary: {
                        backgroundColor: isLight ? TEAL[100] : alpha('#6BD8CB', 0.15),
                        color: isLight ? TEAL[700] : '#6BD8CB',
                    },
                    colorSuccess: {
                        backgroundColor: isLight ? EMERALD[50] : alpha('#34D399', 0.15),
                        color: isLight ? EMERALD[700] : '#34D399',
                    },
                    colorWarning: {
                        backgroundColor: isLight ? AMBER[50] : alpha('#FBBF24', 0.15),
                        color: isLight ? AMBER[700] : '#FBBF24',
                    },
                    colorError: {
                        backgroundColor: isLight ? RED[50] : alpha('#F87171', 0.15),
                        color: isLight ? RED[700] : '#F87171',
                    },
                },
            },

            MuiBadge: {
                styleOverrides: {
                    badge: {
                        fontSize: FONT_SIZE['2xs'],
                        fontWeight: FONT_WEIGHT.bold,
                        minWidth: '18px',
                        height: '18px',
                        padding: `0 ${SPACING[1]}`,
                    },
                },
            },

            // === Table ===
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.xl,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.07) : DARK.border}`,
                        boxShadow: 'none',
                    },
                },
            },

            MuiTable: {
                styleOverrides: {
                    root: { borderCollapse: 'separate', borderSpacing: 0 },
                },
            },

            MuiTableHead: {
                styleOverrides: {
                    root: {
                        '& .MuiTableCell-root': {
                            backgroundColor: isLight ? SLATE[50] : DARK.elevated,
                            color: isLight ? SLATE[600] : '#8D90A0',
                            fontWeight: FONT_WEIGHT.semibold,
                            fontSize: FONT_SIZE['2xs'],
                            letterSpacing: LETTER_SPACING.wider,
                            textTransform: 'uppercase',
                            borderBottom: `1px solid ${isLight ? SLATE[200] : DARK.border}`,
                            padding: `${SPACING[3]} ${SPACING[4]}`,
                        },
                    },
                },
            },

            MuiTableBody: {
                styleOverrides: {
                    root: {
                        '& .MuiTableRow-root': {
                            transition: TRANSITION.fast,
                            '&:hover': {
                                backgroundColor: isLight
                                    ? alpha(BLUE[600], 0.04)
                                    : alpha('#B4C5FF', 0.05),
                            },
                            '&:last-child .MuiTableCell-root': {
                                borderBottom: 'none',
                            },
                        },
                        '& .MuiTableCell-root': {
                            fontSize: FONT_SIZE.sm,
                            color: isLight ? SLATE[700] : '#C3C6D7',
                            borderBottom: `1px solid ${isLight ? SLATE[100] : alpha(DARK.border, 0.5)}`,
                            padding: `${SPACING[3]} ${SPACING[4]}`,
                        },
                    },
                },
            },

            // === Dialog / Modal ===
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: RADIUS['2xl'],
                        boxShadow: shadows['2xl'],
                        backgroundColor: isLight ? '#FFFFFF' : DARK.surface,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.08) : DARK.border}`,
                    },
                },
            },

            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        fontSize: FONT_SIZE.xl,
                        fontWeight: FONT_WEIGHT.semibold,
                        padding: `${SPACING[6]} ${SPACING[6]} ${SPACING[4]}`,
                        color: isLight ? SLATE[900] : '#DAE2FD',
                    },
                },
            },

            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        padding: `${SPACING[2]} ${SPACING[6]}`,
                        fontSize: FONT_SIZE.sm,
                    },
                },
            },

            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        padding: `${SPACING[4]} ${SPACING[6]} ${SPACING[6]}`,
                        gap: SPACING[2],
                    },
                },
            },

            // === Menu / Dropdown ===
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        borderRadius: RADIUS.lg,
                        boxShadow: shadows.lg,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.08) : DARK.border}`,
                        backgroundColor: isLight ? '#FFFFFF' : DARK.elevated,
                        backdropFilter: BLUR.lg,
                        minWidth: '180px',
                    },
                    list: {
                        padding: `${SPACING[1.5]} 0`,
                    },
                },
            },

            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontSize: FONT_SIZE.sm,
                        fontWeight: FONT_WEIGHT.regular,
                        padding: `${SPACING[2.5]} ${SPACING[4]}`,
                        borderRadius: RADIUS.md,
                        margin: `0 ${SPACING[1.5]}`,
                        color: isLight ? SLATE[700] : '#C3C6D7',
                        transition: TRANSITION.fast,
                        '&:hover': {
                            backgroundColor: isLight
                                ? alpha(BLUE[600], 0.06)
                                : alpha('#B4C5FF', 0.08),
                            color: isLight ? BLUE[700] : '#DAE2FD',
                        },
                        '&.Mui-selected': {
                            backgroundColor: isLight ? alpha(BLUE[600], 0.08) : alpha('#B4C5FF', 0.12),
                            color: isLight ? BLUE[700] : '#B4C5FF',
                            fontWeight: FONT_WEIGHT.medium,
                            '&:hover': {
                                backgroundColor: isLight ? alpha(BLUE[600], 0.12) : alpha('#B4C5FF', 0.16),
                            },
                        },
                    },
                },
            },

            // === Tooltip ===
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: isLight ? SLATE[900] : DARK.elevated,
                        color: isLight ? '#FFFFFF' : '#DAE2FD',
                        fontSize: FONT_SIZE['2xs'],
                        fontWeight: FONT_WEIGHT.medium,
                        borderRadius: RADIUS.md,
                        padding: `${SPACING[1.5]} ${SPACING[3]}`,
                        boxShadow: shadows.md,
                        border: `1px solid ${isLight ? 'transparent' : DARK.border}`,
                    },
                    arrow: {
                        color: isLight ? SLATE[900] : DARK.elevated,
                    },
                },
            },

            // === Tab ===
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: FONT_WEIGHT.medium,
                        fontSize: FONT_SIZE.sm,
                        minHeight: '44px',
                        padding: `${SPACING[2.5]} ${SPACING[4]}`,
                        borderRadius: RADIUS.md,
                        color: isLight ? SLATE[500] : '#8D90A0',
                        transition: TRANSITION.normal,
                        '&.Mui-selected': {
                            color: isLight ? BLUE[600] : '#B4C5FF',
                            fontWeight: FONT_WEIGHT.semibold,
                        },
                    },
                },
            },

            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: isLight ? BLUE[600] : '#B4C5FF',
                        height: '2px',
                        borderRadius: RADIUS.full,
                    },
                },
            },

            // === Divider ===
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: isLight ? alpha(SLATE[900], 0.08) : DARK.border,
                    },
                },
            },

            // === Breadcrumb ===
            MuiBreadcrumbs: {
                styleOverrides: {
                    separator: {
                        color: isLight ? SLATE[300] : '#374060',
                    },
                    ol: {
                        gap: SPACING[1],
                    },
                },
            },

            // === Pagination ===
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.md,
                        fontWeight: FONT_WEIGHT.medium,
                        fontSize: FONT_SIZE.sm,
                        transition: TRANSITION.fast,
                        '&.Mui-selected': {
                            backgroundColor: isLight ? BLUE[600] : '#B4C5FF',
                            color: isLight ? '#FFFFFF' : DARK.bg,
                            '&:hover': {
                                backgroundColor: isLight ? BLUE[700] : alpha('#B4C5FF', 0.85),
                            },
                        },
                    },
                },
            },

            // === Alert ===
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.lg,
                        fontSize: FONT_SIZE.sm,
                        fontWeight: FONT_WEIGHT.medium,
                        border: '1px solid transparent',
                    },
                    standardSuccess: {
                        backgroundColor: isLight ? EMERALD[50] : alpha('#34D399', 0.10),
                        color: isLight ? EMERALD[800] : '#34D399',
                        borderColor: isLight ? EMERALD[200] : alpha('#34D399', 0.20),
                        '& .MuiAlert-icon': { color: isLight ? EMERALD[500] : '#34D399' },
                    },
                    standardWarning: {
                        backgroundColor: isLight ? AMBER[50] : alpha('#FBBF24', 0.10),
                        color: isLight ? AMBER[800] : '#FBBF24',
                        borderColor: isLight ? AMBER[200] : alpha('#FBBF24', 0.20),
                        '& .MuiAlert-icon': { color: isLight ? AMBER[500] : '#FBBF24' },
                    },
                    standardError: {
                        backgroundColor: isLight ? RED[50] : alpha('#F87171', 0.10),
                        color: isLight ? RED[800] : '#F87171',
                        borderColor: isLight ? RED[200] : alpha('#F87171', 0.20),
                        '& .MuiAlert-icon': { color: isLight ? RED[500] : '#F87171' },
                    },
                    standardInfo: {
                        backgroundColor: isLight ? BLUE[50] : alpha('#93C5FD', 0.10),
                        color: isLight ? BLUE[800] : '#93C5FD',
                        borderColor: isLight ? BLUE[200] : alpha('#93C5FD', 0.20),
                        '& .MuiAlert-icon': { color: isLight ? BLUE[500] : '#93C5FD' },
                    },
                },
            },

            // === Skeleton loader ===
            MuiSkeleton: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight ? SLATE[200] : alpha(DARK.border, 0.6),
                        borderRadius: RADIUS.md,
                        '&::after': {
                            background: isLight
                                ? `linear-gradient(90deg, transparent, ${alpha('#FFFFFF', 0.6)}, transparent)`
                                : `linear-gradient(90deg, transparent, ${alpha('#B4C5FF', 0.06)}, transparent)`,
                        },
                    },
                },
            },

            // === Linear Progress ===
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.full,
                        backgroundColor: isLight ? SLATE[200] : DARK.elevated,
                        height: '6px',
                    },
                    bar: {
                        borderRadius: RADIUS.full,
                        background: GRADIENTS.primaryButton,
                    },
                },
            },

            // === Circular Progress ===
            MuiCircularProgress: {
                styleOverrides: {
                    root: {
                        color: isLight ? BLUE[600] : '#B4C5FF',
                    },
                },
            },

            // === Switch ===
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 24,
                        padding: 0,
                        '& .MuiSwitch-switchBase': {
                            padding: '2px',
                            transitionDuration: '0.2s',
                            '&.Mui-checked': {
                                transform: 'translateX(18px)',
                                color: '#FFFFFF',
                                '& + .MuiSwitch-track': {
                                    backgroundColor: isLight ? BLUE[600] : '#B4C5FF',
                                    opacity: 1,
                                    border: 0,
                                },
                            },
                        },
                        '& .MuiSwitch-thumb': {
                            width: 20,
                            height: 20,
                            boxShadow: shadows.sm,
                        },
                        '& .MuiSwitch-track': {
                            borderRadius: RADIUS.full,
                            backgroundColor: isLight ? SLATE[300] : DARK.border,
                            opacity: 1,
                        },
                    },
                },
            },

            // === Checkbox / Radio ===
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: isLight ? SLATE[400] : '#6B7194',
                        borderRadius: RADIUS.sm,
                        padding: SPACING[1],
                        '&.Mui-checked': {
                            color: isLight ? BLUE[600] : '#B4C5FF',
                        },
                        '&:hover': {
                            backgroundColor: isLight ? alpha(BLUE[600], 0.06) : alpha('#B4C5FF', 0.08),
                        },
                    },
                },
            },

            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: isLight ? SLATE[400] : '#6B7194',
                        padding: SPACING[1],
                        '&.Mui-checked': {
                            color: isLight ? BLUE[600] : '#B4C5FF',
                        },
                    },
                },
            },

            // === Slider ===
            MuiSlider: {
                styleOverrides: {
                    root: {
                        color: isLight ? BLUE[600] : '#B4C5FF',
                    },
                    track: {
                        background: GRADIENTS.primaryButton,
                        border: 'none',
                    },
                    rail: {
                        backgroundColor: isLight ? SLATE[200] : DARK.elevated,
                        opacity: 1,
                    },
                    thumb: {
                        backgroundColor: '#FFFFFF',
                        boxShadow: shadows.sm,
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0 0 0 8px ${isLight ? alpha(BLUE[600], 0.16) : alpha('#B4C5FF', 0.20)}`,
                        },
                    },
                    valueLabel: {
                        backgroundColor: isLight ? SLATE[900] : DARK.elevated,
                        borderRadius: RADIUS.md,
                        fontSize: FONT_SIZE.xs,
                    },
                },
            },

            // === Avatar ===
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        background: GRADIENTS.primaryButton,
                        color: '#FFFFFF',
                        fontWeight: FONT_WEIGHT.semibold,
                        fontSize: FONT_SIZE.sm,
                        boxShadow: shadows.sm,
                    },
                    colorDefault: {
                        background: GRADIENTS.primaryButton,
                        color: '#FFFFFF',
                    },
                },
            },

            MuiAvatarGroup: {
                styleOverrides: {
                    avatar: {
                        border: `2px solid ${isLight ? '#FFFFFF' : DARK.surface}`,
                    },
                },
            },

            // === List ===
            MuiListItem: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.md,
                        marginBottom: SPACING[0.5],
                    },
                },
            },

            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.md,
                        transition: TRANSITION.fast,
                        '&:hover': {
                            backgroundColor: isLight ? alpha(BLUE[600], 0.06) : alpha('#B4C5FF', 0.08),
                        },
                        '&.Mui-selected': {
                            backgroundColor: isLight ? alpha(BLUE[600], 0.10) : alpha('#B4C5FF', 0.12),
                            '&:hover': {
                                backgroundColor: isLight ? alpha(BLUE[600], 0.14) : alpha('#B4C5FF', 0.16),
                            },
                        },
                    },
                },
            },

            MuiListItemText: {
                styleOverrides: {
                    primary: {
                        fontSize: FONT_SIZE.sm,
                        fontWeight: FONT_WEIGHT.medium,
                        color: isLight ? SLATE[800] : '#C3C6D7',
                    },
                    secondary: {
                        fontSize: FONT_SIZE.xs,
                        color: isLight ? SLATE[500] : '#8D90A0',
                    },
                },
            },

            // === AppBar / Toolbar ===
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        backgroundColor: isLight
                            ? alpha('#FFFFFF', 0.90)
                            : alpha(DARK.surface, 0.90),
                        backdropFilter: BLUR.xl,
                        boxShadow: isLight
                            ? `0 1px 0 ${alpha(SLATE[900], 0.08)}`
                            : `0 1px 0 ${DARK.border}`,
                        color: isLight ? SLATE[900] : '#DAE2FD',
                    },
                },
            },

            // === Drawer / Sidebar ===
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isLight ? '#FFFFFF' : DARK.surface,
                        backgroundImage: 'none',
                        borderRight: `1px solid ${isLight ? alpha(SLATE[900], 0.08) : DARK.border}`,
                        boxShadow: 'none',
                    },
                },
            },

            // === Stepper ===
            MuiStepLabel: {
                styleOverrides: {
                    label: {
                        fontSize: FONT_SIZE.sm,
                        color: isLight ? SLATE[500] : '#8D90A0',
                        '&.Mui-active': {
                            color: isLight ? BLUE[600] : '#B4C5FF',
                            fontWeight: FONT_WEIGHT.semibold,
                        },
                        '&.Mui-completed': {
                            color: isLight ? EMERALD[600] : '#34D399',
                        },
                    },
                },
            },

            // === Accordion ===
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        borderRadius: RADIUS.lg,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.07) : DARK.border}`,
                        boxShadow: 'none',
                        backgroundColor: isLight ? '#FFFFFF' : DARK.surface,
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': {
                            boxShadow: shadows.sm,
                        },
                    },
                },
            },

            // === Autocomplete ===
            MuiAutocomplete: {
                styleOverrides: {
                    paper: {
                        borderRadius: RADIUS.lg,
                        boxShadow: shadows.lg,
                        border: `1px solid ${isLight ? alpha(SLATE[900], 0.08) : DARK.border}`,
                        backgroundColor: isLight ? '#FFFFFF' : DARK.elevated,
                    },
                    listbox: {
                        padding: `${SPACING[1.5]} 0`,
                    },
                    option: {
                        fontSize: FONT_SIZE.sm,
                        borderRadius: RADIUS.md,
                        margin: `0 ${SPACING[1.5]}`,
                        '&[aria-selected="true"]': {
                            backgroundColor: `${isLight ? alpha(BLUE[600], 0.08) : alpha('#B4C5FF', 0.12)} !important`,
                            color: isLight ? BLUE[700] : '#B4C5FF',
                        },
                        '&:hover': {
                            backgroundColor: isLight ? alpha(BLUE[600], 0.06) : alpha('#B4C5FF', 0.08),
                        },
                    },
                    noOptions: {
                        fontSize: FONT_SIZE.sm,
                        color: isLight ? SLATE[500] : '#8D90A0',
                    },
                    endAdornment: {
                        color: isLight ? SLATE[400] : '#6B7194',
                    },
                },
            },

            // === Date / Time Picker ===
            // ⚠️ MuiPickersDay thuộc package @mui/x-date-pickers, không phải @mui/material.
            // Override ở file riêng khi setup LocalizationProvider:
            //
            // import { DatePicker } from '@mui/x-date-pickers';
            // Tạo thêm file src/style/pickerTheme.ts và dùng:
            //   MuiPickersDay: {
            //     styleOverrides: {
            //       root: { borderRadius: RADIUS.md, ... },
            //       today: { border: `1.5px solid ${BLUE[400]}` },
            //     },
            //   }
            // rồi merge vào theme bằng createTheme(baseTheme, pickerOverrides)

            // === Snackbar / Toast ===
            MuiSnackbar: {
                defaultProps: {
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                },
            },

            MuiSnackbarContent: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight ? SLATE[900] : DARK.elevated,
                        color: isLight ? '#FFFFFF' : '#DAE2FD',
                        borderRadius: RADIUS.lg,
                        boxShadow: shadows.xl,
                        fontSize: FONT_SIZE.sm,
                        fontWeight: FONT_WEIGHT.medium,
                        border: `1px solid ${isLight ? 'transparent' : DARK.border}`,
                    },
                },
            },

            // === DataGrid (MUI X) ===
            // ⚠️ MuiDataGrid thuộc @mui/x-data-grid — không override được trong createTheme của @mui/material.
            // Dùng hàm getDataGridSx(mode) được export ở cuối file, truyền qua prop sx:
            //
            //   import { DataGrid } from '@mui/x-data-grid';
            //   import { getDataGridSx } from '@/style/theme';
            //
            //   <DataGrid sx={getDataGridSx('light')} ... />

            // === FormControl ===
            MuiFormControlLabel: {
                styleOverrides: {
                    label: {
                        fontSize: FONT_SIZE.sm,
                        color: isLight ? SLATE[700] : '#C3C6D7',
                    },
                },
            },

            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        fontSize: FONT_SIZE['2xs'],
                        marginTop: SPACING[1],
                        color: isLight ? SLATE[500] : '#8D90A0',
                        '&.Mui-error': {
                            color: isLight ? RED[600] : '#F87171',
                        },
                    },
                },
            },

            // === CssBaseline — global styles ──
            MuiCssBaseline: {
                styleOverrides: {
                    '*, *::before, *::after': {
                        boxSizing: 'border-box',
                    },
                    html: {
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        scrollBehavior: 'smooth',
                    },
                    body: {
                        backgroundColor: isLight ? SLATE[50] : DARK.bg,
                        color: isLight ? SLATE[900] : '#DAE2FD',
                        fontSize: FONT_SIZE.sm,
                        lineHeight: LINE_HEIGHT.normal,
                    },
                    // Scrollbar (webkit)
                    '::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                    },
                    '::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: isLight ? SLATE[300] : DARK.border,
                        borderRadius: RADIUS.full,
                        '&:hover': {
                            backgroundColor: isLight ? SLATE[400] : '#374060',
                        },
                    },
                    // Focus visible ring
                    '.focus-ring': {
                        outline: `2px solid ${isLight ? BLUE[600] : '#B4C5FF'}`,
                        outlineOffset: '2px',
                    },
                    // Selection color
                    '::selection': {
                        backgroundColor: isLight ? alpha(BLUE[600], 0.20) : alpha('#B4C5FF', 0.25),
                        color: isLight ? BLUE[900] : '#DAE2FD',
                    },
                },
            },
        },
    };

    return createTheme(themeConfig);
};

// ============================================================
// EXPORTS
// ============================================================

/** Theme instances — dùng trong ThemeProvider */
export const lightTheme = getAppTheme('light');
export const darkTheme  = getAppTheme('dark');

/** Default export — light mode */
export const theme = lightTheme;

/**
 * LCMS Design Tokens — tất cả đã được export trực tiếp tại chỗ khai báo (export const ...)
 * FE import như sau:
 *
 * import { GRADIENTS, SHADOWS, BLUR, SPACING, RADIUS,
 *          FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT, LETTER_SPACING,
 *          TRANSITION, Z_INDEX, OPACITY, BREAKPOINTS,
 *          BLUE, TEAL, VIOLET, AMBER, EMERALD, RED, ORANGE, PINK, SLATE, DARK,
 *          lightTheme, darkTheme, theme } from '@/style/theme';
 */

// ============================================================
// MUI X OVERRIDES — dùng riêng cho các package @mui/x-*
// Không thể đưa vào createTheme vì TypeScript sẽ báo lỗi.
// ============================================================

/**
 * DataGrid sx override — truyền qua prop sx của <DataGrid />
 *
 * Cách dùng:
 *   import { getDataGridSx } from '@/style/theme';
 *   <DataGrid sx={getDataGridSx('light')} ... />
 *
 * Hoặc merge vào theme x-data-grid nếu dùng ThemeProvider riêng:
 *   import { createTheme } from '@mui/material/styles';
 *   import { getDataGridSx } from '@/style/theme';
 *   const dataGridTheme = createTheme({ components: { MuiDataGrid: { styleOverrides: { root: getDataGridSx('light') } } } });
 */
export const getDataGridSx = (mode: 'light' | 'dark') => {
    const isLight = mode === 'light';
    return {
        border: `1px solid ${isLight ? alpha(SLATE[900], 0.07) : DARK.border}`,
        borderRadius: RADIUS.xl,
        backgroundColor: isLight ? '#FFFFFF' : DARK.surface,
        fontFamily: '"Inter", system-ui, sans-serif',

        // Column header
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: isLight ? SLATE[50] : DARK.elevated,
            borderBottom: `1px solid ${isLight ? SLATE[200] : DARK.border}`,
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: FONT_WEIGHT.semibold,
            fontSize: FONT_SIZE['2xs'],
            letterSpacing: LETTER_SPACING.wider,
            textTransform: 'uppercase',
            color: isLight ? SLATE[500] : '#8D90A0',
        },
        '& .MuiDataGrid-columnSeparator': {
            color: isLight ? SLATE[200] : DARK.border,
        },

        // Rows
        '& .MuiDataGrid-row:hover': {
            backgroundColor: isLight ? alpha(BLUE[600], 0.04) : alpha('#B4C5FF', 0.05),
        },
        '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: isLight ? alpha(BLUE[600], 0.08) : alpha('#B4C5FF', 0.10),
            '&:hover': {
                backgroundColor: isLight ? alpha(BLUE[600], 0.11) : alpha('#B4C5FF', 0.13),
            },
        },

        // Cells
        '& .MuiDataGrid-cell': {
            fontSize: FONT_SIZE.sm,
            color: isLight ? SLATE[700] : '#C3C6D7',
            borderBottom: `1px solid ${isLight ? SLATE[100] : alpha(DARK.border, 0.5)}`,
            '&:focus, &:focus-within': {
                outline: `2px solid ${isLight ? BLUE[600] : '#B4C5FF'}`,
                outlineOffset: '-2px',
            },
        },

        // Footer
        '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${isLight ? SLATE[200] : DARK.border}`,
            backgroundColor: isLight ? SLATE[50] : DARK.elevated,
        },
        '& .MuiDataGrid-selectedRowCount': {
            fontSize: FONT_SIZE.xs,
            color: isLight ? SLATE[500] : '#8D90A0',
        },

        // Pagination
        '& .MuiTablePagination-root': {
            fontSize: FONT_SIZE.xs,
            color: isLight ? SLATE[600] : '#A8ABBC',
        },

        // Checkbox
        '& .MuiCheckbox-root': {
            color: isLight ? SLATE[400] : '#6B7194',
            '&.Mui-checked': {
                color: isLight ? BLUE[600] : '#B4C5FF',
            },
        },

        // No rows overlay
        '& .MuiDataGrid-overlay': {
            backgroundColor: isLight ? alpha('#FFFFFF', 0.9) : alpha(DARK.surface, 0.9),
            fontSize: FONT_SIZE.sm,
            color: isLight ? SLATE[500] : '#8D90A0',
        },
    } as const;
};
