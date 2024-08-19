import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const responce = await client.api.categories[":id"].$get({
        param: { id },
      });
      if (!responce.ok) throw new Error("Failed to get Category");
      const { data } = await responce.json();
      return data;
    },
  });
};
