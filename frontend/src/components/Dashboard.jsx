import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-600">No data to display</p>;
  }

  // Income vs Expense
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const summaryData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  // Category breakdown
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { category: t.category, total: 0 };
      acc[t.category].total += t.amount;
      return acc;
    }, {})
  );

  // Monthly trend
  const monthlyData = Object.values(
    transactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" });
      acc[month] = acc[month] || { month, income: 0, expense: 0 };
      if (t.type === "income") acc[month].income += t.amount;
      else acc[month].expense += t.amount;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-center">Analytics Dashboard</h2>

      {/* Income vs Expense Pie */}
      <div className="p-4 border rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {summaryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown Bar */}
      <div className="p-4 border rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend Line */}
      <div className="p-4 border rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
