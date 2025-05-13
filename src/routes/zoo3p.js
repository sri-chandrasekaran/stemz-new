import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const zoo3p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 3: Distribution"
      lessonNumber="lesson3"
      courseKey="zoology"
      videoUrl="PpDLfndy7zs"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSqfld47M2TIa1WeoHI5DybsrO8u-aNgPkolXwbmzjSbJAZgTsTL98HZdYDtAlfUk67GID90a2cdn8A/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQ6IrHzAJ61lqKZikOwzm0lYwn1L4P4364t03B5JSt5sKVuzRh0HitDST6hJ8NEAOj7X_WGq7vhXDe2/pub"
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

export default zoo3p;