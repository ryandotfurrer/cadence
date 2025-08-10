import { Link } from "./ui/link";

const Footer = () => {
  return (
    <footer className="mt-12 flex items-center justify-between border-t">
      <div className="flex items-center justify-between pt-4 pb-8">
        <span>
          Made by{" "}
          <Link href="#" externalLink>
            Ryan Furrer
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link href="https://github.com/ryandotfurrer" externalLink>
          GitHub
        </Link>
        <Link href="https://x.com/ryandotfurrer" externalLink>
          Twitter (X)
        </Link>
        <Link href="https://www.linkedin.com/in/ryanfurrer/" externalLink>
          LinkedIn
        </Link>
      </div>
    </footer>
  );
};

export { Footer };
