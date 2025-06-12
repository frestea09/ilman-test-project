"use client"; // Required for Recharts

import { BarChart, LineChartIcon, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart as RechartsLineChart, BarChart as RechartsBarChart } from 'recharts';
import React from 'react';

const trafficData = [
  { name: 'Jan', visits: 400, unique: 240 },
  { name: 'Feb', visits: 300, unique: 139 },
  { name: 'Mar', visits: 600, unique: 380 },
  { name: 'Apr', visits: 578, unique: 390 },
  { name: 'May', visits: 789, unique: 480 },
  { name: 'Jun', visits: 639, unique: 380 },
  { name: 'Jul', visits: 890, unique: 430 },
];

const engagementData = [
  { name: 'Page A', engagement: 0.75 },
  { name: 'Page B', engagement: 0.62 },
  { name: 'Page C', engagement: 0.88 },
  { name: 'Page D', engagement: 0.50 },
  { name: 'Page E', engagement: 0.70 },
];

const chartConfig = {
  visits: {
    label: "Total Visits",
    color: "hsl(var(--chart-1))",
  },
  unique: {
    label: "Unique Visitors",
    color: "hsl(var(--chart-2))",
  },
  engagement: {
    label: "Engagement Rate",
    color: "hsl(var(--chart-3))",
  }
} satisfies React.ComponentProps<typeof ChartContainer>["config"];


export default function DashboardPage() {
  const [totalVisits, setTotalVisits] = React.useState<number | null>(null);
  const [avgSession, setAvgSession] = React.useState<string | null>(null);
  const [bounceRate, setBounceRate] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate fetching data
    setTotalVisits(Math.floor(Math.random() * 5000) + 1000);
    setAvgSession(`${(Math.random() * 5 + 1).toFixed(2)} min`);
    setBounceRate(`${(Math.random() * 60 + 20).toFixed(1)}%`);
  }, []);


  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Analytics Dashboard</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Overview of website traffic and user engagement. (Demo Data)
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits !== null ? totalVisits.toLocaleString() : <Loader2 className="h-6 w-6 animate-spin" />}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSession || <Loader2 className="h-6 w-6 animate-spin" />}</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bounceRate || <Loader2 className="h-6 w-6 animate-spin" />}</div>
            <p className="text-xs text-muted-foreground text-destructive">-2.3% from last month (Improvement)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Website Traffic Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsLineChart data={trafficData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Legend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="visits" stroke="var(--color-visits)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="unique" stroke="var(--color-unique)" strokeWidth={2} dot={false} />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Page Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
               <RechartsBarChart data={engagementData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="engagement" fill="var(--color-engagement)" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple loader for when data is not yet available
function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
