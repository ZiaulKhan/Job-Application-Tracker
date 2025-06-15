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

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="layout-container">
          <Router>
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
                <Route
                  path="/add-job"
                  element={
                    <ProtectedRoute>{/* <AddJobPa /> */}</ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-job/:id"
                  element={
                    <ProtectedRoute>{/* <EditJobPage /> */}</ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
