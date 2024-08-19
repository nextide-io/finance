import { client } from "@/lib/hono";
import { convertAmountFromMiliunits, convertAmountToMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = (id?: string) => {
    const searchParam = useSearchParams();
    const from = searchParam.get("from") || "";
    const to = searchParam.get("to") || "";
    const accountId = searchParam.get("accountId") || "";

    return useQuery({
        queryKey: ["summary", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.summary.$get({
                param: {
                    from,
                    to,
                    accountId,
                },
            });

            if (!response.ok) throw new Error("Failed to get Summary");

            const jsonResponse = await response.json();

            // Type narrowing to check if 'data' exists in jsonResponse
            if ('data' in jsonResponse) {
                const data = jsonResponse.data;
                // Process and return the data as needed
                return {
                    remainingAmount: convertAmountFromMiliunits(data.remainingAmount),
                    remainingChange: convertAmountFromMiliunits(data.remainingChange),
                    incomeAmount: convertAmountFromMiliunits(data.incomeAmount),
                    incomeChange: convertAmountFromMiliunits(data.incomeChange),
                    expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
                    expensesChange: convertAmountFromMiliunits(data.expensesChange),
                    categories: data.categories.map(category => ({
                        ...category,
                        value: convertAmountFromMiliunits(category.value)
                    })),
                    days: data.days.map(day => ({
                        ...day,
                        income: convertAmountFromMiliunits(day.income),
                        expenses: convertAmountFromMiliunits(day.expenses)
                    }))
                };
            } else {
                throw new Error("Unexpected response structure");
            }
        },
    });
};
