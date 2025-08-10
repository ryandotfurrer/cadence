# Welcome to my Next.js Starter!

This starter serves as a minimal template for kicking off my Next.js projects. It is powered by **Next.js**, **Tailwind CSS**, and **shadcn/ui**.

While largely unopinionated, there are a few things I've included or changed that you may want to opt out of.

[Get started using this template](https://github.com/new?template_name=rf-next-starter&template_owner=ryandotfurrer)

## Table of Contents

- [Getting Started](#getting-started)
- [Base Styles](#base-styles)
- [Components](#components)
  - [Navbar](#navbar)
  - [Footer](#footer)
  - [Link](#link)
  - [shadcn/ui](#shadcnui)

## Getting Started

### Using This Template

You can create a new repository using this template by clicking the link below:

[Get started using this template](https://github.com/new?template_name=rf-next-starter&template_owner=ryandotfurrer)

Alternatively, you can clone this repository directly:

```bash
git clone https://github.com/ryandotfurrer/rf-next-starter.git your-project-name
cd your-project-name
```

### Installing Dependencies

This project uses [pnpm](https://pnpm.io/) as the package manager. Install the dependencies with:

```bash
pnpm install
```

If you prefer to use npm, yarn, or bun:

```bash
npm install
# or
yarn install
# or
bun install
```

### Running the Development Server

Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. You'll see updates in the browser when you save the file.

## Base Styles

This starter uses Tailwind's "Neutral" color palette, which you can change in the `global.css` file. Be sure to update `components.json` with whichever base color you prefer. [Learn more about shadcn/ui's Base colors](https://ui.shadcn.com/docs/theming#base-colors).

All base styles are kept inside `globals.css`:

```css
@layer base {
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
}
```

You can delete the `.inline-code` class—it's only used for this homepage.

If you're unsure what these classes do, check out [Tailwind's documentation](https://tailwindcss.com/docs/installation/using-vite).

## Components

Again, while largely unopinionated, there are a few things I've included or changed which you may want to adjust based on your preferences.

### Navbar

A basic navbar is included, with a logo on the left and links on the right. It also includes the `mode-toggle` for changing themes.

**Don't want it?**
Delete the `navbar.tsx` component inside `app > components > navbar.tsx`. Also, remove it from `layout.tsx`.

### Footer

The footer is a basic one with copyright text on the left and social links on the right. It's set to stick to the bottom of the page, which is the most common behavior I've seen.

**Don't want it?**
Delete the `footer.tsx` component inside `app > components > footer.tsx`. Also, remove it from `layout.tsx`.

### Link

I've included a custom `Link` component that extends Next.js's. You can use the `externalLink` attribute, and it will render a regular anchor tag rather than Next.js's `Link` tag. It also adds `rel="noopener noreferrer"` for external links.

**Don't want this?**
Delete `link.tsx` in `app > components > ui > link.tsx`.

### shadcn/ui

Minimal components from shadcn/ui are included. You can install whatever else you need. The included components are:

- `button`
- `dropdown-menu`
- `mode-toggle`
- `theme-provider`

These are the minimum needed to make the mode toggle function.

If you're unsure how these work, [read shadcn/ui's docs on Dark mode](https://ui.shadcn.com/docs/dark-mode/next).

[Get started using this template](https://github.com/new?template_name=rf-next-starter&template_owner=ryandotfurrer)
