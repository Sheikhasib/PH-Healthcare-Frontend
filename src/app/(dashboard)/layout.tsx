import AuthGuard from "@/components/auth/auth-guard";
import { ReactNode } from "react";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return <AuthGuard> {children}</AuthGuard>;
};

export default Dashboardlayout;
