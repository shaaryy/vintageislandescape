
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Vintage Island Escape</h1>
      <p>Thulusdhoo Island Tours</p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/booking">Booking</Link>
        <Link href="/admin/login">Admin</Link>
      </div>
    </main>
  );
}
