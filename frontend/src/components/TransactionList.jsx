import { useState } from "react";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    category: "",
    type: "expense",
    description: "",
  });

  const startEdit = (txn) => {
    setEditingId(txn._id);
    setEditData({
      amount: txn.amount,
      category: txn.category,
      type: txn.type,
      description: txn.description,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    onEdit(editingId, editData);
    setEditingId(null);
  };

  return (
    <div className="p-4 border rounded-lg shadow mt-6">
      <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2"
            >
              {editingId === txn._id ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full">
                  <input
                    type="number"
                    name="amount"
                    value={editData.amount}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-24"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-28"
                  />
                  <select
                    name="type"
                    value={editData.type}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-28"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="border p-1 rounded flex-1"
                  />
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                  <span>
                    💰 {txn.amount} | 📂 {txn.category} | 📝 {txn.description} (
                    {txn.type})
                  </span>
                  <div className="mt-2 sm:mt-0 flex space-x-2">
                    <button
                      onClick={() => startEdit(txn)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(txn._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
