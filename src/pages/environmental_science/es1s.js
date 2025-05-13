import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const es1s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Biomes"
      lessonNumber="lesson1"
      courseKey="earthscience"
      videoUrl="_WRumK_NwfI"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTETrqYtujM4TATeiPQ8u3WnX-dIbUwUFclqik-GDn7w7HMQ2ZEulSuWZescS0FPJ9zX8F-Pdyt4J7g/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/esworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTT4pw3kWlJ4Za6GSGBcnc7tAnI2GupEZwwWg7G8GLHqja_4lf6250YYj58ktt_430OVdCshhh46mWD/pub"
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

export default es1s;
