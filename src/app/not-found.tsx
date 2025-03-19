import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "@/components/common/Link";


export default function notFound() {
  return (
    <div className="center h-full w-full flex-col gap-8 text-2xl">
      <div className="center gap-4 text-2xl">
        <h1 className="text-red-500 font-bold text-4xl">404</h1>
        <Separator className="h-12" orientation="vertical" />
        <h4>Page Not Found.</h4>
      </div>
      <div>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
