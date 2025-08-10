import { cn } from "@/lib/utils";
import NextLink from "next/link";
import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  externalLink?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ externalLink = false, href, children, className, ...props }, ref) => {
    if (externalLink) {
      return (
        <a
          ref={ref}
          href={href}
          rel="noopener noreferrer"
          className={cn("underline-offset-4 hover:underline", className)}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink
        href={href}
        {...props}
        ref={ref}
        className={cn("underline-offset-4 hover:underline", className)}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = "Link";

export { Link };
