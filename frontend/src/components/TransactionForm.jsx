export default function TransactionForm({
  amount,
  category,
  type,
  description,
  setAmount,
  setCategory,
  setType,
  setDescription,
  onSave,
}) {
  return (
    <div className="mb-6 p-4 border rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Add Transaction</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={onSave}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Save Transaction
      </button>
    </div>
  );
}
