import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import { useEffect } from "react";
import { ToastProvider } from "./context/ToastContext";
import "./styles/toast.css";
import NotFound from "./pages/NotFound/NotFound";
import { JobAppProvider } from "./context/JobAppContext";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <JobAppProvider>
            <div className="layout-container">
              <Navbar />
              <div className="app-container">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </JobAppProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
