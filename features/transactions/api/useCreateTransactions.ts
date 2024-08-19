import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponceType = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];

export const useCreateTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error, RequestType>({
    mutationFn: async (json) => {
      const responce = await client.api.transactions["bulk-create"].$post({
        json,
      });
      return await responce.json();
    },
    onSuccess: () => {
      toast.success("Transactions Created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.success("Failed to Create Transactions");
    },
  });
};
