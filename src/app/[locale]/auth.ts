// src/app/auth.ts

export const isLoggedIn = (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  };
  
  export const login = (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  };
  
  export const logout = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  };
  