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

export function formatMoney(
  amount: string | undefined,
  decimalCount: number = 2,
  decimal: string = ".",
  thousands: string = ","
): string {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const numericAmount = Math.abs(Number(amount) || 0).toFixed(decimalCount);
    const negativeSign = Number(amount) < 0 ? "-" : "";

    let i: string = parseInt(numericAmount).toString();
    let j: number = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimalCount
        ? decimal +
          Math.abs(Number(numericAmount) - parseInt(i))
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.error(e);
    return ""; // Return an empty string in case of an error
  }
}
