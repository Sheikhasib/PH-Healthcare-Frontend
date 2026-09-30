import CreateScheduleForm from "@/components/form/create-schedule-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const ScheduleCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Create Schedule</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Schedule</DialogTitle>
          <DialogDescription>
            This schedule will be visible to patient
          </DialogDescription>
        </DialogHeader>
        <CreateScheduleForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleCreateDialog;
