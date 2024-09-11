import { AxiosError, isAxiosError } from "axios";

export function errorHandler({
  error,
  setError,
}: {
  error: any | AxiosError;
  setError: (property: any, options: any) => void;
}) {
  if (isAxiosError(error)) {
    const errors = error?.response?.data?.errors;
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors)?.map((property: any) => {
        const message = errors[property];
        setError(property, { message });
      });
    }
  }
}
