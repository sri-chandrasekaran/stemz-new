import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const Astrovid4p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 4: The Universe"
      lessonNumber="lesson4"
      courseKey="astronomy"
      videoUrl="ImEEVWosix4"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRpqUfykZPXPH0cs9Vi2IkyK8u25HEDi37Q8tVm7lt1-7C-CJ6VYBk1x2hLsmRAo1IzMOupWsQG51EM/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/astroquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSJoM_1V3iKpEWQWyFD16H42QDO_p-PGzFOS_28HJkfu6XUGzOavBacpqEPxgWQikdeOMVQsOuZPVck/pub"
      notesLabel="Parent Notes"
      
      // Points configuration
      maxVideoPoints={7}
      quizPoints={10}
      completionThreshold={95}
      
      // Version type
      isParentVersion={true}
    />
  );
};

export default Astrovid4p;