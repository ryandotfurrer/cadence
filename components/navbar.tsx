import { AudioWaveform } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "./ui/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between pt-4 pb-8">
      <div>
        <Button asChild variant={"ghost"}>
          <Link
            href="/"
            className="font-cal group flex items-center gap-2 text-2xl !no-underline"
          >
            <AudioWaveform className="size-6 transition-colors group-hover:text-orange-500" />
            Cadence
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Button asChild variant={"ghost"}>
          <Link href="/pricing" className="!no-underline">
            Pricing
          </Link>
        </Button>

        <Button asChild variant={"ghost"}>
          <Link href="#" className="!no-underline">
            About
          </Link>
        </Button>

        <Button asChild variant={"ghost"}>
          <Link href="#" className="!no-underline">
            Contact
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export { Navbar };
