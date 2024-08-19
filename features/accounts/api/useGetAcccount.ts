import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";

export const useGetAccount = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const responce = await client.api.accounts[":id"].$get({
        param: { id },
      });
      if (!responce.ok) throw new Error("Failed to get account");
      const { data } = await responce.json();
      return data;
    },
  });
};
