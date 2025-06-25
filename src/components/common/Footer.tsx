import Link from "@/components/common/Link";
import Logo from "@/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t p-6">
      <div className="@container/footer">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <p className="text-muted-foreground">
              A brief description about your company or website.
            </p>
          </div>
          
          <div className="grid grid-cols-1 @xl/footer:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 *:text-muted-foreground *:hover:text-foreground *:transition-colors *:w-fit">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 *:text-muted-foreground *:hover:text-foreground *:transition-colors *:w-fit">
                <li><Link href="https://github.com/OmarAfet" target="_blank" rel="noopener noreferrer">Github</Link></li>
                <li><Link href="https://x.com/OmarAfet" target="_blank" rel="noopener noreferrer">X (Twitter)</Link></li>
                <li><Link href="https://www.linkedin.com/in/omarafet/" target="_blank" rel="noopener noreferrer">Linkedin</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t mt-6 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
