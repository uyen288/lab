import { NavLink, Outlet } from "react-router";
import { useAuth } from "../features/auth/store";

export function AdminLayout() {
  const logout = useAuth((s) => s.logout);
  return (
    <div>
      <h1>Khu vực quản trị</h1>
      <nav aria-label="Điều hướng quản trị">
        <NavLink to="/admin" end>Tổng quan</NavLink>{" "}
        <NavLink to="bookings">Đặt vé</NavLink>
      </nav>
      <button onClick={logout}>Đăng xuất</button>
      <Outlet />
    </div>
  );
}
