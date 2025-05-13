import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const psych2p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: How the Brain Works"
      lessonNumber="lesson2"
      courseKey="psychology"
      videoUrl="ieBDGtmN2fI"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSwdI1tt0FEe_54fVi9V9UPJnHT9_1z4YqQnI7eHUt3p2WcUDCPGOxrx0XG8bTXhOBh-TA13OPnNrWG/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/psychworksheet2"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vR-Nmv-NFBm6ysi_jofwj23qFbrGrr6VcxAsCBYm3y7GgCoh9gRaN1WVxiRPTRFkHZ71DkuRW26rYfH/pub"
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

export default psych2p;
