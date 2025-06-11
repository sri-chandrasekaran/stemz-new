import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const stat2s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: Advanced Percents"
      lessonNumber="lesson2"
      courseKey="statistics"
      videoUrl="zL7QABzjyxA"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQ3OQdzTer_4ePeXx4JeHruqJH7QQGcJpM6XvhFs1QwD1RjjlIeidOW72rODGGY_vyZukSw1ZiYPK4B/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQfYUYFgYhrlIRHGVZc2IZW5eMOyFBHqBsTByh-c9UkkJPa3-MIbMKM1BlV9WZp1Ua70qVCD3Trxozc/pub"
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

export default stat2s;
