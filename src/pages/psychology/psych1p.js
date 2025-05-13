import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const psych1p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Psychology & Scientific Method"
      lessonNumber="lesson1"
      courseKey="psychology"
      videoUrl="TjGatGI4CJM"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vR-iF2QE-QfA169iGTlJz4-O1JSRFULHD5UqayrcGcQM3ApYhomic3jiqewcNlC-mYTquo3AxBe8_qI/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/psychworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQpXiApP3xQiPMyaMsGfkZBNHarI1WasyV0z0ivEVBv3Bmkt2QwnNiL5ln26wvxKePKk7BlLBRruomb/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
      // Version type
      isParentVersion={true}
    />
  );
};

export default psych1p;
