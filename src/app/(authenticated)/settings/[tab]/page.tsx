"use client";
import Header from "@/components/Header/Header";
import React from "react";

import MainTabs from "@/components/Settings/MainTabs";

type Props = {
  params: {
    tab: "user-management" | "profile" | "permissions" | "notification";
  };
};

export default function page({ params }: Props) {
  const tab = params.tab;
  return (
    <div>
      <Header title={"Settings"} />
      <MainTabs tab={tab} />
      
    </div>
  );
}
