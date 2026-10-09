import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../features/auth/store";

export function ProtectedRoute() {
  const isAdmin = useAuth((s) => s.isAdmin);
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }
  return <Outlet />;
}
