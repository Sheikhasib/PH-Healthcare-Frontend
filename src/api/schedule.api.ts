import { apiClient } from "@/lib/apiClient";
import {
  ApiResponse,
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types";

export const createSchedule = (payload: CreateSchedulePayload) => {
  return apiClient<ApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
};

export const getMySchedules = (params: ScheduleParams) => {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/my-schedules", {
    params,
  });
};

export const publishSchedule = (scheduleId: string) => {
  return apiClient<ApiResponse<Schedule>>(
    `/schedule/publish-schedule/${scheduleId}`,
    { method: "PATCH" },
  );
};

export const deleteSchedule = (scheduleId: string) => {
  return apiClient<ApiResponse<Schedule>>(`/schedule/${scheduleId}`, {
    method: "DELETE",
  });
};
