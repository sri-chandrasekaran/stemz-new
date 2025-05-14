import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const circuit3p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Creating a Functioning Circuit"
      lessonNumber="lesson3"
      courseKey="circuits"
      videoUrl="4ZBUoBPdojA"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQHwS6QoKw-5dD3US0sKlltaH2sezbHE0gkWm1ZYDR-mmL_CQtGl1lIvpJMas7-3Lse-thok9I-jYjP/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/circuitquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRthI5zVTwgnH7Pbhej4zBWwtFqR3G7IucVZ72-zsy12cFopwbpuDTMX-FOCjsnTdiydO0RVJPvRaNj/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0}
      completionThreshold={95}
      // Version type
      isParentVersion={true}
    />
  );
};

export default circuit3p;
