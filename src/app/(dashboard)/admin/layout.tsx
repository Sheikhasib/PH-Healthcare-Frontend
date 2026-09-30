import { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

const Adminlayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
      <DashboardShell userRole="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
};

export default Adminlayout;
