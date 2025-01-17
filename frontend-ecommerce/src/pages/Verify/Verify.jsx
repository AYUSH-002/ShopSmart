/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import "./Verify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  console.log(success);
  console.log(orderId);
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
