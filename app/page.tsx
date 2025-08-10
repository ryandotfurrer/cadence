import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export default function Home() {
  return (
    <div>
      <article className="space-y-[1em]">
        <h1 className="text-3xl">Welcome to my Next.js starter!</h1>
        <p>
          This starter serves as a minimal template for me to kick off my
          Next.js projects. It is powered by{" "}
          <Link href="https://nextjs.org/" externalLink>
            Next.js
          </Link>
          ,{" "}
          <Link href="https://tailwindcss.com/" externalLink>
            Tailwind CSS
          </Link>
          , and{" "}
          <Link href="https://ui.shadcn.com/" externalLink>
            shadcn/ui
          </Link>
          .
        </p>
        <p>
          While largely unopinionated, there are a few things I've
          included/changed which you may want to opt out of.
        </p>
        <div className="flex flex-col gap-4 md:max-w-fit md:flex-row">
          <Button asChild>
            <Link
              href="https://github.com/new?template_name=rf-next-starter&template_owner=ryandotfurrer"
              externalLink
              className="hover:no-underline"
            >
              Get started using this template
            </Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link
              href="https://github.com/ryandotfurrer/rf-next-starter"
              externalLink
              className="hover:no-underline"
            >
              View the GitHub repo
            </Link>
          </Button>
        </div>

        <nav className="bg-card space-y-4 rounded-lg border p-4 shadow">
          <h2 className="text-lg">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#base-styles">Base Styles</Link>
            </li>
            <li>
              <Link href="#components">Components</Link>
            </li>
            <li className="ml-4">
              <Link href="#navbar">Navbar</Link>
            </li>
            <li className="ml-4">
              <Link href="#footer">Footer</Link>
            </li>
            <li className="ml-4">
              <Link href="#link">Link</Link>
            </li>
            <li className="ml-4">
              <Link href="#shadcn-ui">shadcn/ui</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <h2 id="base-styles" className="text-2xl">
          Base Styles
        </h2>
        <p>
          This is using Tailwind's "Neutral" color palette which you can change
          in the <span className="inline-code">global.css</span> file. However,
          be sure to update <span className="inline-code">components.json</span>{" "}
          with whichever Base Color you prefer.{" "}
          <Link
            href="https://ui.shadcn.com/docs/theming#base-colors"
            externalLink
          >
            Learn more about shadcn/ui's Base colors
          </Link>
          .
        </p>
        <p>
          I tried to keep all the base styles inside{" "}
          <span className="inline-code">globals.css</span> which you can see
          below.
        </p>
        <pre className="bg-muted overflow-auto">
          <code className="text-sm">
            {`@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground leading-relaxed text-pretty antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply leading-none font-bold tracking-tight text-balance;
  }

  main a {
    @apply text-blue-500;
  }

  .inline-code {
    @apply bg-muted p-1 font-mono text-sm;
  }
}`}
          </code>
        </pre>
        <p>
          I encourage you to delete the{" "}
          <span className="inline-code">.inline-code</span> class as it's only
          being used for this homepage.
        </p>
        <p>
          If you are unsure of what these classes do, be sure to look them up on{" "}
          <Link
            href="https://tailwindcss.com/docs/installation/using-vite"
            externalLink
          >
            Tailwind's docs
          </Link>
          .
        </p>
        <h2 id="components" className="text-2xl">
          Components
        </h2>
        <p>
          Again, largely unopinionated, there are a few things I've
          included/changed which you may want to change based on your
          preferences.
        </p>
        <h3 id="navbar" className="text-xl">
          Navbar
        </h3>
        <p>
          A basic navbar designed to have a logo on the left and links on the
          right. It also includes the{" "}
          <span className="inline-code">mode-toggle</span> for changing themes.
        </p>
        <p>Don't want it?</p>
        <p>
          Delete the <span className="inline-code">navbar.tsx</span> component
          inside{" "}
          <span className="inline-code">
            app {">"} components {">"} navbar.tsx
          </span>
          . Also be sure to remove it from{" "}
          <span className="inline-code">layout.tsx</span>.
        </p>
        <h3 id="footer" className="text-xl">
          Footer
        </h3>
        <p>
          Likewise, the footer is a basic one with copyright text on the left
          and social links on the right. Change this up however you see fit.
          I've chosen to make the footer stick to the bottom of the page as this
          is the most common behavior I've seen in my years on the web.
        </p>
        <p>Don't want it?</p>
        <p>
          Delete the <span className="inline-code">footer.tsx</span> component
          inside{" "}
          <span className="inline-code">
            app {">"} components {">"} footer.tsx
          </span>
          . Also be sure to remove it from{" "}
          <span className="inline-code">layout.tsx</span>.
        </p>
        <h3 id="link" className="text-xl">
          Link
        </h3>
        <p>
          I've included a custom <span className="inline-code">Link</span>{" "}
          component that extends Next's so you can use the attribute{" "}
          <span className="inline-code">externalLink</span> and it will use a
          regular anchor tag rather than Next's{" "}
          <span className="inline-code">Link</span>tag. It also adds{" "}
          <span className="inline-code">rel="noopener noreferrer"</span> as it
          is an external link.
        </p>
        <p>
          Don't want this? Just delete the{" "}
          <span className="inline-code">link.tsx</span> in{" "}
          <span className="inline-code">
            app {">"} components {">"} ui {">"} link.tsx
          </span>
        </p>
        <h3 id="shadcn-ui" className="text-xl">
          shadcn/ui
        </h3>
        <p>
          I have included minimal components from shadcn/ui with this, however,
          you can just install whatever you want. What I{" "}
          <span className="italic">have</span> included are the{" "}
          <span className="inline-code">button</span>,{" "}
          <span className="inline-code">dropdown-menu</span>,{" "}
          <span className="inline-code">mode-toggle</span>, and{" "}
          <span className="inline-code">theme-provider</span>. These were the
          minimum components needed to make the mode toggle function.
        </p>
        <p>
          If you're unsure how these work, I encourage to{" "}
          <Link href="https://ui.shadcn.com/docs/dark-mode/next" externalLink>
            read shadcn/ui's docs on Dark mode
          </Link>
          .
        </p>
        <Button asChild>
          <Link
            href="https://github.com/new?template_name=rf-next-starter&template_owner=ryandotfurrer"
            externalLink
            className="hover:no-underline"
          >
            Get started using this template
          </Link>
        </Button>
      </article>
    </div>
  );
}
