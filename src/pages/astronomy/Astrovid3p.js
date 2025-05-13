import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const Astrovid3p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 3: Space and Humans"
      lessonNumber="lesson3"
      courseKey="astronomy"
      videoUrl="v4pT0yllkO0"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTSxvdIuzlZ9z_0_IQyQRKq2l46jjbbZUnsyzp-O38OvjEFaCExoDORLKrbCJcqrFCozztoypoy3YhK/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/astroworksheet2"
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vS3iD-PzMmqQS504HQMMXvMEqbXKCFOw2AGHZb8w-X57NtqWiVdpLAswvuioJxlUCGbDLMouSlySKtM/pub"
      notesLabel="Parent Notes"
      
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
      
      // Version type
      isParentVersion={true}
    />
  );
};

export default Astrovid3p;