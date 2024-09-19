"use client";
import React, { useCallback, useState } from "react";
import { Input } from "./ui/input";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

export default function SearchInput({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const search = searchParams.get("search") || "";
  const [text, setText] = useState(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const debounced = useDebouncedCallback((value) => {
    router.push(`${pathname}?${createQueryString("search", value)}`);
  }, 1000);

  return (
    <Input
      placeholder="Search"
      autoFocus
      value={text}
      type="search"
      className="w-[20rem] bg-white outline-none"
      onChange={(e) => {
        setText(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
}
