import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const chem4 = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Putting It All Together"
      lessonNumber="lesson4"
      courseKey="chemistry"
      videoUrl="NpQJoCQEa9U"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTi31s7F-Y-p_eSS9f_yvkGbt33v3uSJvbjLb1nBWSrWXyzybuE1Xm10rJmVCAunb-VYoCYonFi7unM/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/chemquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTAIWqN5RXNd7BmP8OK-Nh1A-0z5rRmaqAti_EwE4qTV4JYJqc5kNaTasJ3PyRhNW-MjwC5F9Vq1mKS/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default chem4;
