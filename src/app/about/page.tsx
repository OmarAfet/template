import Link from "next/link";

export default function About() {
  return (
    <div className="px-8">
      <h1>About This Template</h1>

      <p>
        Hello there! Welcome to the About page for the Next.js template crafted
        by{" "}
        <Link className="link" href="https://github.com/OmarAfet">
          @OmarAfet
        </Link>
        . This template is meticulously designed to provide you with a solid
        foundation for building modern and responsive web applications using
        cutting-edge technologies.
      </p>

      <h2>Technologies Used</h2>
      <ul>
        <li>
          <Link className="link" href="https://nextjs.org">
            NextJS
          </Link>{" "}
          - The React Framework for the Web
        </li>
        <li>
          <Link className="link" href="https://tailwindcss.com/">
            TailwindCSS
          </Link>{" "}
          - A utility-first CSS framework packed with classes like{" "}
          <code>flex</code>, <code>pt-4</code>, <code>text-center</code> and{" "}
          <code>rotate-90</code> that can be composed to build any design,
          directly in your markup.
        </li>
        <li>
          <Link className="link" href="https://ui.shadcn.com/">
            Shadcn UI
          </Link>{" "}
          - Beautifully designed components that you can copy and paste into
          your apps. Accessible. Customizable. Open Source.
        </li>
      </ul>

      <h2>Features</h2>
      <ul>
        <li>Responsive design for various screen sizes and devices.</li>
        <li>Optimized performance with Next.js server-side rendering.</li>
        <li>Beautifully crafted UI components using Shadcn UI.</li>
      </ul>

      <p>
        That&apos;s it! You&apos;re ready to start building your awesome web
        application with this template. If you have any questions or feedback,
        feel free to reach out to{" "}
        <Link className="link" href="https://github.com/OmarAfet">
          @OmarAfet
        </Link>{" "}
        on GitHub.
      </p>
    </div>
  );
}
