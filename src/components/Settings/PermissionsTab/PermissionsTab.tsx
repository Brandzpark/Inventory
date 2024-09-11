import React, { useEffect, useState } from "react";

import { TabsContent } from "@/components/ui/tabs";
import { useTable } from "./hooks/useTable";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { IPermissions, IRole } from "@/typings/role";
import { getAllPermissionsApi, getAllRolesApi } from "@/api/role";
import CreateRoleModel from "./CreateRoleModel";
import { isAxiosError } from "axios";
import { toast } from "sonner";
type Props = {};

export default function PermissionsTab({}: Props) {
  const [data, setdata] = useState<IRole[] | []>([]);
  const [permissions, setPermissions] = useState<IPermissions[] | []>([]);
  const [loading, setLoading] = useState(false);
  const {
    columns,
    createModel,
    selectedData,
    setCreateModel,
    setSelectedData,
  } = useTable();

  useEffect(() => {
    async function fetchPermissions() {
      const { data } = await getAllPermissionsApi();
      setPermissions(data);
    }
    fetchPermissions();
    fetchRoles();
  }, []);

  async function fetchRoles() {
    setLoading(true);
    const { data } = await getAllRolesApi({});
    setdata(data.data);
    setLoading(false);
  }

  return (
    <TabsContent value="permissions">
      <div className="flex justify-end items-center pb-3">
        <Button
          onClick={() => {
            setCreateModel(true);
            setSelectedData(null);
          }}
        >
          Create Role
        </Button>
      </div>
      <Card className="px-3 rounded-sm">
        <DataTable columns={columns} data={data} loading={loading} />
      </Card>
      <CreateRoleModel
        onOpenChange={() => setCreateModel(false)}
        open={createModel}
        selectedData={selectedData}
        permissions={permissions}
        onSuccess={() => {
          setCreateModel(false);
          fetchRoles();
        }}
      />
    </TabsContent>
  );
}
