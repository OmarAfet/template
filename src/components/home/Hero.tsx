import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="center flex-col space-y-8">
      <div className="center flex-col space-y-4">
        <h1>Welcome to Template</h1>
        <p className="text-muted-foreground">
          A NextJS Template Made by{" "}
          <Link
            target="_blank"
            className="link"
            href={"https://github.com/OmarAfet"}
          >
            @OmarAfet
          </Link>
        </p>
      </div>
      <div className="flex gap-4">
        <Link className={buttonVariants({ variant: "default" })} href="/">
          Get Started
        </Link>
        <Link className={buttonVariants({ variant: "outline" })} href="/about">
          Read More
        </Link>
      </div>
    </div>
  );
}
