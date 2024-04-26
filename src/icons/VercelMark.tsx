export default function Vercel({ size = 32 }: Readonly<{ size?: number }>) {
  return (
    <svg
      className="fill-foreground"
      aria-label="Vercel logomark"
      height={size}
      role="img"
      viewBox="0 0 74 64"
      fill="currentcolor"
    >
      <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"></path>
    </svg>
  );
}
