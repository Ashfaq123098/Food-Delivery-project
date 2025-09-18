import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Check localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    } else {
      setShowLogin(true);
    }
  }, []);

  // ✅ Handle login success
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);
    setShowSignUp(false);
  };

  // ✅ Logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowLogin(true);
  };

  // ✅ Protect Routes
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        setShowLogin={setShowLogin}
        onShowSignUp={() => setShowSignUp(true)}
      />

      {/* SignUp & Login Modals */}
      {showSignUp && (
        <div className="modal-overlay">
          <SignUpFeature
            setShowSignUp={setShowSignUp}
            setShowLogin={setShowLogin}
            onSuccess={handleLogin}
          />
        </div>
      )}

      {showLogin && (
        <div className="modal-overlay">
          <LoginFeature
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
            onSuccess={handleLogin}
          />
        </div>
      )}

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
      </Routes>
    </div>
  );
};

export default App;

