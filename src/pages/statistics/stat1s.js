import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const stat1s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Fractions"
      lessonNumber="lesson1"
      courseKey="statistics"
      videoUrl="imGo9o7Epo8"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQXt__U1gRTqP3LdkzYYNiPuh61QC-hbuPGbO7ydDZvms5irzb6pyMMA4RZkQ72Ce2of10c79BA1b48/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/statworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRFyv-Bf5IJEwIV4rkW60sG8szGUYtIQPvCMYy5hV6qqPgrlERlQfOxg2nyJNLG8SW8WbyggjJhDoiX/pub"
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

export default stat1s;
