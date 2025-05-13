import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const psych3p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 3: Memory"
      lessonNumber="lesson3"
      courseKey="psychology"
      videoUrl="Y3OVQ2mD9mo"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTzTX8fYW2ajHfBZsT2TVRDlFe1V61WqrcERXhvCs4d7prhwpTEwXgi-ckxDI7MDwHuQFIumS5GFG3W/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRR8EtKkhybajXoz4VYqNbKBDsQ-kbtTCfJifYazrVtFGN9ZIruCSevWbEuA-lFAbxD1jBMHG03LAwN/pub"
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

export default psych3p;