import * as React from "react";
import { 
  ChevronRight, 
  Calendar, 
  Inbox, 
  Target, 
  Heart, 
  CalendarDays,
  List,
  RefreshCw,
  Smile,
  ChartLine,
  Home,
  AudioWaveform
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { ModeToggle } from "./mode-toggle";
import { Link } from "./ui/link";


// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      items: [
        {
          title: "Today",
          url: "/dashboard/tasks/today",
          icon: "calendar",
        },
        {
          title: "Inbox",
          url: "/dashboard/tasks/inbox",
          icon: "inbox"
        },
        {
          title: "Upcoming",
          url: "/dashboard/tasks/upcoming",
          icon: "calendar-days"
        },
        {
          title: "All Tasks",
          url: "/dashboard/tasks/all-tasks",
          icon: "list"
        },
      ],
    },
    {
      title: "Life",
      url: "/dashboard/life",
      items: [
        {
          title: "Areas",
          url: "/dashboard/life/areas",
          icon: "heart"
        },
        {
          title: "Goals ",
          url: "/dashboard/life/goals",
          icon: "target"
        },
        {
          title: "Habits",
          url: "/dashboard/life/habits",
          icon: "refresh-cw"
        },
        {
          title: "Mood",
          url: "/dashboard/life/mood",
          icon: "smile"
        },
        {
          title: "Insights",
          url: "/dashboard/life/insights",
          icon: "chart-line"
        },
      ],
    },
  ],
};

// Icon mapping function
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "calendar":
      return <Calendar className="size-4" />;
    case "calendar-days":
      return <CalendarDays className="size-4" />;
    case "inbox":
      return <Inbox className="size-4" />;
    case "target":
      return <Target className="size-4" />;
    case "refresh-cw":
      return <RefreshCw className="size-4" />;
    case "smile":
      return <Smile className="size-4" />;
    case "chart-line":
      return <ChartLine className="size-4" />;
    case "list":
      return <List className="size-4" />;
    case "heart":
      return <Heart className="size-4" />;
    default:
      return null;
  }
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  // Function to check if a navigation item is active
  const isItemActive = (itemUrl: string) => {
    return pathname === itemUrl || pathname.startsWith(itemUrl + '/');
  };

  // Function to check if home link is active (only exact match)
  const isHomeActive = () => {
    return pathname === "/dashboard";
  };

  // Function to handle link clicks and close sidebar
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar {...props} variant="sidebar">
      <SidebarHeader className="">
          <Link
            href="/"
            className="font-cal flex items-center gap-2 py-4 px-2 text-2xl !no-underline"
          >
            <AudioWaveform className="size-6 text-orange-500" />
            Cadence
          </Link>
        
        <SidebarMenuButton asChild isActive={isHomeActive()}>
          <Link href="/dashboard" className="flex items-center gap-2 !no-underline" onClick={handleLinkClick}>
            <Home className="size-4" />
            Home
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isItemActive(item.url)}>
                          <Link href={item.url} className="flex items-center gap-2 !no-underline" onClick={handleLinkClick}>
                            {getIcon(item.icon)}
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ModeToggle className="self-end" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
