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

  if (loading) 
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center ">
        💳 Transaction History
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center  mt-10">
          No transactions found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border  ">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="">
              <tr>
                {["Transaction ID", "Amount", "Date", "Status"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {transactions.map((tx, idx) => (
                <tr
                  key={tx.transactionId || idx}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {tx.transactionId || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    ${tx.amount ? (tx.amount / 100).toFixed(2) : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        tx.status?.toLowerCase() === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : tx.status?.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {tx.status || "-"}
                    </span>
                  </td>
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
