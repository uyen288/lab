import { NavLink } from "react-router";

export function RootLayout() {
  return (
    <div>
      <header>
        <nav aria-label="Điều hướng chính">
          <NavLink to="/" end>Trang chủ</NavLink>{" "}
          <NavLink to="/my-bookings">Vé của tôi</NavLink>{" "}
          <NavLink to="/admin">Quản trị</NavLink>
        </nav>
      </header>
      <main>
      </main>
    </div>
  );
}
