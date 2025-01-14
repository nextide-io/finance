import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponceType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error, RequestType>({
    mutationFn: async (json) => {
      const responce = await client.api.transactions.$post({ json });
      return await responce.json();
    },
    onSuccess: () => {
      toast.success("Transaction Created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Failed to Create Transaction");
    },
  });
};
