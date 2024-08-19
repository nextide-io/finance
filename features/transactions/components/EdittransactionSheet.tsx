"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";
import { useGetAccounts } from "@/features/accounts/api/useGetAcccounts";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useConfirm } from "@/hooks/dialog-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { useGetTransaction } from "../api/useGetTransaction";
import { useOpenTransaction } from "../hooks/useOpenTransaction";
import TransactionsForm from "./transactionFrom";

const EdiTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about delete this transaction"
  );

  const transactionQuery = useGetTransaction(id);
  const accountQuery = useGetAccounts();
  const categoryQuery = useGetCategories();

  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
  const accountMutation = useCreateAccount();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });


  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const formSchema = insertTransactionsSchema.omit({
    id: true,
  });

  type FormValues = z.input<typeof formSchema>;

  const defaultvalues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date
      ? new Date(transactionQuery.data.date)
      : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes
  } : {
    accountId: "",
    categoryId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: "",
  }

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  async function onDelete() {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transactions</SheetTitle>
            <SheetDescription>Edit an Existing Transactions.</SheetDescription>
          </SheetHeader>
          {transactionQuery.isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground"></Loader2>{" "}
            </div>
          ) : (
            <TransactionsForm
              onSubmit={onSubmit}
              disabled={isLoading}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
              defaultValues={defaultvalues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EdiTransactionSheet;
