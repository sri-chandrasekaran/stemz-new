import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const circuit1s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Circuits & Circuit Boards"
      lessonNumber="lesson1"
      courseKey="circuits"
      videoUrl="MFr0Y52UICk"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vR06yiOBnjwl3Ymd4rGFmrZjxRJHqLrVCRscfVMIrGmS5p-LSWYYuPMqUO2E6gp2TZVR8SW77o0agIV/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vS0xvCCLs7UzzjxA8LIfKAcw1x4_jjOU5kgYHTWtwXZcPAMSRuIUb9G94cBE4mvNtI0weRL2cdWlV_5/pub"
      notesLabel="Student Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default circuit1s;
