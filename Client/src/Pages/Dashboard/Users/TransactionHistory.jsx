// src/pages/TransactionHistory.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) {
        setTransactions([]);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || ""}/api/charity/transactions?email=${encodeURIComponent(user.email)}`,
          { withCredentials: true }
        );
        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load transactions", err);
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, [user?.email]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={tx.transactionId || idx}>
                  <td className="py-2 px-4 border">{tx.transactionId || "-"}</td>
                  <td className="py-2 px-4 border">${tx.amount ? (tx.amount / 100).toFixed(2) : "-"}</td>
                  <td className="py-2 px-4 border">{tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="py-2 px-4 border">{tx.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
