import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const chem3 = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 3: Chemical Reactions"
      lessonNumber="lesson3"
      courseKey="chemistry"
      videoUrl="448XzSXabc4"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vShEXZnajB9Zk1rN6jWDOmOVoZxfO5-DdRck_tdIDdP7nUl0XP66VOKfpxMZsn2uicoo2tsYu6YFMj4/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRHLSvHpwUKgeHsOfZO1dUIrTZyp4iPF-u5phmzF7rHVB9sZhBhRRXJkkdGVev_faj6gbuFTf4NZGaG/pub"
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

export default chem3;