import { Wallet, ArrowUpRight, ArrowDownRight, DollarSign, Percent, PieChart, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie } from 'recharts';

interface AssetCardProps {
    name: string;
    symbol: string;
    value: string;
    amount: string;
    price: string;
    change24h: number;
    apy: number;
}

interface ChartDataPoint {
    date: string;
    value: number;
    apy: number;
}

interface ChartTooltipData {
    name: string;
    value: number;
    dataKey: string;
}

interface ChartTooltipProps {
    active?: boolean;
    payload?: ChartTooltipData[];
    label?: string;
}

const COLORS = [
    '#3b82f6', // bright blue
    '#f97316', // orange
    '#06b6d4', // cyan
    '#8b5cf6'  // purple
];

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

function parseAmount(value: string): number {
    return Number.parseFloat(value.replace(/[$,]/g, ''));
}

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background/95 border border-white/[0.08] p-3 rounded-lg shadow-lg backdrop-blur-sm">
                <p className="text-sm font-medium">{label}</p>
                {payload.map((entry) => (
                    <p key={entry.dataKey} className="text-sm text-muted-foreground">
                        {entry.name}: {entry.dataKey === 'apy' ? `${entry.value.toFixed(2)}%` : formatCurrency(entry.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

function AssetCard({ name, symbol, value, amount, price, change24h, apy }: AssetCardProps) {
    const isPositive = change24h >= 0;

    return (
        <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.04] transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-muted-foreground">{symbol}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <Percent className="h-3 w-3" />
                    <span className="text-green-400">{apy}% APY</span>
                </div>
            </div>
            <div className="flex items-baseline justify-between">
                <div>
                    <div className="text-2xl font-semibold mb-1">{value}</div>
                    <div className="text-sm text-muted-foreground">
                        {amount}
                        <span className="ml-1 text-muted-foreground">({price})</span>
                    </div>
                </div>
                <div className={`flex items-center gap-1 ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                    {isPositive ?
                        <ArrowUpRight className="h-4 w-4" /> :
                        <ArrowDownRight className="h-4 w-4" />
                    }
                    <span>{Math.abs(change24h)}%</span>
                </div>
            </div>
        </div>
    );
}

function GaugeChart({ value }: { value: number }) {
    const normalizedValue = Math.min(Math.max(value, 0), 100);
    const rotation = (normalizedValue / 100) * 180;

    return (
        <div className="relative w-full h-[120px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-full max-w-[200px]">
                    {/* Background arc */}
                    <path
                        d="M 40 100 A 50 50 0 0 1 160 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* Colored arc */}
                    <path
                        d="M 40 100 A 50 50 0 0 1 160 100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(rotation / 180) * 188} 188`}
                    />
                    {/* Center text */}
                    <text
                        x="100"
                        y="85"
                        textAnchor="middle"
                        className="text-2xl font-bold"
                        fill="currentColor"
                        style={{ fontSize: '24px' }}
                    >
                        {value.toFixed(1)}%
                    </text>
                    <text
                        x="100"
                        y="105"
                        textAnchor="middle"
                        className="text-xs text-muted-foreground"
                        fill="currentColor"
                        style={{ fontSize: '12px' }}
                        opacity="0.7"
                    >
                        Total APY
                    </text>
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#7dd3fc" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}

// Add helper function for distribution data
function calculateDistributionData(assets: AssetCardProps[]) {
    const total = assets.reduce((sum, asset) => sum + parseAmount(asset.value), 0);
    return assets.map(asset => ({
        name: asset.symbol,
        value: (parseAmount(asset.value) / total) * 100
    }));
}

// Dummy performance data
const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    value: 10000 + Math.random() * 2000 + (i * 100),
    apy: 1 + Math.sin(i * 0.5) + Math.random() * 4,
}));

export default function Portfolio() {
    const assets = [
        {
            name: "Conflux",
            symbol: "CFX",
            value: formatCurrency(3280.00),
            amount: "100,000 CFX",
            price: "$0.0328",
            change24h: -2.52,
            apy: 4.5
        },
        {
            name: "Wrapped BTC",
            symbol: "wBTC",
            value: formatCurrency(4705.00),
            amount: "0.05 wBTC",
            price: "$94,100.00",
            change24h: -1.32,
            apy: 3.8
        },
        {
            name: "Wrapped Ether",
            symbol: "WETH",
            value: formatCurrency(3283.00),
            amount: "1.00 WETH",
            price: "$3,283.00",
            change24h: -0.15,
            apy: 8.2
        },
        {
            name: "Swappi",
            symbol: "PPI",
            value: formatCurrency(3374.00),
            amount: "1.00 PPI",
            price: "$3,374.00",
            change24h: -0.83,
            apy: 12.4
        },
        {
            name: "Nucleon ",
            symbol: "NUT",
            value: formatCurrency(1693.00),
            amount: "100,000 NUT",
            price: "$0.01693",
            change24h: -3.22,
            apy: 9.6
        },
        {
            name: "Tether",
            symbol: "USDT",
            value: formatCurrency(836.10),
            amount: "100,000 USDT",
            price: "$0.008361",
            change24h: 34.13,
            apy: 15.2
        }
    ];

    // Calculate total value from actual assets
    const totalValue = assets.reduce((sum, asset) => sum + parseAmount(asset.value), 0);
    const formattedTotalValue = formatCurrency(totalValue);

    // Calculate weighted average APY
    const weightedApy = assets.reduce((sum, asset) => {
        const value = parseAmount(asset.value);
        return sum + (asset.apy * (value / totalValue));
    }, 0);

    // Calculate distribution data
    const distributionData = calculateDistributionData(assets);

    return (
        <div className="h-full flex flex-col p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Portfolio</h1>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Total Value Card */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-sky-400/10">
                            <DollarSign className="h-6 w-6 text-sky-400" />
                        </div>
                        <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-semibold text-center">{formattedTotalValue}</div>
                        <div className="flex items-center justify-center gap-1 text-green-500">
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="text-sm">2.8% (24h)</span>
                        </div>
                    </div>
                </div>

                {/* Distribution Card */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-full bg-sky-400/10">
                            <PieChart className="h-6 w-6 text-sky-400" />
                        </div>
                        <div className="text-sm text-muted-foreground">Asset Distribution</div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="h-[120px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={35}
                                        outerRadius={50}
                                        paddingAngle={2}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {distributionData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-sm"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                                        {entry.name}: {entry.value.toFixed(2)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* APY Gauge Card */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-full bg-sky-400/10">
                            <Activity className="h-6 w-6 text-sky-400" />
                        </div>
                        <div className="text-sm text-muted-foreground">Average APY</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <GaugeChart value={weightedApy} />
                    </div>
                </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-4">
                    <h3 className="text-sm font-medium mb-4">Portfolio Performance</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip content={<ChartTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#38bdf8"
                                    fill="url(#performanceGradient)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-4">
                    <h3 className="text-sm font-medium mb-4">APY Trend</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="apyGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip content={<ChartTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="apy"
                                    stroke="#38bdf8"
                                    fill="url(#apyGradient)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {assets.map((asset) => (
                    <AssetCard
                        key={asset.symbol}
                        {...asset}
                    />
                ))}
            </div>
        </div>
    );
}