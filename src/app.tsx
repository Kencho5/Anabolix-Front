import { Router, Route } from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <div id="app">
      <AuthProvider>
        <Navbar />
        <Router>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
