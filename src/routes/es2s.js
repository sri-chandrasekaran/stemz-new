import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const es2s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 2: Cycles of the Earth"
      lessonNumber="lesson2"
      courseKey="earthscience"
      videoUrl="mpu_qNfo-dM"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQdwDDAg4Ol8VRSph1a-njCcM0PSQoeBsAenz63MwxFCsi5nQlOVZmiQwMqkCrhMNy-3TypvNM86SnG/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTmXqYzRTjn1XVSnepm7X-8YVyZ-Om6O0rxm3edmpi22Lj7IcRaiMqtArYsz7CHvspkcnZI-Up7w6Gl/pub"
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

export default es2s;