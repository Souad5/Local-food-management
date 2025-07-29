import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-[100px] font-extrabold text-gray-800 mb-4 leading-none">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};



export default NotFound;
