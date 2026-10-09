import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "../app/routes";
import { useAuth } from "../features/auth/store";

// ===== SPEC DẠNG DỮ LIỆU: mỗi dòng ứng với một dòng của docs/ROUTES.md =====
// heading: tiêu đề mà trang đó phải hiển thị (đưa luôn vào prompt cho AI).
// Ví dụ dưới đây là của ứng dụng đặt vé di tích; nhóm thay bằng đề tài của mình.
const PAGES = [
  { name: "trang chủ", path: "/", heading: "Di tích Huế" },
  { name: "tuyến động, id hợp lệ", path: "/attractions/1", heading: "Đại Nội Huế" },
  { name: "tuyến động, id không tồn tại", path: "/attractions/999", heading: "Không tìm thấy di tích" },
  { name: "đường dẫn lạ", path: "/khong-co-trang-nay", heading: "404 – Không tìm thấy trang" },
];

// Tuyến được bảo vệ: chưa đăng nhập thì phải bị chuyển sang redirectTo.
const PROTECTED = [{ path: "/admin", redirectTo: "/admin/login" }];

function open(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

// Nếu store đăng nhập của nhóm khác, đổi dòng này cho khớp.
beforeEach(() => useAuth.setState({ isAdmin: false }));

describe("Khung tuyến của nhóm", () => {
  it.each(PAGES)("$name: $path hiển thị \"$heading\"", ({ path, heading }) => {
    open(path);
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  });

  it.each(PROTECTED)("$path chưa đăng nhập bị chuyển sang $redirectTo", ({ path, redirectTo }) => {
    const router = open(path);
    expect(router.state.location.pathname).toBe(redirectTo);
  });
});
