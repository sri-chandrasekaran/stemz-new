import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc4p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 4: Final Review"
      lessonNumber="lesson4"
      courseKey="basicsOfCoding"
      videoUrl="6czRyGrNf_4"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQ9Al1CuqZfkkt6NTH4PpwMk60fKasN_NVdGE1-Jnbl9Yr7MX2vTvZXgwWWroo08qHJoGFpSa3LfzCc/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/bcquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTh0P1Vp-4xqQjBFZnUI2idmKVogmYfPPYWmVJb5MC0avSUQ3o4ZGD0C_3NcGnP9IEL4-tTDubNlnPQ/pub"
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

export default bc4p;