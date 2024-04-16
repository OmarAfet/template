import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex whitespace-pre border-t p-4 text-xs text-muted-foreground">
      &copy; {year}{" "}
      <Link className="link" href="https://github.com/OmarAfet">
        @OmarAfet
      </Link>
    </footer>
  );
}
