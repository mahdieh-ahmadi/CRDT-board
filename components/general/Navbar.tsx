'use client'

import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";
import { usePathname } from "next/navigation";
import { Avatar } from "./Avatar";
import { UserAvatar } from "@clerk/nextjs";

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800/60 dark:bg-black/80">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-black">
            CR
          </span>
          <span>CRDT Board</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300 md:flex">
          <Link className="transition hover:text-zinc-900 dark:hover:text-white" href="#features">
            Features
          </Link>
          <Link className="transition hover:text-zinc-900 dark:hover:text-white" href="#workflow">
            Workflow
          </Link>
          <Link className="transition hover:text-zinc-900 dark:hover:text-white" href="/dashboard">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {pathname === '/' ? <Button href="/dashboard" size="sm">
            Go to dashboard
          </Button> : <Link href={'/profile'}><UserAvatar rounded /></Link>}
        </div>
      </Container>
    </header>
  );
}

