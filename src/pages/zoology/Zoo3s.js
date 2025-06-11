import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const zoo3s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Distribution"
      lessonNumber="lesson3"
      courseKey="zoology"
      videoUrl="PpDLfndy7zs"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSQoqfHLL1UHfd2eOsllueMmbIJ7Ie77Fl8NrHef65qwtTvCGrl7zF-o5dASRsUc55k1C39uFIvRD6W/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQNkEUq4OOh5YOFgEtbKJwqJMz1io4fJqSb_gljynYnGikMfGcgR1EaBhPcB8EotDx5134PwvsTTqMz/pub"
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

export default zoo3s;
