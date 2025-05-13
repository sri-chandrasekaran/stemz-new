import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const stat2p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 2: Percentages"
      lessonNumber="lesson2"
      courseKey="statistics"
      videoUrl="zL7QABzjyxA"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTrpIsoR9tIFFL-0QdQlzsglzFmsebHKhVR8LtdUN3pEfivgEcm_G_Wsi2zUG0QmDQeteYRQ0j8nqC6/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRKQXrcRiT3Uyj7NLTvq1qk22E6PJhvqfu6czstUut0N87Q9E-Bwxei7EbB057MR51brkG9nM9WjToF/pub"
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

export default stat2p;