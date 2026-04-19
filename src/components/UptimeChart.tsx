"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
    time: string;
    responseTime: number;
    status: string;
}

export default function UptimeChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            tick={{fontSize: 12, fill: '#888'}}
            axisLine={false}
            tickLine={false}
            minTickGap={30}
          />
          <YAxis
            tick={{fontSize: 12, fill: '#888'}}
            axisLine={false}
            tickLine={false}
            unit="ms"
          />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: '#888', marginBottom: '4px' }}
          />
          <Line
            type="monotone"
            dataKey="responseTime"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
