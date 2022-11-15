class TokenService {

    getAccessToken(): string {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            return token ? token : '';
        } else {
            return '';
        }
    }

    setAccessToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', token);
        }
    }

    removeAccessToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
        }
    }
}

export default new TokenService();