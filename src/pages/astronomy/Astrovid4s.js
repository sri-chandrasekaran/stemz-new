import React,{ useEffect, useState }  from "react";
import VideoLessonPage from "../../components/VideoLessonPage";
import { call_api } from '../../api';

const Astrovid4s = () => {
  const [bpqQuestions, setBpqQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseKey = "astronomy";
  const lessonNumber = "lesson4";
  const lesson_id = "4";

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
        
        if (!userDetailsResponse.grade) {
          console.error("User has no grade field. User object:", userDetailsResponse);
          return;
        }

        const userGrade = userDetailsResponse.grade;
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
      lessonTitle="Lesson 4: The Universe"
      lessonNumber="lesson4"
      courseKey="astronomy"
      videoUrl="ImEEVWosix4"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRBR7LWZPQEuS4askp8IyxBgOsIoMZjNXB7vDqIHp3DHQYdL_tbrTz49ufdA47Piq_n82wiLyTTAMJm/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/astroquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRLucP73Qzt0xNM3WWG-MZOBvc07qHmKH6_5IUODTfrDzVwT3x9kenz5DdEr0okM3805Z7YMTTU2Z6I/pub"
      notesLabel="Student Notes"
      // Points configuration
      maxVideoPoints={7}
      quizPoints={10}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
      bpqQuestions={bpqQuestions}
    />
  );
};

export default Astrovid4s;
