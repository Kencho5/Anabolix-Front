import AppRoutes from "./router/AppRoutes";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
