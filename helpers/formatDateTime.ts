type FormatDateTime = (
    time: number | string,
    param?: 'date' | 'time',
    locale?: string,) => string;

export const formatDateTime: FormatDateTime = (time, param, locale = 'ru-RU') => {
    const date = new Date(time);
    switch (param) {
        case 'date':
            return date.toLocaleDateString(locale);
        case 'time':
            return date.toLocaleTimeString(locale);
        default:
            return date.toLocaleString(locale);
    }
};