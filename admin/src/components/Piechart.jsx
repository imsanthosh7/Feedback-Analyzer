import React, { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent, CardFooter
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    visitors: { label: "Visitors" },
    positive: { label: "Positive", color: "green" },
    negative: { label: "Negative", color: "red" },
}

export function Piechart({ value = [] }) { // Add default empty array
    const chartData = useMemo(() => {
        // Add Array.isArray check and default to empty array
        const safeValue = Array.isArray(value) ? value : []
        const counts = safeValue.reduce((acc, item) => {
            const sentiment = item.sentiment?.toLowerCase() || 'neutral'
            acc[sentiment] = (acc[sentiment] || 0) + 1
            return acc
        }, {})

        return Object.entries(counts).map(([sentiment, count]) => ({
            browser: sentiment,
            visitors: count,
            fill: `var(--color-${sentiment})`
        }))
    }, [value])

    const totalVisitors = useMemo(() =>
        chartData.reduce((acc, curr) => acc + curr.visitors, 0)
        , [chartData])

    return (
        <Card className="flex flex-col bg-gray-100">
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan className="fill-foreground text-3xl font-bold">
                                            {totalVisitors.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Reviews
                                        </tspan>
                                    </text>
                                )}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Sentiment Analysis <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing sentiment distribution across reviews
                </div>
            </CardFooter>
        </Card>
    )
}