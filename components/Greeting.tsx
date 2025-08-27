import { useUser } from "@clerk/nextjs";
import { useUserContext } from "./user-context";

export function Greeting() {
  // Always call hooks at the top level
  const { user: clerkUser } = useUser();
  const context = useUserContext();
  
  // Determine which user data to use
  const user = context?.user || clerkUser;
  
  if (!user) return null;

  const now = new Date();
  const hour = now.getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const firstName = user.firstName || "there";

  return (
    <h1 className="text-4xl py-4 font-cal">
      {greeting}, {firstName}!
    </h1>
  );
}