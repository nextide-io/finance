import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = (id?: string) => {
  const searchParam = useSearchParams();
  const from = searchParam.get("from") || "";
  const to = searchParam.get("to") || "";
  const accountId = searchParam.get("accountId") || "";

  return useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const responce = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!responce.ok) throw new Error("Failed to get Transactions");
      const { data } = await responce.json();
      console.log(data);
      return data.map((transaction) => ({
        ...transaction,
        amount: convertAmountFromMiliunits(transaction.amount),
      }));
    },
  });
};
