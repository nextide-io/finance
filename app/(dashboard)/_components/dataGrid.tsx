"use client"

import { useGetSummary } from "@/features/summary/api/useGetSummary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation"
import { FaArrowTrendDown, FaArrowTrendUp, FaPiggyBank } from 'react-icons/fa6'
import DataCard, { DataCardloading } from "./dataCard";

const DataGrid = () => {
    const { data, isLoading } = useGetSummary()

    const params = useSearchParams();
    const to = params.get("to") || undefined
    const from = params.get("from") || undefined

    const dateRangeLabel = formatDateRange({ to, from })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardloading />
                <DataCardloading />
                <DataCardloading />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard
                title="Remaining"
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <DataCard
                title="Income"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <DataCard
                title="Expence"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                variant="default"
                dateRange={dateRangeLabel}
            />
        </div>
    )
}

export default DataGrid