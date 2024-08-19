import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { json } from "stream/consumers";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type ResponceType = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>["json"];

export const useDeleteAccounts = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error, RequestType>({
    mutationFn: async (json) => {
      const responce = await client.api.accounts["bulk-delete"].$post({
        json,
      });
      return await responce.json();
    },
    onSuccess: () => {
      toast.success("Accounts Deleted");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {
      toast.success("Failed to Delete Account");
    },
  });
};
