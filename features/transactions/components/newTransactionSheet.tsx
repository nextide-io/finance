"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { useGetAccounts } from "@/features/accounts/api/useGetAcccounts";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useCreateTransaction } from "../api/useCreateTransaction";
import { useNewTransaction } from "../hooks/useNewTransactions";
import TransactionsForm from "./transactionFrom";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";

const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const categoryQuery = useGetCategories();
  const accountQuery = useGetAccounts();

  const createMutation = useCreateTransaction();
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

  function onSubmit(values: FormValues) {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transactions</SheetTitle>
          <SheetDescription>Create a new Transactions .</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute flex justify-center items-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin"></Loader2>
          </div>
        ) : (
          <TransactionsForm
            onSubmit={onSubmit}
            disabled={isLoading || isPending}
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
