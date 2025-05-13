import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc1p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 1: Introduction to Scratch"
      lessonNumber="lesson1"
      courseKey="basicsOfCoding"
      videoUrl="t7CqLrelByA"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQIQHNBGVlreu81AHlfE7x2aGQWdZAZmwfpvat674Lv0GJ_wF9PhrPsPE0Fhxvresr084xzW8J4xeO4/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null} // No worksheet for this lesson
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vS0qe1b7koyWmBpAVgEPLEvp8lkumGl48m6vQO9gGreE9R3Bhpji2bOsmrCp4RZjmK9PQIan7CArT_k/pub"
      notesLabel="Parent Notes"
      
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0} // No worksheet points
      completionThreshold={95}
      
      // Version type
      isParentVersion={true}
    />
  );
};

export default bc1p;