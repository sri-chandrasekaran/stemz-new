import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const chem1 = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 1: Chemistry & Matter"
      lessonNumber="lesson1"
      courseKey="chemistry"
      videoUrl="qUcexzJnLew"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vR5q3_yft5X--ouH78cIbOWuLlUpQak03rKJflUQL509vC9zycyy2A29QaFSqLTxVr7dRfS8sYE2cUy/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTPBVF7KrSZCQf5VUTaBGSgPTuLC8NvG2hXMHoOhyUmqURO9G-2UEcz_9nFCiRUspfboDLbfpdve260/pub"
      notesLabel="Parent Notes"
      
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0}
      completionThreshold={95}
      
      // Version type
      isParentVersion={false}
    />
  );
};

export default chem1;