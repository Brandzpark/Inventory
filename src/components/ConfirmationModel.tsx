import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type Props = {
  title?: string;
  show: boolean;
  message: string;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  confirmButtonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export default function ConfirmationModel({
  show,
  message,
  title,
  onCancelClick,
  onConfirmClick,
  confirmButtonVariant,
}: Props) {
  return (
    <Dialog open={show} onOpenChange={onCancelClick}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ? title : "Confirmation"}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancelClick} variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={onConfirmClick}
            variant={
              confirmButtonVariant ? confirmButtonVariant : "destructive"
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
