import Link from "next/link";

export default function Header() {
  return (
    <header className="h-(--header-height) border-b border-default bg-default">
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold text-strong">
          Ecommerce
        </Link>

        <nav aria-label="Nawigacja główna">
          <ul className="flex items-center gap-6 text-sm text-muted">
            <li>
              <Link href="/">Strona główna</Link>
            </li>
            <li>
              <Link href="/design-system">Design system</Link>
            </li>
          </ul>
        </nav>

        <div></div>
      </div>
    </header>
  );
}
