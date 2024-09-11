import React, { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import DataTable from "@/components/DataTable/DataTable";
import { useTable } from "./hooks/useTable";
import { Card } from "@/components/ui/card";
import { deleteUserApi, getAllUsersApi } from "@/api/user";
import { IUser } from "./typings";
import { Button } from "@/components/ui/button";
import CreateUserModel from "./CreateUserModel";
import { getAllRolesApi } from "@/api/role";
import { IRole } from "@/typings/role";
import ConfirmationModel from "@/components/ConfirmationModel";
import { toast } from "sonner";

export default function UserManagementTab() {
  const [data, setdata] = useState<IUser[] | []>([]);
  const [roleList, setRoleList] = useState<IRole[] | []>([]);
  const [loading, setLoading] = useState(false);
  const {
    columns,
    createModel,
    selectedData,
    setCreateModel,
    setSelectedData,
    selectedDeleteItem,
    setSelectedDeleteItem,
  } = useTable();

  useEffect(() => {
    async function fetchRoles() {
      const { data } = await getAllRolesApi({});
      setRoleList(data.data);
    }
    fetchUsers();
    fetchRoles();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data } = await getAllUsersApi({});
    setdata(data.users);
    setLoading(false);
  }

  async function onDelete() {
    const { data } = await deleteUserApi(selectedDeleteItem);
    setSelectedDeleteItem(null);
    toast.success("User Deleted");
    fetchUsers();
  }

  return (
    <TabsContent value="user-management">
      <div className="flex justify-end items-center pb-3">
        <Button
          onClick={() => {
            setCreateModel(true);
            setSelectedData(null);
          }}
        >
          Add User
        </Button>
      </div>
      <Card className="px-3 rounded-sm">
        <DataTable columns={columns} data={data} loading={loading} />
      </Card>
      <CreateUserModel
        onOpenChange={() => setCreateModel(false)}
        open={createModel}
        selectedData={selectedData}
        roleList={roleList}
        onSuccess={() => {
          setCreateModel(false);
          fetchUsers();
        }}
      />
      <ConfirmationModel
        message="Are you sure you want to delete this record? this actions is cannot be restored"
        show={selectedDeleteItem ? true : false}
        onConfirmClick={() => {
          onDelete();
        }}
        onCancelClick={() => setSelectedDeleteItem(null)}
      />
    </TabsContent>
  );
}
