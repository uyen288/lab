import { Navigate, useLocation, useNavigate } from "react-router";
import { ATTRACTIONS } from "../features/attractions/data";

function readAttractionId(state: unknown): number | null {
  if (typeof state === "object" && state !== null && "attractionId" in state) {
    const value = (state as { attractionId: unknown }).attractionId;
    return typeof value === "number" ? value : null;
  }
  return null;
}

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const attractionId = readAttractionId(location.state);
  const attraction = ATTRACTIONS.find((a) => a.id === attractionId);

  // Vào thẳng /checkout (không qua trang chi tiết) thì không có gì để thanh toán.
  if (!attraction) return <Navigate to="/" replace />;

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>Bạn đang đặt vé: {attraction.name}</p>
      <button onClick={() => navigate("/my-bookings", { replace: true })}>
        Xác nhận thanh toán
      </button>
    </section>
  );
}
