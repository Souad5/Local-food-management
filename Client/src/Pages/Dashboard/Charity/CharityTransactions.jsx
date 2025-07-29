import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

const CharityTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) {
        setTransactions([]);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || ""}/api/charity/transaction?email=${encodeURIComponent(user.email)}`,
          { withCredentials: true }
        );
        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load transactions", err);
        setTransactions([]);
      }
    };
    fetchData();
  }, [user?.email]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn._id || txn.transactionId}>
                <td>{txn.transactionId || "-"}</td>
                <td>${txn.amount ? (txn.amount / 100).toFixed(2) : "-"}</td>
                <td>{txn.createdAt ? new Date(txn.createdAt).toLocaleDateString() : "-"}</td>
                <td>{txn.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharityTransaction
