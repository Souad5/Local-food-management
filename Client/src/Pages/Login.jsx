import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "./UseAuth";
import { saveUserInDb } from "../Api/Utilis";
import LoadingSpinner from "../Api/LoadingSpinner";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await saveUserInDb(userData);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await saveUserInDb(userData);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-8 space-y-8 border border-gray-200 dark:border-gray-700">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Log In</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="*******"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" size={24} />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">OR</p>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Continue with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-lime-600 hover:text-lime-500 font-semibold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
