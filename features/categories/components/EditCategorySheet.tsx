"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategoriesSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/dialog-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useDeleteCategory } from "../api/useDeletecategory";
import { useEditCategory } from "../api/useEditCategory";
import { useGetCategory } from "../api/useGetcategory";
import { useOpenCategory } from "../hooks/useOpenCategory";
import CategoryFrom from "./categoryFrom";

const EdiCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const categoryQuery = useGetCategory(id);

  const editMutation = useEditCategory(id);

  const deleteMutation = useDeleteCategory(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about delete this transaction"
  );

  const isPending = editMutation.isPending;
  const formSchema = insertCategoriesSchema.pick({
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

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an Existing Category.</SheetDescription>
          </SheetHeader>
          {categoryQuery.isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground"></Loader2>{" "}
            </div>
          ) : (
            <CategoryFrom
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={categoryQuery.isLoading}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EdiCategorySheet;
