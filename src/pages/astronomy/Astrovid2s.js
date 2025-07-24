import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const Astrovid2s = () => {

  const courseKey = "astronomy";
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
      lessonTitle="Lesson 2: Galaxies"
      lessonNumber="lesson2"
      courseKey="astronomy"
      videoUrl="0MG58dFzUkU"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSgXqu9vIHDXjitX678G5HqDLyv-MOHxLOEB5kgoNLv5Uf8JinGBASHGVzB7fp7gqUM_iW9E7jClUu7/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null} // No worksheet for this lesson
      quizPath={null} // No quiz for this lesson
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRKnZALs45B6cuCMLoV_o8TjaUZ6wSllEgIuOo6nxUdpHzNmisWkI1YV79X5QPuS5c1PBIwx8mnP8OH/pub"
      notesLabel="Student Notes"
      // Points configuration
      maxVideoPoints={7}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default Astrovid2s;
