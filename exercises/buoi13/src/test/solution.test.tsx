import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "../app/routes";
import { useAuth } from "../features/auth/store";

function setup(path: string, state?: unknown) {
  const router = createMemoryRouter(routes, {
    initialEntries: [state ? { pathname: path, state } : path],
  });
  render(<RouterProvider router={router} />);
  return router;
}

beforeEach(() => useAuth.setState({ isAdmin: false }));

describe("Buổi 13 — lời giải", () => {
  it("T1 trang chủ liệt kê 4 di tích", () => {
    setup("/");
    expect(screen.getAllByRole("link", { name: /Đại Nội|Lăng|Chùa/ })).toHaveLength(4);
  });
  it("T2 bấm di tích sang /attractions/1", async () => {
    const router = setup("/");
    await userEvent.click(screen.getByRole("link", { name: "Đại Nội Huế" }));
    expect(router.state.location.pathname).toBe("/attractions/1");
    expect(screen.getByText(/Giá vé: 200\.000/)).toBeInTheDocument();
  });
  it("T3 id không tồn tại hiện thông báo", () => {
    setup("/attractions/999");
    expect(screen.getByText("Không tìm thấy di tích")).toBeInTheDocument();
  });
  it("T4 đường dẫn lạ hiện 404", () => {
    setup("/khong-co-trang-nay");
    expect(
      screen.getByRole("heading", { name: "404 – Không tìm thấy trang" }),
    ).toBeInTheDocument();
  });
  it("T5 /admin khi chưa đăng nhập bị chuyển sang /admin/login", () => {
    const router = setup("/admin");
    expect(router.state.location.pathname).toBe("/admin/login");
  });
  it("T6 đăng nhập đúng quay lại /admin/bookings", async () => {
    const router = setup("/admin/bookings");
    await userEvent.type(screen.getByLabelText("Tên đăng nhập"), "admin");
    await userEvent.type(screen.getByLabelText("Mật khẩu"), "hue2026");
    await userEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));
    expect(router.state.location.pathname).toBe("/admin/bookings");
    expect(screen.getByText("Danh sách đặt vé")).toBeInTheDocument();
  });
  it("T7 đăng nhập sai hiện lỗi, vẫn ở trang login", async () => {
    const router = setup("/admin/login");
    await userEvent.type(screen.getByLabelText("Tên đăng nhập"), "x");
    await userEvent.type(screen.getByLabelText("Mật khẩu"), "y");
    await userEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Sai tên đăng nhập");
    expect(router.state.location.pathname).toBe("/admin/login");
  });
  it("T8 vào thẳng /checkout bị đẩy về trang chủ", () => {
    const router = setup("/checkout");
    expect(router.state.location.pathname).toBe("/");
  });
  it("T9 Đặt vé -> /checkout có tên di tích", async () => {
    const router = setup("/attractions/4");
    await userEvent.click(screen.getByRole("button", { name: "Đặt vé" }));
    expect(router.state.location.pathname).toBe("/checkout");
    expect(screen.getByText(/Chùa Thiên Mụ/)).toBeInTheDocument();
  });
  it("T10 ô tìm kiếm ghi vào ?q=", async () => {
    const router = setup("/");
    await userEvent.type(screen.getByLabelText("Tìm di tích"), "chùa");
    expect(router.state.location.search).toBe("?q=ch%C3%B9a");
    expect(screen.getAllByRole("link", { name: /Chùa/ })).toHaveLength(1);
  });
  it("T11 NavLink của trang đang xem có aria-current", () => {
    setup("/my-bookings");
    expect(screen.getByRole("link", { name: "Vé của tôi" })).toHaveAttribute("aria-current", "page");
  });
  it("T12 /attractions (không id) quay về /", () => {
    const router = setup("/attractions");
    expect(router.state.location.pathname).toBe("/");
  });
});
