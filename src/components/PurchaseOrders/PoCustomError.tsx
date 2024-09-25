import { cn } from "@/lib/utils";
import React from "react";
import { useFormField } from "../ui/form";

type Props = {};

export default function PoCustomError({}: Props) {
  const { error, formMessageId } = useFormField();

  return (
    <p
      id={formMessageId}
      className={cn(
        "text-[0.8rem] font-medium text-xs text-left text-destructive"
      )}
    >
      {error ? "supplier is a required field" : ""}
    </p>
  );
}
