import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const zoo5p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 5: Anatomy & Physiology"
      lessonNumber="lesson5"
      courseKey="zoology"
      videoUrl="ga7BP8zSDMg"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSNmqmcybpJIzBDT0EwPUGnQf2kI0BuU2WmKzudKGDW5riiOoXJUZ6tPgtKdw0YWgWHotNbZexr4Zle/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/zooquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRZ-Cxlbxlbu8oHYu5l2IOLJFl2IKKJjao2wVIDZbfjF8OYscaej0S-O1sh2dx36xF8IqDrO6GhLLsC/pub"
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

export default zoo5p;
