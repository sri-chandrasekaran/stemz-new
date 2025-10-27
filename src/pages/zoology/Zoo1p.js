import React,{ useEffect, useState }  from "react";
import VideoLessonPage from "../../components/VideoLessonPage";
import { call_api } from '../../api';

const Zoo1p = () => {
  const [bpqQuestions, setBpqQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseKey = "zoology";
  const lessonNumber = "lesson1";
  const lesson_id = "1";

  useEffect(() => {
    const fetchBPQs = async () => {
      try {
        // Step 1: Get the current user's grade (same as Quiz component)
        console.log("Step 1: Getting user info from auth/verify");
        const userResponse = await call_api(null, "auth/verify", "POST");
        console.log("Auth verify response:", userResponse);
        
        if (!userResponse || !userResponse.user) {
          console.error("Could not get user info");
          return;
        }

        console.log("Step 2: Getting user details with ID:", userResponse.user.id);
        // Get the full user details to access grade
        const userDetailsResponse = await call_api(null, `users/id/${userResponse.user.id}`, "GET");
        console.log("User details response:", userDetailsResponse);
        
        if (!userDetailsResponse) {
          console.error("Could not fetch user details");
          return;
        }
        
        if (!userDetailsResponse.gradeLevel) {
          console.error("User has no grade field. User object:", userDetailsResponse);
          return;
        }

        const userGrade = userDetailsResponse.gradeLevel;
        console.log(`Step 3: User grade found: ${userGrade}`);

        // Step 4: Now fetch BPQ questions with the user's actual grade
        console.log(`Step 4: Fetching BPQ questions for course: ${courseKey}, lesson: ${lesson_id}, grade: ${userGrade}`);
        const response = await call_api(null, `bpqquestions?course_id=${courseKey}&lesson_id=${lesson_id}&grade=${userGrade}`, "GET");
        console.log("BPQ API response:", response);
        
        if (response && response.questions) {
          // Convert backend fields to expected frontend shape
          const formatted = response.questions.map((q) => ({
            text: q.questionText,
            time: q.timeInVideo,
          }));
          setBpqQuestions(formatted);
          console.log(`Loaded ${formatted.length} BPQ questions for grade ${userGrade}`);
        } else {
          console.log("No BPQ questions found for this grade level");
        }
      } catch (error) {
        console.error("Error fetching BPQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBPQs();
  }, [courseKey, lesson_id]);

  if (loading) return <div>Loading video lesson...</div>;
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Classification & Taxonomy"
      lessonNumber="lesson1"
      courseKey="zoology"
      videoUrl="pEDK7r21GBM"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQX54pfNPy3LsDG1TCZGj6FQydW8ZVCaPKcAykyBwV3j7pM3ZU1hIkAsjLY92i7s3EUICgdiSVdgEkO/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQlPRXMCAbRcZ5te8WPSoPYemQfzEJzJgGvh2KOkjKuGHZD-8-rGG4zZ_08P9trbXA7dkKX_mUO60TD/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
      // Version type
      isParentVersion={true}
      bpqQuestions={bpqQuestions}
    />
  );
};

export default Zoo1p;
