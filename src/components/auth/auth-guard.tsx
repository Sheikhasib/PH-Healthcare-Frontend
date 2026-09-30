"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // Fetch the current user's data using the useGetMe hook
  const { data, isPending, isError } = useGetMe();

  // Extract the user data from the response
  const user = data?.data;

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

  // If the user is authenticated, render the children components
  return <>{children}</>;
};

export default AuthGuard;
