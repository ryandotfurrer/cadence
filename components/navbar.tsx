import { SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { AudioWaveform } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Link } from "./ui/link";

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between pt-4 pb-8 px-4">
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
      <Authenticated>
        <div className="flex gap-2 md:order-last">
        <Button asChild variant={"outline"}>
          <SignOutButton />
        </Button>
          <Button asChild >
            <Link href="/dashboard" className="!no-underline">Dashboard</Link>
          </Button>
        </div>
      </Authenticated>
      <Unauthenticated>
      <div className="md:order-last">
        <Button asChild>
          <SignUpButton />
        </Button>
        </div>
      </Unauthenticated>
      <div className="flex items-center gap-1 mx-auto mt-4 justify-around w-full md:justify-between md:w-fit">
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
