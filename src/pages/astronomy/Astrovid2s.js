import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const Astrovid2s = () => {
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
