import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    username: string;
    id: string;
  };
  setAuthenticated: (value: boolean, token: string, user: { username: string; id: string }) => void;
  clearAuthState: () => void;
}

const useAuthStore = create<AuthStore>((set) => {
  // Obtener datos almacenados en la cookie
  const storedIsAuthenticated = Cookies.get('isAuthenticated') === 'true';
  const storedToken = Cookies.get('token') || null;
  const storeduserString = Cookies.get('user');
  const storeduser = storeduserString ? JSON.parse(storeduserString) : { username: '', id: '' };

  const initialState: AuthStore = {
    isAuthenticated: storedIsAuthenticated,
    token: storedToken,
    user: storeduser,
    setAuthenticated: (value, token, user) => {
      set({ isAuthenticated: value, token, user });
      Cookies.set('isAuthenticated', value.toString());
      if (value && token) {
        Cookies.set('token', token);
      } else {
        Cookies.remove('token');
      }
      if (user) {
        Cookies.set('user', JSON.stringify(user));
      } else {
        Cookies.remove('user');
      }
    },
    clearAuthState: () => {
      set({ isAuthenticated: false, token: null, user: { username: '', id: '' } });
      Cookies.remove('isAuthenticated');
      Cookies.remove('token');
      Cookies.remove('user');
    },
  };

  return initialState;
});

export default useAuthStore;
