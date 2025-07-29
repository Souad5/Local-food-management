import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const RequestCharityRole = () => {
  const { user } = useContext(AuthContext);
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [hasPendingOrApproved, setHasPendingOrApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user has pending or approved request
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/charity-role/status?email=${
            user.email
          }`
        );

        if (res.data?.status === "Pending" || res.data?.status === "Approved") {
          setHasPendingOrApproved(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, [user.email]);

  const handleRequest = async () => {
    if (!orgName || !mission) return toast.error("Fill all fields");

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment`,
        {
          amount: 2500,
          email: user.email,
          mission,
          orgName,
        },
        { withCredentials: true }
      );
      setClientSecret(res.data.clientSecret);
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentMethod) => {
    try {
      // Save charity role request
      await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/charity-role/submit`,
        {
          email: user.email,
          amount: "2500",
          name: user.displayName,
          orgName,
          mission,
          transactionId: paymentMethod.id,
          status: "Pending",
        }
      );
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("You already submitted a request.");
        setHasPendingOrApproved(true); // optionally disable the form
      } else {
        console.error(err);
        toast.error("Failed to submit request");
      }
    }
  };

  if (hasPendingOrApproved) {
    return (
      <div className="max-w-md mx-auto mt-10 p-5 border rounded text-red-500 font-semibold">
        You already have a pending or approved charity role request.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded">
      <h2 className="text-xl font-bold mb-4">Request Charity Role</h2>

      <input
        value={user.displayName}
        readOnly
        className="input input-bordered w-full mb-4"
      />

      <input
        value={user.email}
        readOnly
        className="input input-bordered w-full mb-4"
      />

      <input
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Organization Name"
        className="input input-bordered w-full mb-4"
      />

      <textarea
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        placeholder="Mission Statement"
        className="textarea textarea-bordered w-full mb-4"
      ></textarea>

      {!clientSecret ? (
        <button
          onClick={handleRequest}
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment ($25)"}
        </button>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleRequest={handleRequest}
            onPaymentSuccess={handlePaymentSuccess}
            orgName={orgName}
            mission={mission}
          />
        </Elements>
      )}
    </div>
  );
};

export default RequestCharityRole;
