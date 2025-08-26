import { useUser } from "@clerk/nextjs";
import { getTimeOfDay } from "@/lib/utils";

const Greeting = () => {
  const { user } = useUser();
  const timeOfDay = getTimeOfDay();
  

  return (
    <hgroup className="py-4">
      <h2 className="text-3xl font-cal">Good {timeOfDay}, {user?.firstName}</h2>
    </hgroup>
  );
};

export {Greeting}