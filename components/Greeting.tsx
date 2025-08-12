import { useUser } from "@clerk/nextjs";
import { getTimeOfDay } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Greeting = () => {
  const { user } = useUser();
  const timeOfDay = getTimeOfDay();
  const tasks = useQuery(api.tasks.getForCurrentUser);
  

  return (
    <hgroup className="py-4">
      <h2 className="text-3xl font-bold">Good {timeOfDay}, {user?.firstName}</h2>
      <p className="text-muted-foreground">You have <span>{tasks?.length}</span> tasks due today</p>
    </hgroup>
  );
};

export {Greeting}