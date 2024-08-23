import { useReducer } from "preact/hooks";
import { useAuth } from "../auth/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

interface State {
  username: string;
  password: string;
  error: boolean;
  isLoading: boolean;
}

type Action =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: State = {
  username: "",
  password: "",
  error: false,
  isLoading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { login } = useAuth();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    });

    if (response.ok) {
      const { token } = await response.json();
      await login(token);
      dispatch({ type: "SET_ERROR", payload: false });
    } else {
      dispatch({ type: "SET_ERROR", payload: true });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-stone-100">
      <div className="mt-10 w-full max-w-sm transform rounded-lg bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={state.username}
              onInput={(e: Event) =>
                dispatch({
                  type: "SET_USERNAME",
                  payload: (e.target as HTMLInputElement).value,
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition duration-200 ease-in-out focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={state.password}
              onInput={(e: Event) =>
                dispatch({
                  type: "SET_PASSWORD",
                  payload: (e.target as HTMLInputElement).value,
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition duration-200 ease-in-out focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {state.error && (
            <div className="mb-4 rounded-md bg-red-100 p-4 text-red-600">
              <p>Incorrect login information.</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full transform rounded-lg bg-teal-600 px-4 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-200 ease-in-out focus:outline-none ${
              state.isLoading
                ? "cursor-not-allowed bg-teal-400 motion-safe:animate-pulse"
                : "hover:scale-105 hover:bg-teal-700"
            }`}
          >
            {state.isLoading ? "Submitting..." : "Login"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-teal-600 transition duration-200 hover:text-teal-700"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
