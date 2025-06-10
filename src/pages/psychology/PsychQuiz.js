import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HeroOther from "../../components/HeroOther";
import Footer from "../../components/Footer";
import Quiz from "../../components/Quiz";
import { call_api } from "../../api";


const Psycquiz = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verify authentication
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login page");
        navigate("/login");
        return;
      }

      try {
        console.log("Token found, verifying...");
        const response = await call_api(null, "auth/verify", "POST");

        if (response && response.success) {
          console.log("Token verification successful");
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          console.log("Token verification failed");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <HeroOther overlayText="Psychology Quiz" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading quiz content...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Psychology Quiz" />
      <div className="vidbig">
        {isAuthenticated && (
          <Quiz
            src="/assets/psycquiz.json"
            courseKey="psychology"
            lessonNumber="lesson4"
          />
        )}
      </div>
      <div style={{ paddingBottom: "200px" }} />
      <Footer />
    </div>
  );
};

export default Psycquiz;
