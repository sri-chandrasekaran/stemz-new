import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const zoo5s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 5: Anatomy & Physiology"
      lessonNumber="lesson5"
      courseKey="zoology"
      videoUrl="ga7BP8zSDMg"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQKZpiTBUh29upJV52nO4bOdgrHnfdk8Am25TbXNLBlVtzHZoo1TTvFXkJuSgW-xfFk34B4-aQvKtKv/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/zooquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSuDbQnsS-_fsq1WqEXcdEehivpafWZjBxDeZxMoRf9aKimiWjogQ1AJI_Gcc5Q3v0S08aB_KZlxP0W/pub"
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

export default zoo5s;