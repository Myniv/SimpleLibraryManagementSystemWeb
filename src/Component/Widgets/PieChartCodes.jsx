/* eslint-disable react/prop-types */
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PieChartCodes = ({ data, name, value }) => {
  const bookCategories = [
    { name: "Fiction", value: 450 },
    { name: "Non-Fiction", value: 300 },
    { name: "Science", value: 200 },
    { name: "Technology", value: 100 },
    { name: "Arts", value: 50 },
  ];

  const dataBookCategories = data ? data : bookCategories;

  const nameData = name ? name : "name";

  const valueData = value ? value : "borrowCount";

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA3377"];

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataBookCategories}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ category, percent }) =>
              `${category} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey={valueData}
            nameKey={nameData}
          >
            {bookCategories.map((entry, index) => (
              <Cell
                // name={entry}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCodes;
