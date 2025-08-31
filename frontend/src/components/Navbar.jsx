export default function Navbar({ onNavigate, onLogout, currentPage }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between rounded-lg mb-6">
      <h1 className="text-xl font-bold">Finance Tracker</h1>
      <div className="space-x-2">
        <button
          onClick={() => onNavigate("add")}
          className={`px-3 py-1 rounded transition ${
            currentPage === "add"
              ? "bg-yellow-400 text-black font-bold"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Add Transaction
        </button>

        <button
          onClick={() => onNavigate("list")}
          className={`px-3 py-1 rounded transition ${
            currentPage === "list"
              ? "bg-yellow-400 text-black font-bold"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Transactions
        </button>

        <button
          onClick={() => onNavigate("analytics")}
          className={`px-3 py-1 rounded transition ${
            currentPage === "analytics"
              ? "bg-yellow-400 text-black font-bold"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Analytics
        </button>

        <button
          onClick={onLogout}
          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
