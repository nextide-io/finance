import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponceType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error>({
    mutationFn: async () => {
      const responce = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });

      return await responce.json();
    },
    onSuccess: () => {
      toast.success("Transactions Deleted");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Failed to Delete Transactions");
    },
  });
};
