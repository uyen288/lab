import { Link, useSearchParams } from "react-router";
import { ATTRACTIONS } from "../features/attractions/data";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const list = ATTRACTIONS.filter((a) =>
    a.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <section>
      <h1>Di tích Huế</h1>
      <input
        aria-label="Tìm di tích"
        value={q}
        onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
      />
      <ul>
        {list.map((a) => (
          <li key={a.id}>
            <Link to={`/attractions/${a.id}`}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
