export default function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-green-100 border rounded-lg shadow">
        <h3 className="text-lg font-semibold">Income</h3>
        <p className="text-2xl font-bold text-green-700">$ {totalIncome}</p>
      </div>
      <div className="p-4 bg-red-100 border rounded-lg shadow">
        <h3 className="text-lg font-semibold">Expense</h3>
        <p className="text-2xl font-bold text-red-700">$ {totalExpense}</p>
      </div>
      <div className="p-4 bg-blue-100 border rounded-lg shadow">
        <h3 className="text-lg font-semibold">Balance</h3>
        <p className="text-2xl font-bold text-blue-700">$ {balance}</p>
      </div>
    </div>
  );
}
