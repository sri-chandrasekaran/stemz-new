import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const chem2 = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 2: Molecules & Atoms"
      lessonNumber="lesson2"
      courseKey="chemistry"
      videoUrl="EJpJLOAIHRc"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQKljVI6VZS6jFU7ajZLtgJI2Jp4o2jqvxXDxOjLe__NGezj6cjzAsbAiJGheSEk0WVOY3a8G7vV8j6/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSie8ZIl-MnXPw0MyeRdRi-TjA7K70IBpHKkK9ByoWAtbWP4i4NqRf2l3ejDG2Fd3zAQNzZMDpXoYHi/pub"
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

export default chem2;