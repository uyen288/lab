import { Link, useNavigate, useParams } from "react-router";
import { ATTRACTIONS } from "../features/attractions/data";

export function AttractionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const attraction = ATTRACTIONS.find((a) => a.id === id);

  if (!attraction) {
    return (
      <section>
        <h1>Không tìm thấy di tích</h1>
        <Link to="/">Về trang chủ</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{attraction.name}</h1>
      <p>{attraction.summary}</p>
      <p>Giờ mở cửa: {attraction.openingHours}</p>
      <p>Giá vé: {attraction.price.toLocaleString("vi-VN")} đ</p>
      <button onClick={() => navigate("/checkout", { state: { attractionId: attraction.id } })}>
        Đặt vé
      </button>
    </section>
  );
}
