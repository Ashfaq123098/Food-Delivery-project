import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        alert("Payment failed");
        navigate("/");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong!");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;
