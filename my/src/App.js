import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOfOrder/PlaceOfOrder";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import SignUpFeature from "./components/SignUpFeature/SignUpFeature";
import LoginFeature from "./components/LoginFeature/LoginFeature";
import Footer from "./components/Footer/Footer";
import AboutInformation from "./components/AboutInformation/AboutInformation";
import MobileApp from "./components/MobileAppDownload/MobileAppDownload";
import Cart from "./pages/Cart/Cart";

const App = () => {
  const [category, setCategory] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Handle login success
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/"); // login হলে homepage এ redirect
  };

  // ✅ Logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Protect Routes
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home category={category} setCategory={setCategory} />
              <AboutInformation />
              <MobileApp />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <div className="menu-page">
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={
          <LoginFeature
            setShowLogin={() => {}}
            setShowSignUp={() => {}}
            onSuccess={handleLogin}
          />
        }/>
        <Route path="/signup" element={
          <SignUpFeature
            setShowSignUp={() => {}}
            setShowLogin={() => {}}
            onSuccess={handleLogin}
          />
        }/>
      </Routes>
    </div>
  );
};

export default App;


