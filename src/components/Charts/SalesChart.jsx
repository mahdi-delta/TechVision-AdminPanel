import React from "react";
import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer,
} from "recharts";
import { salesData6Months, salesData1Year } from "../../data/chartsData";

const SalesChart = ({ chartPeriod }) => {
     return (
          <ResponsiveContainer width="100%" height={250}>
               <LineChart
                    data={chartPeriod === "۶ ماه گذشته" ? salesData6Months : salesData1Year}
                    margin={{ top: 5, right: 30, left: -0, bottom: 5 }}
               >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12, dx: -35 }} />
                    <Tooltip
                         contentStyle={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                         }}
                         formatter={(value) => value.toLocaleString("fa-IR")}
                         labelFormatter={(label) => `ماه: ${label}`}
                    />
                    <Legend wrapperStyle={{ direction: "rtl", paddingTop: "20px" }} />
                    <Line
                         type="monotone"
                         dataKey="sales"
                         stroke="#3b82f6"
                         strokeWidth={2}
                         name="فروش"
                         dot={{ fill: "#3b82f6", r: 4 }}
                         activeDot={{ r: 6 }}
                    />
                    <Line
                         type="monotone"
                         dataKey="revenue"
                         stroke="#516194"
                         strokeWidth={2}
                         name="درآمد"
                         dot={{ fill: "#516194", r: 4 }}
                         activeDot={{ r: 6 }}
                    />
               </LineChart>
          </ResponsiveContainer>
     );
};

export default SalesChart;
