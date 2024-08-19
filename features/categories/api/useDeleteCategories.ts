import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponceType = InferResponseType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>["json"];

export const useDeletCategories = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponceType, Error, RequestType>({
    mutationFn: async (json) => {
      const responce = await client.api.categories["bulk-delete"].$post({
        json,
      });
      return await responce.json();
    },
    onSuccess: () => {
      toast.success("categories Deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.success("Failed to Delete category");
    },
  });
};
