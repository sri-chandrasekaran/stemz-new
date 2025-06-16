import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const circuit3s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Creating a Functioning Circuit"
      lessonNumber="lesson3"
      courseKey="circuits"
      videoUrl="4ZBUoBPdojA"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vStzXOIL0KO1ZWEteH-M4GBxEiGHra_5adVCnfMeZrmxECPUEPk72B5ztFf05HBPo_YvqpYOw2mUsAJ/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/circuitquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQDJpfPnMdS6WrNAzzVMR-1e_pVHjRRuddxJ73rE-7oOe4zLpuGoMHzeGqjIkhlfUa6BJtNDZL5pPVw/pub"
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

export default circuit3s;
