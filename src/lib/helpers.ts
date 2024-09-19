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
export const clearFilter = () => {
  history.replaceState(null, "", "?");
};

export const addFilter = async (key: string, value: string) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.set(key, value);
  const query = params.toString();
  history.replaceState(null, "", "?" + query);
};
