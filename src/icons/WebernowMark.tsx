export default function WebernowMark({
  className,
  size = 32,
}: Readonly<{ className?: string; size?: number }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      fill="currentColor"
      viewBox="0 0 24 18"
      className={className}
    >
      <path d="m8.571 6.857 1.715-3.428L12 0l1.714 3.429 1.715 3.428 1.714 3.429 1.714-3.429 1.714-3.428L22.286 0 24 3.429l-1.714 3.428-1.715 3.429-1.714 3.428-1.714 3.429-1.714-3.429-1.715-3.428L12 6.857l-1.714 3.429-1.715 3.428-1.714 3.429-1.714-3.429-1.714-3.428-1.715-3.429L0 3.43 1.714 0 3.43 3.429l1.714 3.428 1.714 3.429 1.714-3.429Z" />
      <path d="M6.857 3.429 8.571 0H5.143l1.714 3.429Zm10.286 0L15.429 0h3.428l-1.714 3.429ZM12 13.714l1.714 3.429h-3.428L12 13.714Z" />
    </svg>
  );
}
