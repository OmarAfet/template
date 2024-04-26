import React from "react";

export default function TemplateMark({
  size = 32,
}: Readonly<{ size?: number }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Template logomark"
      height={size}
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M0 12 18 1.5v21L0 12Z" />
      <path d="M24 12 6 1.5v21L24 12Z" />
      <path d="m12 0 10.5 18h-21L12 0Z" />
    </svg>
  );
}
