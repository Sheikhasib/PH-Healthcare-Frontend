"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeleteSchedule, usePublishSchedule } from "@/hooks";
import type { Schedule } from "@/types";
import ScheduleDetailSheet from "./schedule-detail-sheet";

const ScheduleActions = ({ schedule }: { schedule: Schedule }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: publish, isPending: publishPending } = usePublishSchedule();
  const { mutate: remove, isPending: deletePending } = useDeleteSchedule();

  const locked = schedule.status === "PUBLISHED";

  const handlePublish = () => {
    publish(schedule.id, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error("Server Failure", {
            description: "Something went wrong. Please try again",
          });
          return;
        }
        toast.success("Schedule Published", {
          description: "Patients can now book slots",
        });
      },
      onError: (err) => {
        toast.error("Publish failed", {
          description: err.message || "Something went wrong. Please try again",
        });
      },
    });
  };

  const handleDelete = () => {
    remove(schedule.id, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error("Server Failure", {
            description: "Something went wrong. Please try again",
          });
          return;
        }
        toast.success("Schedule Published", {
          description: "Patients can now book slots",
        });
        setConfirmDelete(false);
      },
      onError: (err) => {
        toast.error("Publish failed", {
          description: err.message || "Something went wrong. Please try again",
        });
      },
    });
  };

  if (confirmDelete) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmDelete(false)}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deletePending}
        >
          Confirm
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>
        {schedule.status === "DRAFT" && (
          <Button size="sm" onClick={handlePublish} disabled={publishPending}>
            Publish
          </Button>
        )}
        {!locked && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        )}
      </div>
      <ScheduleDetailSheet
        schedule={schedule}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};

export default ScheduleActions;
