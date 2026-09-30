import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { ReactNode } from "react";
import { UserRole } from "@/types";

const DashboardShell = ({
  children,
  userRole,
}: {
  children: ReactNode;
  userRole: UserRole;
}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar role={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardShell;
