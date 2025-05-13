import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const stat3s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Advanced Percents"
      lessonNumber="lesson3"
      courseKey="statistics"
      videoUrl="WY7m3HsZf0k"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTAhU91EJ_z6iX-djK_T7sbUCHF8hQUWOR6uCK4GgM1v0725AOGG_LW97hQoFwQvNwQNH_DlBqJHcCV/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/statworksheet2"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSIUzrGRC5VAc1ZHeVUJF-xrFpY9-M9CJ6gXZsZ3oxd6btLRCWb_jCll0Y_aWKvRU3SMUC0voYTQbnc/pub"
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

export default stat3s;
