"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { Loader2, Plus } from "lucide-react";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/useGetAcccounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteAccounts } from "@/features/accounts/api/useDeleteAccounts";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const accountQuery = useGetAccounts();
  const accounts = accountQuery.data || [];

  const deleteAccounts = useDeleteAccounts();

  const disabled = accountQuery.isLoading || accountQuery.isPending;

  if (accountQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl max-auto pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-8 text-slate-300 animate-spin"></Loader2>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl max-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button size={"sm"} className="gap-2" onClick={onOpen}>
            <Plus className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            disabled={disabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
