import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
    id: string
    category: string | null;
    categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
    const { onOpen } = useOpenCategory();
    const { onOpen: onOpenTransaction } = useOpenTransaction()

    const onClick = () => {
        if (categoryId) {
            onOpen(categoryId);
        }
        else {
            onOpenTransaction(id)
        }
    };
    return <div className={cn("flex justify-center items-center hover:underline cursor-pointer",
        !category && "text-rose-500"
    )} onClick={onClick}>
        {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
        {category || "Uncategorized"}

    </div>;
};
