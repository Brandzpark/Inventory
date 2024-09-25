import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import ProfileTab from "@/components/Settings/ProfileTab";
import UserManagementTab from "@/components/Settings/UserManagementTab/UserManagementTab";
import PermissionsTab from "@/components/Settings/PermissionsTab/PermissionsTab";
import NotificationsTab from "@/components/Settings/NotificationsTab";

type Props = {
  tab: string;
};

export default function MainTabs({ tab }: Props) {
  const router = useRouter();

  return (
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
  );
}
