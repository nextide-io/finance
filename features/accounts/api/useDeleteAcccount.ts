import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { json } from "stream/consumers";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type ResponceType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error>({
    mutationFn: async () => {
      const responce = await client.api.accounts[":id"]["$delete"]({
        param: { id },
      });

      return await responce.json();
    },
    onSuccess: () => {
      toast.success("Account Delted");
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Failed to Delete Account");
    },
  });
};
