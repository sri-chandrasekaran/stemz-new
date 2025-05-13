import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc4s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 4: Final Review"
      lessonNumber="lesson4"
      courseKey="basicsOfCoding"
      videoUrl="6czRyGrNf_4"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQXC7LPlQ_Ez1YlP0PiWGSPutT3F1jPHAo88v7YQQNZ0ykLYKINi_KKFp0HgZkln3bTOpDmMeIBbcw6/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/bcquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTR2gynBeVQELbLLRfWnobN29LGDrlyw2y0epddcQ9-6p2XHBDE4K7OHoTnJLh_lJZSEHiDsG317C2D/pub"
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

export default bc4s;