// Define qual URL usar automaticamente
export const API_URL = 'https://project-webar.onrender.com';

// (Opcional) Uma funçãozinha para facilitar ainda mais
export const getApiUrl = (path: string) => {
    return `${API_URL}${path}`;
};
