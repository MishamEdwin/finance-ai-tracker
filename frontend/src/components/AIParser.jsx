import { useState } from "react";

export default function AIParser({ onParsed }) {
  const [freeText, setFreeText] = useState("");

  const parseWithAI = async () => {
    const token = localStorage.getItem("appToken");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/parse-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: freeText }),
    });

    const data = await res.json();
    if (data.error) {
      alert("Parsing failed: " + data.error);
    } else {
      onParsed(data); // send result back to parent (App.jsx)
      alert("Transaction details Parsed and Saved✅.");
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">AI Transaction Parser</h3>
      <input
        type="text"
        placeholder='e.g. "Spent 200 on groceries"'
        value={freeText}
        onChange={(e) => setFreeText(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={parseWithAI}
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-green-600"
      >
        Save Transaction
      </button>
    </div>
  );
}
