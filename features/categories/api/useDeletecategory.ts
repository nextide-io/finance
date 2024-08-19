import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponceType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error>({
    mutationFn: async () => {
      const responce = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });

      return await responce.json();
    },
    onSuccess: () => {
      toast.success("Category Delted");
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to Delete Category");
    },
  });
};
