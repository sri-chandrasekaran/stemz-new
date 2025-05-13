import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const psych2s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: How the Brain Works"
      lessonNumber="lesson2"
      courseKey="psychology"
      videoUrl="ieBDGtmN2fI"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQvThekOp1Uyx4JxE4HDcOY36-yVunUZ57jaHan0_PmzAcE2TjJ0nO87huLkA6W9jzFiz3GCtpP0qeL/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/psychworksheet2"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTl-aABmhL5w7aNE0ur_41aO1xfeyf_BzbVN-5JuqlfEAIpbKvuEzPNhQSq_HPiEyQSiXfEiIBQT8J2/pub"
      notesLabel="Student Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default psych2s;
