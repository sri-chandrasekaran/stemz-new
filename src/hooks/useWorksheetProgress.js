import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

export function useWorksheetProgress(courseKey, lessonNumber) {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const statusTimeoutRef = useRef(null);

  const showStatus = (message, duration = 3000) => {
    setStatusMessage(message);
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setStatusMessage(""), duration);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await call_api(null, "auth/verify", "POST");
        if (response && response.success) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
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

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUserProgress = async () => {
      try {
        const response = await call_api(null, "points", "GET");
        if (response) {
          setUserProgress(response);
          if (response.courses && response.courses[courseKey]) {
            const lesson = response.courses[courseKey].lessons[lessonNumber];
            if (lesson?.activities?.worksheet) {
              setWorksheetCompleted(
                lesson.activities.worksheet.completed || false
              );
              setPointsEarned(lesson.activities.worksheet.earned || 0);
            }
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching course progress:", err);
        setLoading(false);
      }
    };
    fetchUserProgress();
  }, [isAuthenticated, courseKey, lessonNumber]);

  return {
    userProgress,
    setUserProgress,
    loading,
    worksheetCompleted,
    setWorksheetCompleted,
    pointsEarned,
    setPointsEarned,
    statusMessage,
    showStatus,
  };
}
