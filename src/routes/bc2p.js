import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const bc2p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 2: Conditional Statements & Loops"
      lessonNumber="lesson2"
      courseKey="basicsOfCoding"
      videoUrl="gG1fPD2TrnY"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vR8aUGbuGrjxfsfu62phxwh9aK_46HS1evKG6XF9l2hV9vZECiExT5pMtgRtYv8BXqenKyTbSiSWeNd/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSL3-yArGxNY6hYaMSbzItgO2SPHlgA4A-58nL0s-A018k6pBsxxBFmsjx2xgBici_UA9Spdkt5u2HK/pub"
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

export default bc2p;