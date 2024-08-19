"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteTransactions } from "@/features/transactions/api/useDeleteTransactions";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransactions";
import { columns } from "./columns";

const TransactionsPage = () => {
  const { onOpen } = useNewTransaction();
  const transactionsQuery = useGetTransactions();

  const transaction = transactionsQuery.data || [];

  const deleteTransactions = useDeleteTransactions();

  const disabled = transactionsQuery.isLoading || transactionsQuery.isPending;

  if (transactionsQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <Button size={"sm"} className="gap-2" onClick={onOpen}>
            <Plus className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transaction}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={disabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
