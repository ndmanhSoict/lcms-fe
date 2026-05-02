type ApiErrorShape = { response?: { data?: { message?: string } } };

export function getApiError(err: unknown, fallback = 'Có lỗi xảy ra, vui lòng thử lại.'): string {
    const shaped = err as ApiErrorShape;
    return shaped?.response?.data?.message ?? fallback;
}
