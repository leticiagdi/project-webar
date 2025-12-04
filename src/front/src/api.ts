// Define qual URL usar automaticamente
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// (Opcional) Uma funçãozinha para facilitar ainda mais
export const getApiUrl = (path: string) => {
    return `${API_URL}${path}`;
};
