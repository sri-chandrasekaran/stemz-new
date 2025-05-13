import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc2s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 2: Conditional Statements & Loops"
      lessonNumber="lesson2"
      courseKey="basicsOfCoding"
      videoUrl="gG1fPD2TrnY"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSzibStSCV4ZCIkakqRBA9QG1MewqaahZ5Pg78S_tL7GNJQeg7RFUDTepQIAZCCxmUhJVGS9SaDQ49D/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRvsi-PhT9-ytCbgSjy-hUf13vBwjkxcCV0p0WIWKCr47f1cGhW1S4TkQVL-vxRwf_oXfX4rE3UhX3A/pub"
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

export default bc2s;