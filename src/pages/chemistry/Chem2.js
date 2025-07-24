import React,{ useEffect, useState }  from "react";
import VideoLessonPage from "../../components/VideoLessonPage";
import { call_api } from '../../api';

const Chem2 = () => {
  const [bpqQuestions, setBpqQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseKey = "chemistry";
  const lessonNumber = "lesson2";
  const lesson_id = "2";

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
      lessonTitle="Lesson 2: Molecules & Atoms"
      lessonNumber="lesson2"
      courseKey="chemistry"
      videoUrl="EJpJLOAIHRc"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQKljVI6VZS6jFU7ajZLtgJI2Jp4o2jqvxXDxOjLe__NGezj6cjzAsbAiJGheSEk0WVOY3a8G7vV8j6/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSie8ZIl-MnXPw0MyeRdRi-TjA7K70IBpHKkK9ByoWAtbWP4i4NqRf2l3ejDG2Fd3zAQNzZMDpXoYHi/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default Chem2;
