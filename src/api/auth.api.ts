import { apiClient } from "@/lib/apiClient";
import {
  LoginPayload,
  RegistrationPayload,
  VerifyAccountPayload,
} from "@/types";

export const userLogin = async (payload: LoginPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userRegistration = async (payload: RegistrationPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyAccount = async (payload: VerifyAccountPayload) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const userLogout = async () => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};

export const getMe = async () => {
  return apiClient("/auth/me");
};

export const googleOAuth = async (payload: { idToken: string }) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};
