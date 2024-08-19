"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/useNewAccount";
import AccountFrom from "./accountFrom";
import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import { name } from "drizzle-orm";
import { useCreateAccount } from "../api/useCreateAccount";

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const { mutate, isPending } = useCreateAccount();
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type FormValues = z.input<typeof formSchema>;

  function onSubmit(values: FormValues) {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transaction.
          </SheetDescription>
        </SheetHeader>
        <AccountFrom
          defaultValues={{ name: "" }}
          onSubmit={onSubmit}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
