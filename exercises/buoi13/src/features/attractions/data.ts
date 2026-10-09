import type { Attraction } from "./types";

// Dữ liệu giả lập — Buổi 17 sẽ thay bằng lời gọi API.
export const ATTRACTIONS: Attraction[] = [
  { id: 1, name: "Đại Nội Huế", summary: "Hoàng thành triều Nguyễn bên bờ sông Hương.", price: 200000, openingHours: "07:00-17:30" },
  { id: 2, name: "Lăng Khải Định", summary: "Công trình pha trộn kiến trúc Đông – Tây.", price: 150000, openingHours: "07:00-17:00" },
  { id: 3, name: "Lăng Tự Đức", summary: "Khu lăng tẩm gắn với hồ Lưu Khiêm.", price: 150000, openingHours: "07:00-17:00" },
  { id: 4, name: "Chùa Thiên Mụ", summary: "Ngôi chùa cổ trên đồi Hà Khê.", price: 0, openingHours: "06:00-18:00" },
];
