import React, { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
type Props = {
  children: ReactNode;
  placeholder?: string;
} & SelectProps;

export function MainSelect(props: Props) {
  const { children, placeholder } = props;

  return (
    <Select {...props}>
      <SelectTrigger
        className={cn(
          "capitalize",
          props.value == undefined && "text-slate-500"
        )}
      >
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

type SelectItemProps = {
  children: ReactNode;
  value: string;
};

export function MainSelectItem(props: SelectItemProps) {
  const { children, value } = props;
  return <SelectItem value={value}>{children}</SelectItem>;
}
