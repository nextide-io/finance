import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const responce = await client.api.accounts.$get();
      if (!responce.ok) throw new Error("Failed to get accounts");
      const { data } = await responce.json();
      return data;
    },
  });
  return query;
};
