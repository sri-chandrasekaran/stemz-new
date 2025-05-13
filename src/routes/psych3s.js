import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const psych3s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 3: Memory"
      lessonNumber="lesson3"
      courseKey="psychology"
      videoUrl="Y3OVQ2mD9mo"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQMlxTVnjuwUnqRF-19HVNt6HHu8WnJPckG2TfMaXRvvYcZXaS9hCJ8sdVF5n1SI6kKT0IUF-dcCnEJ/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQUvS9kstKV8jCprw7Owr0SgxKlSGmmtqIjRO1esVhpuyoNsE93KX-CYMEC6U01Y0napncppAypVPZK/pub"
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

export default psych3s;