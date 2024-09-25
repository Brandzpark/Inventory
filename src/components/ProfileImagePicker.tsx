import { cn } from "@/lib/utils";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";
type Props = {
  className?: string;
  onChange: (file: File) => void;
  value: File | null | string | any;
  error: boolean;
  disabled?: boolean;
};

export default function ImagePicker({
  className,
  onChange,
  value,
  error,
  disabled,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      multiple: false,
      maxSize: 500000,
      disabled: disabled,
    });

  const localError = fileRejections?.[0]?.errors?.[0]?.message;

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={cn(
            className,
            `h-[10rem] w-[10rem] rounded-full overflow-hidden border-2 border-dotted flex justify-center items-center text-gray-300 border-gray-300`,
            isDragActive && "text-blue-500 border-blue-500",
            fileRejections?.length > 0 && "text-red-600 border-red-600",
            error && "text-red-600 border-red-600"
          )}
        >
          {value ? (
            <img
              alt="imagePicker"
              src={
                typeof value == "string" ? value : URL.createObjectURL(value)
              }
            />
          ) : (
            <ImagePlusIcon className="w-20 h-20" />
          )}
        </div>
      </div>
      <Label className="text-xs text-destructive">{localError}</Label>
    </>
  );
}
