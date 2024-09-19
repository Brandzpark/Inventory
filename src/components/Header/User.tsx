"use client";
import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MainContext } from "@/lib/MainContext";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type Props = {};

export default function User({}: Props) {
  const { userData } = useContext(MainContext);
  const router = useRouter();
  function onLogout() {
    deleteCookie("token");
    router.replace("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10">
          <AvatarImage src={userData?.image} />
          <AvatarFallback>
            {userData && userData?.firstName?.[0] + userData?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/settings/profile"}>
          <DropdownMenuItem className="w-40">Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={onLogout} className=" text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
