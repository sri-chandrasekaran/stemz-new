import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const es4s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 4: 3 R's and the Environment"
      lessonNumber="lesson4"
      courseKey="earthscience"
      videoUrl="-0xfaF9ca9k"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTkEDxEQ9eK8Rg_MuiJAqBrryAh1n2WFy6h0a1XBpyjof7e5BU0exKKA2VpmolPfo9WkeNqCf_zbi3Y/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/esquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTpQRzrcYMEGFAN-vlYrHeqQu9v4dJZoT6qAfozJbghpJ9l0IlBf1R2vsUV6s6np5fwV6uN94XtP6ZP/pub"
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

export default es4s;