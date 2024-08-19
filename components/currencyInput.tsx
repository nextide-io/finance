import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placehoder?: string;
    disabled?: boolean;
};

export const AmountInput = ({
    value,
    onChange,
    placehoder,
    disabled,
}: Props) => {

    const parseValue = parseFloat(value);
    const isIncome = parseValue > 0;
    const isExpence = parseValue < 0;

    const onReverseValue = () => {
        if (!value) return;
        onChange((parseFloat(value) * -1).toString());
    };

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={onReverseValue}
                            className={cn(
                                "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                isExpence && "bg-rose-500 hover:bg-rose-600"
                            )}

                        >
                            {!parseValue && <Info className="size-3 text-white" />}
                            {isIncome && <PlusCircle className="size-3 text-white" />}
                            {isExpence && <MinusCircle className="size-3 text-white" />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border border-slate-100 p-2">
                        Use [+] for income and [-] for expence
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput
                prefix="₹ "
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placehoder}
                decimalScale={2}
                decimalsLimit={2}
                onValueChange={onChange}
                disabled={disabled}
                value={value}
            />
            <p className="text-sm text-muted-foreground m-2">
                {isIncome && "This will count as income"}
                {isExpence && "This will count as expence"}
            </p>
        </div>
    );
};
