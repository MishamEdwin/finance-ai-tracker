import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import AIParser from "./components/AIParser.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SummaryCards from "./components/SummaryCards.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState("home"); // 👈 track current page

  // ✅ Backend URL from env
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Handle Google Login
  const handleLogin = async (googleResponse) => {
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleResponse.credential }),
      });
      const data = await res.json();

      if (data.appToken) {
        localStorage.setItem("appToken", data.appToken);
        setUser(data.user);
        fetchTransactions();
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("appToken");
    setUser(null);
    setPage("home");
  };

  // ✅ Fetch Transactions
  const fetchTransactions = async () => {
    const token = localStorage.getItem("appToken");
    if (!token) return;
    const res = await fetch(`${API_URL}/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Add, Edit, Delete Transaction
  const addTransaction = async (txn) => {
    const token = localStorage.getItem("appToken");
    await fetch(`${API_URL}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(txn),
    });
    fetchTransactions();
  };

  const editTransaction = async (id, updatedData) => {
    const token = localStorage.getItem("appToken");
    await fetch(`${API_URL}/api/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    const token = localStorage.getItem("appToken");
    await fetch(`${API_URL}/api/transactions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTransactions();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          {/* Navbar with Logout */}
          <Navbar
            onNavigate={setPage}
            onLogout={handleLogout}
            currentPage={page}
          />

          {/* Home */}
          {page === "home" && (
            <div className="text-center" style={{ paddingTop: 160 }}>
              <h2 className="text-2xl font-bold mb-4">
                Welcome, {user.name || "User"} 👋
              </h2>
            </div>
          )}

          {/* Add Transaction */}
          {page === "add" && (
            <div>
              <AIParser onParsed={addTransaction} />
              {/* <TransactionForm onAdd={addTransaction} /> */}
            </div>
          )}

          {/* Transaction List */}
          {page === "list" && (
            <TransactionList
              transactions={transactions}
              onEdit={editTransaction}
              onDelete={deleteTransaction}
            />
          )}

          {/* Analytics */}
          {page === "analytics" && (
            <div>
              <SummaryCards transactions={transactions} />
              <Dashboard transactions={transactions} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
