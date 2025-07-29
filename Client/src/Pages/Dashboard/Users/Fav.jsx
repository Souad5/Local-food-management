import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`https://assignment-12-xi-neon.vercel.app/api/favorites?userEmail=${user.email}`);
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [user.email]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://assignment-12-xi-neon.vercel.app/api/favorites/${id}`);
      setFavorites(favorites.filter((fav) => fav._id !== id));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (favorites.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No favorite donations yet.</p>
    
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div key={fav._id} className="bg-white rounded-xl shadow-lg p-4">
          <img src={fav.image} alt={fav.donationTitle} className="w-full h-40 object-cover rounded-md mb-3" />
          <h2 className="text-xl font-semibold">{fav.donationTitle}</h2>
          <p className="text-gray-600">
            {fav.restaurantName}, {fav.location}
          </p>
          <p>Status: <span className="font-medium">{fav.status}</span></p>
          <p>Quantity: {fav.quantity}</p>

          <div className="mt-4 flex justify-between">
            <Link
              to={`/all-donation/${fav.donationId}`}
              className="btn btn-primary hover:bg-blue-600"
            >
              Details
            </Link>
            <button
              onClick={() => handleRemove(fav._id)}
              className="btn btn-error hover:bg-red-600"
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
