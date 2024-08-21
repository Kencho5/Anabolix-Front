import { useState } from "preact/hooks";
import { useAuth } from "../auth/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      await login(token);
      setError(false);
    } else {
      console.error("Login failed");
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-stone-100">
      <div className="w-full max-w-sm p-8 mt-10 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-stone-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onInput={(e: Event) =>
                setUsername((e.target as HTMLInputElement).value)
              }
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onInput={(e: Event) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
              <p>Incorrect login information.</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm focus:outline-none ${
              isLoading
                ? "cursor-not-allowed bg-stone-500 motion-safe:animate-pulse"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? "Submitting..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
