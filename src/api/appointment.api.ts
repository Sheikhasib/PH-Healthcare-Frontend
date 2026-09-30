import { apiClient } from "@/lib/apiClient";
import type {
  ApiResponse,
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types";

export const bookAppointment = (payload: BookAppointmentPayload) => {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
};

export const getMyAppointments = (params: {
  page?: number;
  limit?: number;
}) => {
  return apiClient("/appointment/my-appointments", {
    params,
  });
};
