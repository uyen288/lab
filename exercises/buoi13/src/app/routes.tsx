import { Navigate, type RouteObject } from "react-router";
import { RootLayout } from "./RootLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "./AdminLayout";
import { HomePage } from "../pages/HomePage";
import { AttractionDetailPage } from "../pages/AttractionDetailPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { MyBookingsPage } from "../pages/MyBookingsPage";
import { AdminLoginPage } from "../pages/AdminLoginPage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { AdminBookingsPage } from "../pages/AdminBookingsPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "attractions",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          { path: "/:id", element: <AttractionDetailPage /> },
        ],
      },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "my-bookings", element: <MyBookingsPage /> },
      { path: "admin/login", element: <AdminLoginPage /> },
      {
        // Tuyến không có path: chỉ để bọc bảo vệ cho các tuyến con
        element: <ProtectedRoute />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboardPage /> },
              { path: "bookings", element: <AdminBookingsPage /> },
            ],
          },
        ],
      },
    ],
  },
];
