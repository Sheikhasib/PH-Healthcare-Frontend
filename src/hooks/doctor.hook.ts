import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctors,
  getAllPublicDoctors,
  getTodayScheduleByDoctor,
  verifyDoctorAccount,
} from "@/api/doctor.api";
import { DoctorParams, PublicDoctorParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
};

export const useVerifyDoctorAccount = () => {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
};

export const useGetAllDoctors = (params: DoctorParams) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

export const useSuspenseGetAllDoctors = (params: DoctorParams) => {
  return useSuspenseQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

export const useSuspenseGetPublicDoctors = (params: PublicDoctorParams) => {
  return useSuspenseQuery({
    queryKey: ["doctors", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
};

export const useApproveDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useGetTodayScheduleByDoctor = (params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
};
