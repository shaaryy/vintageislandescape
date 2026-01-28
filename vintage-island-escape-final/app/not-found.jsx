
import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Page not found</h1>
      <Link href="/">Go home</Link>
    </main>
  );
}
