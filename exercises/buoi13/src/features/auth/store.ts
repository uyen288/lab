import { create } from "zustand";

interface AuthState {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Tài khoản GIẢ LẬP để dạy bài; đồ án thật phải xác thực qua API.
const MOCK_ADMIN = { username: "admin", password: "hue2026" };

export const useAuth = create<AuthState>()((set) => ({
  isAdmin: false,
  login: (username, password) => {
    const ok = username === MOCK_ADMIN.username && password === MOCK_ADMIN.password;
    if (ok) set({ isAdmin: true });
    return ok;
  },
  logout: () => set({ isAdmin: false }),
}));
