import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc3s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 3: Wait & Sensors"
      lessonNumber="lesson3"
      courseKey="basicsOfCoding"
      videoUrl="qEcc3yjrwOI"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRz2Ja674DK6FIdkV6eiGmiPMDPE3mflJYOnq3o9A9sJ2YdMrGZrnEnJS4lfumUWw17sXRHDt9aZnAv/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQwUEawulK8jasg51X7Xvt6ll2V8eECvy66JuNpdkUiyqcNgIy5L0PIRM7ZlrdlbQLJ_KMYIgR8mElS/pub"
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

export default bc3s;