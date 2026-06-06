import React, { useMemo } from "react";
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
import { salesData1Day, salesData1Month, salesData6Months, salesData1Year } from "../../data/chartsData";

const SalesChart = ({ chartPeriod }) => {
     // استفاده از useMemo برای جلوگیری از محاسبه مجدد در رندرهای اضافی
     const { currentData, xAxisKey, tooltipPrefix } = useMemo(() => {
          switch (chartPeriod) {
               case "امروز":
                    return {
                         currentData: salesData1Day,
                         xAxisKey: "time",
                         tooltipPrefix: "ساعت: ",
                    };
               case "این ماه": // یا هر اسمی که برای فیلتر ۱ ماهه گذاشتید
                    return {
                         currentData: salesData1Month,
                         xAxisKey: "day",
                         tooltipPrefix: "روز: ",
                    };
               case "۶ ماهه":
                    return {
                         currentData: salesData6Months,
                         xAxisKey: "month",
                         tooltipPrefix: "ماه: ",
                    };
               case "۱ سال گذشته":
                    return {
                         currentData: salesData1Year,
                         xAxisKey: "month",
                         tooltipPrefix: "ماه: ",
                    };
               default:
                    return {
                         currentData: salesData6Months, // دیتای پیش‌فرض
                         xAxisKey: "month",
                         tooltipPrefix: "ماه: ",
                    };
          }
     }, [chartPeriod]);

     return (
          <ResponsiveContainer width="100%" height={250}>
               <LineChart
                    data={currentData}
                    margin={{ top: 5, right: 30, left: -0, bottom: 5 }}
               >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    
                    {/* کلید محور X به صورت داینامیک */}
                    <XAxis dataKey={xAxisKey} tick={{ fill: "#6b7280", fontSize: 12 }} />
                    
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12, dx: -35 }} />
                    <Tooltip
                         contentStyle={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                         }}
                         formatter={(value) => value.toLocaleString("fa-IR")}
                         // پیشوند تولتیپ به صورت داینامیک (ساعت، روز یا ماه)
                         labelFormatter={(label) => `${tooltipPrefix}${label}`}
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