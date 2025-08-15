import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) {
        setTransactions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || ""}/api/charity/transactions?email=${encodeURIComponent(user.email)}`,
          { withCredentials: true }
        );
        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load transactions", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user?.email]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">Transaction ID</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">Amount</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">Date</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={tx.transactionId || idx} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">{tx.transactionId || "-"}</td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">${tx.amount ? (tx.amount / 100).toFixed(2) : "-"}</td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">{tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">{tx.status || "-"}</td>
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
