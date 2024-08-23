const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-800">404</h1>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
      <p className="mt-4 text-gray-500">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go to Homepage
      </a>
    </div>
  </div>
);

export default NotFound;
