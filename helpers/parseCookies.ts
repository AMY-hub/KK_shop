export const parseCookies = (header: string): Record<string, string> => {
    const entries = header.split(' ').map(c => c.replace(';', '').split('='));
    return Object.fromEntries(entries) as Record<string, string>;
};
