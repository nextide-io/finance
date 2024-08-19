import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/features/accounts/api/useDeleteAcccount";
import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";
import { useConfirm } from "@/hooks/dialog-confirm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
  id: string;
};

const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();

  const deleteMutation = useDeleteAccount(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about delete this transaction"
  );

  async function handleDelete() {
    console.log("handle delete");
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate();
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-4 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white border border-slate-200 z-20"
        >
          <DropdownMenuItem
            onClick={() => onOpen(id)}
            className="flex items-center justify-start p-2 cursor-pointer hover:bg-slate-100"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="flex items-center justify-start p-2 cursor-pointer hover:bg-slate-100"
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
