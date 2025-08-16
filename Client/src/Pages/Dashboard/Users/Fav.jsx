import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `https://assignment-12-xi-neon.vercel.app/api/favorites?userEmail=${user.email}`
        );
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user.email]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(
        `https://assignment-12-xi-neon.vercel.app/api/favorites/${id}`
      );
      setFavorites(favorites.filter((fav) => fav._id !== id));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <p className="text-center mt-20 text-lg">
        No favorite donations yet.
      </p>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div
          key={fav._id}
          className="  rounded-xl shadow-md p-4 flex flex-col justify-between transition-transform hover:scale-105 border"
        >
          <img
            src={fav.image}
            alt={fav.donationTitle}
            className="w-full h-44 object-cover rounded-md mb-4"
          />
          <div className="space-y-2 flex-1">
            <h2 className="text-xl font-semibold">{fav.donationTitle}</h2>
            <p className="">
              {fav.restaurantName}, {fav.location}
            </p>
            <p>
              Status:{" "}
              <span className="font-medium ">
                {fav.status}
              </span>
            </p>
            <p>
              Quantity:{" "}
              <span className="font-medium ">
                {fav.quantity}
              </span>
            </p>
          </div>
          <div className="mt-4 pr-4 flex justify-between">
            <Link
              to={`/all-donation/${fav.donationId}`}
              className="btn btn-primary w-1/2 mr-2 hover:bg-blue-600"
            >
              Details
            </Link>
            <button
              onClick={() => handleRemove(fav._id)}
              className="btn btn-error w-1/2 ml-2 hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
