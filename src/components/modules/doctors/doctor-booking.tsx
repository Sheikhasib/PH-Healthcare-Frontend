"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  useBookAppointment,
  useGetMe,
  useGetTodayScheduleByDoctor,
} from "@/hooks";
import { Schedule } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookingConfirmation {
  schedule: Schedule;
  paymentUrl: string;
}

const DoctorBooking = ({ doctorId }: { doctorId: string }) => {
  const router = useRouter();

  // Fetch the current user's data using the useGetMe hook
  const { data: me, isPending: mePending } = useGetMe();
  // Fetch today's schedules using the useGetTodayScheduleByDoctor hook
  const { data, isPending, error } = useGetTodayScheduleByDoctor({ doctorId });
  // Handle booking a slot using the useBookAppointment hook
  const { mutate: book, isPending: bookingPending } = useBookAppointment();
  // Manage the booking confirmation dialog state
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );

  // Extract the schedules from the response
  const schedules = data?.data ?? [];

  // Function to handle booking a slot
  const handleBooking = (schedule: Schedule) => {
    if (!mePending && !me?.data) {
      router.push("/login");
      return;
    }

    // Call the book mutation with the selected schedule ID
    book(
      { scheduleId: schedule.id },
      {
        onSuccess: (res) => {
          console.log(res);
          // Show the booking confirmation dialog with the payment URL
          setConfirmation({ paymentUrl: res.data.paymentUrl, schedule });
        },
        onError: (error) => {
          console.log("BOOKING ERROR:", error);
          console.log("BOOKING ERROR DATA:", (error as any)?.response?._data);
        },
      },
    );
  };

  // Show a loading state while the user data is being fetched
  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Spinner />
          <span className="text-sm text-muted-foreground">
            Loading today&apos;s slots…
          </span>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  // Show an error message if the user data could not be fetched
  if (error) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        Could not load slots. Please try again.
      </p>
    );
  }

  // Show a message if there are no bookable slots
  if (schedules.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No bookable slots today for this doctor. Try another day or doctor.
      </p>
    );
  }

  return (
    <>
      <div>
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="border rounded-md p-3 flex gap-5 items-center"
          >
            <span>{format(schedule.startDateTime, "eeee")}</span>
            <span>{format(schedule.startDateTime, "PP")}</span>
            <span className="text-sm text-muted-foreground">
              Starts at {format(schedule.startDateTime, "p")}
            </span>
            <span className="text-sm text-muted-foreground">
              Ends at {format(schedule.endDateTime, "p")}
            </span>
            <Button className="ml-auto" onClick={() => handleBooking(schedule)}>
              {bookingPending ? "Booking..." : "Book Now"}
            </Button>
          </div>
        ))}
      </div>
      <Dialog
        open={!!confirmation}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmation(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Successful</DialogTitle>
            <DialogDescription>
              Please pay within 10 minutes to keep your booking
            </DialogDescription>
            <span>
              Data and Time:
              {confirmation
                ? format(confirmation.schedule.startDateTime, "PPP")
                : "-"}
            </span>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Pay Later
            </Button>
            <Button
              onClick={() => {
                if (confirmation) {
                  window.location.href = confirmation.paymentUrl;
                }
              }}
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorBooking;

//Payment failed => http://localhost:3000/dashboard/my-appointments?status=failue
