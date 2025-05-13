import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc1s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 1: Introduction to Scratch"
      lessonNumber="lesson1"
      courseKey="basicsOfCoding"
      videoUrl="t7CqLrelByA"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vS4npkowAwm_tsvN8WP6jaWYxGrgEN4BxtGBvEJvWj_j7HQB4Swp5ZZip5Mg7Qo1h4MMjboOM5mfqJe/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null} // No worksheet for this lesson
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQ3PDkd9xakt8AH9CAshCvpVHHwvNrWuFhNlad8IAydFV0HfBc1PbI6BFt5P2FNtXwh3ro25NsE3Ape/pub"
      notesLabel="Student Notes"
      
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0} // No worksheet points
      completionThreshold={95}
      
      // Version type
      isParentVersion={false}
    />
  );
};

export default bc1s;