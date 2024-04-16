export default function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.732 1M11 21h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
      />
    </svg>
  );
}
