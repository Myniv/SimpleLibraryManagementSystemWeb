/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartCodes = ({ data, name, value }) => {
  const activeMembers = [
    { name: "John Doe", borrowCount: 15 },

    { name: "Jane Smith", borrowCount: 12 },

    { name: "Bob Johnson", borrowCount: 10 },

    { name: "Alice Brown", borrowCount: 9 },
  ];

  const dataActiveMembers = data ? data : activeMembers;

  const nameData = name ? name : "name";

  const valueData = value ? value : "borrowCount";

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataActiveMembers} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey={nameData} type="category" width={100} />

          <YAxis type="number" />

          <Tooltip />

          <Bar dataKey={valueData} fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCodes;
