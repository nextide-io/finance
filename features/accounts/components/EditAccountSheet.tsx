"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useDeleteAccount } from "../api/useDeleteAcccount";
import { useEditAccount } from "../api/useEditAcccount";
import { useGetAccount } from "../api/useGetAcccount";
import { useOpenAccount } from "../hooks/useOpenAccount";
import AccountFrom from "./accountFrom";
import { useConfirm } from "@/hooks/dialog-confirm";

const EdiAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const { data: account, isLoading } = useGetAccount(id);

  const editMutation = useEditAccount(id);

  const deleteMutation = useDeleteAccount(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about delete this transaction"
  );

  const isPending = editMutation.isPending;
  const formSchema = insertAccountSchema.pick({
    name: true,
  });
  type FormValues = z.input<typeof formSchema>;

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

  const defaultValues = account
    ? {
        name: account.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an Existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground"></Loader2>{" "}
            </div>
          ) : (
            <AccountFrom
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isLoading}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EdiAccountSheet;
