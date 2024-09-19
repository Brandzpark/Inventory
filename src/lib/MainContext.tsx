import { createContext, ReactNode, useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { getMeApi } from "@/api/user";
import { IUser } from "@/typings/user";

type InitialValueType = {
  userData: IUser | null;
};

const initialValue: InitialValueType = {
  userData: null,
};

const MainContext = createContext(initialValue);

type ProviderPorps = { children: ReactNode };

const MainContextProvider = ({ children }: ProviderPorps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const resposne: AxiosResponse = await getMeApi();
        setUserData(resposne?.data?.user);
      } catch (error) {
        setUserData(null);
        deleteCookie("token");
        router.replace("/");
        console.log(error);
      }
    }
    if (!["/"].includes(pathName)) {
      fetchUserData();
    }
  }, [pathName]);

  return (
    <MainContext.Provider value={{ userData }}>{children}</MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
