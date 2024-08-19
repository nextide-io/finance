import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponceType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error, RequestType>({
    mutationFn: async (json) => {
      const responce = await client.api.categories.$post({ json });
      return await responce.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category Created");
    },
    onError: () => {
      toast.error("Failed to Create Category");
    },
  });
};
