import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const stat5p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 5: Surveys & Real World"
      lessonNumber="lesson5"
      courseKey="statistics"
      videoUrl="folkaRAmLWw"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQ08TtGwW-qDJPmRtsujKLMhcgzM35YXHQhrc9G7StcjBNfWvKbuqpXVmlfBdTHbAkC_9I2GiH7lqOQ/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/statquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTBQLB9YxKYD8x633Rk2fdIzVb-xrFsYXgtcOJA5G29ifZjqnFENbC6spvcyyNPT7NNnYwonqoetUSY/pub"
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

export default stat5p;