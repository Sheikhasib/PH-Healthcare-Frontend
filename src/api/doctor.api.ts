import { apiClient } from "@/lib/apiClient";
import {
  ApiResponse,
  ApproveDoctorPayload,
  Doctor,
  DoctorApplicationPayload,
  DoctorParams,
  PublicDoctorParams,
  PublicDoctorProfile,
  Schedule,
  VerifyAccountPayload,
} from "@/types";

export const applyAsDoctor = (payload: DoctorApplicationPayload) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
};

export const verifyDoctorAccount = (payload: VerifyAccountPayload) => {
  return apiClient("/doctor/apply-as-doctor/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const getAllDoctors = (params: DoctorParams) => {
  return apiClient<ApiResponse<Doctor[]>>("/doctor/all-doctors", {
    params,
  });
};

export const approveDoctor = (payload: ApproveDoctorPayload) => {
  return apiClient("/doctor/approve-doctor", {
    method: "POST",
    body: payload,
  });
};

export const getAllPublicDoctors = (params: PublicDoctorParams) => {
  return apiClient<ApiResponse<PublicDoctorProfile[]>>(
    "/doctor/public/all-doctors",
    {
      params,
    },
  );
};

export const getPublicDoctorProfile = (doctorId: string) => {
  return apiClient<ApiResponse<PublicDoctorProfile>>(
    `/doctor/public/${doctorId}`,
  );
};

export const getTodayScheduleByDoctor = (params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) => {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/todays-schedule", {
    params,
  });
};
