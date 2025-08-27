"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <>
      <Authenticated>
        <Content />
      </Authenticated>
      <Unauthenticated>
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-cal mb-6">Welcome to Cadence</h1>
          <p className="text-muted-foreground mb-8 text-lg max-w-md">
            Your personal productivity companion for managing tasks, habits, and life goals.
          </p>
          <Button asChild size="lg">
            <SignInButton />
          </Button>
        </div>
      </Unauthenticated>
    </>
  );
}

function Content() {

  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
      <div className="mt-8 max-w-2xl">
        <h2 className="text-3xl font-cal mb-4">Welcome back!</h2>
        <p className="text-muted-foreground mb-6 text-lg">
          Ready to tackle your day? Head over to your dashboard to manage tasks, track habits, and monitor your progress.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="default">
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/dashboard/tasks/all-tasks">View All Tasks</a>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Button asChild variant="ghost">
          <SignOutButton />
        </Button>
      </div>
    </div>
  );
}
