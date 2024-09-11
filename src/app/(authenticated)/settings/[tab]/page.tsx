"use client";
import Header from "@/components/Header/Header";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import ProfileTab from "@/components/Settings/ProfileTab";
import UserManagementTab from "@/components/Settings/UserManagementTab/UserManagementTab";
import PermissionsTab from "@/components/Settings/PermissionsTab/PermissionsTab";
import NotificationsTab from "@/components/Settings/NotificationsTab";

type Props = {
  params: {
    tab: "user-management" | "profile" | "permissions" | "notification";
  };
};

export default function page({ params }: Props) {
  const router = useRouter();
  const tab = params.tab;
  return (
    <div>
      <Header title={"Settings"} />
      <Tabs
        value={tab}
        onValueChange={(value) => router.replace(`/settings/${value}`)}
      >
        <TabsList className="mb-10 flex-wrap justify-start gap-2">
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions Management</TabsTrigger>
          <TabsTrigger value="notification">Notifications</TabsTrigger>
        </TabsList>
        {tab == "profile" && <ProfileTab />}
        {tab == "user-management" && <UserManagementTab />}
        {tab == "permissions" && <PermissionsTab />}
        {tab == "notification" && <NotificationsTab />}
      </Tabs>
    </div>
  );
}
