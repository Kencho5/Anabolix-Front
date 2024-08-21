import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <div id="app">
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
