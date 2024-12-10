import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartCodes = () => {
  const monthlyData = [
    { month: "Jan", borrowed: 124, returned: 98, newMembers: 45 },
    { month: "Feb", borrowed: 145, returned: 125, newMembers: 38 },
    { month: "Mar", borrowed: 165, returned: 140, newMembers: 52 },
    { month: "Apr", borrowed: 155, returned: 149, newMembers: 41 },
    { month: "May", borrowed: 178, returned: 158, newMembers: 35 },
    { month: "Jun", borrowed: 190, returned: 175, newMembers: 48 },
  ];

  return (
    <div style={{ height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newMembers"
            stroke="#198754"
            name="New Members"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCodes;
