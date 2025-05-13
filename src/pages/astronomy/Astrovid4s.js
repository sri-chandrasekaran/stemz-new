import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const Astrovid4s = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 4: The Universe"
      lessonNumber="lesson4"
      courseKey="astronomy"
      videoUrl="ImEEVWosix4"
      
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRBR7LWZPQEuS4askp8IyxBgOsIoMZjNXB7vDqIHp3DHQYdL_tbrTz49ufdA47Piq_n82wiLyTTAMJm/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/astroquiz"
      
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRLucP73Qzt0xNM3WWG-MZOBvc07qHmKH6_5IUODTfrDzVwT3x9kenz5DdEr0okM3805Z7YMTTU2Z6I/pub"
      notesLabel="Student Notes"
      
      // Points configuration
      maxVideoPoints={7}
      quizPoints={10}
      completionThreshold={95}
      
      // Version type
      isParentVersion={false}
    />
  );
};

export default Astrovid4s;