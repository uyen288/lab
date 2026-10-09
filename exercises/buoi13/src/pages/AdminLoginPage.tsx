import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../features/auth/store";

function readFrom(state: unknown): string {
  if (typeof state === "object" && state !== null && "from" in state) {
    const value = (state as { from: unknown }).from;
    if (typeof value === "string") return value;
  }
  return "/admin";
}

export function AdminLoginPage() {
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(username, password)) {
      navigate(readFrom(location.state), { replace: true });
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Đăng nhập quản trị</h1>
      <label>
        Tên đăng nhập
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Mật khẩu
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
