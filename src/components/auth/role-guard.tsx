"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export const RoleGuard = ({ children, roles }: IProps) => {
  const router = useRouter();

  // Fetch the current user's data using the useGetMe hook
  const { data, isPending, isError } = useGetMe();

  // Extract the user data from the response
  const user = data?.data;

  // Check if the user is authorized based on their role
  const isAuthorized = !!user && roles.includes(user.role);

  // Redirect to login page if the user is not authenticated or if there is an error fetching user data
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router.replace]);

  // Show a loading state while the user data is being fetched
  if (isPending) {
    return <AuthLoading />;
  }

  // Show a loading state while redirecting to the login page if the user is not authenticated or if there is an error
  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  // If the user is authorized, show the children components
  if (isAuthorized) {
    return <>{children}</>;
  }

  // If the user is authenticated but not authorized, show the access denied page
  return <AccessDenied />;
};

export default RoleGuard;
