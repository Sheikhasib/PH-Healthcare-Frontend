"use client";

import { Button } from "@/components/ui/button";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

const Header = () => {
  const routes = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Doctors",
      url: "/doctors",
    },
    {
      name: "About",
      url: "/about-us",
    },
  ];

  // Define a mapping of user roles to their corresponding dashboard routes
  const dashboardRoute: Record<UserRole, string> = {
    SUPER_ADMIN: "/admin",
    ADMIN: "/admin",
    DOCTOR: "/doctor",
    PATIENT: "/patient",
  };

  const { data, isLoading } = useGetMe();
  console.log(data);

  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  // Extract the user role from the fetched data, ensuring that it is defined before accessing the role property
  const role: UserRole = !!data?.data && data?.data.role;

  const handleLogout = async () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successful.");
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong. Please try again.");
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div>PH Healthcare</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}

          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          {!isLoading && data && (
            <Button variant="destructive" onClick={handleLogout}>
              {/* <Link href="/logout">Logout</Link> */}
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
