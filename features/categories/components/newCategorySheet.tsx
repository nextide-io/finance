"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategoriesSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "../api/useCreateCategory";
import { useNewCategory } from "../hooks/useNewCategory";
import CategoryForm from "./categoryFrom";

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const { mutate, isPending } = useCreateCategory();
  const formSchema = insertCategoriesSchema.pick({
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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new Category to track your transaction.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={{ name: "" }}
          onSubmit={onSubmit}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
