import { format } from 'date-fns';
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid

} from 'recharts'
import CustomTooltip from './customTooltip';

type Props = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[]
}
const AreaVariant = ({
    data
}: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor='#3d82f6' stopOpacity={0.8}></stop>
                        <stop offset="98%" stopColor='#3d82f6' stopOpacity={0}></stop>
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor='#f43f5e' stopOpacity={0.8}></stop>
                        <stop offset="98%" stopColor='#f43f5e' stopOpacity={0}></stop>
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: '12px' }}
                    tickMargin={16}
                >
                </XAxis>
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="income"
                    strokeWidth={2}
                    stroke='#3d82f6'
                    fill='url(#income)'
                    className='drop-shadow-sm'
                />
                <Area
                    type="monotone"
                    dataKey="expenses"
                    strokeWidth={2}
                    stroke='#f43f5e'
                    fill='url(#expenses)'
                    className='drop-shadow-sm'
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaVariant