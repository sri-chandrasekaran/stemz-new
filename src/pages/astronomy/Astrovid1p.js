import React from 'react';
import VideoLessonPage from '../components/VideoLessonPage';

const Astrovid1p = () => {
  return (
    <VideoLessonPage 
      lessonTitle="Lesson 1: The Solar System"
      lessonNumber="lesson1"
      courseKey="astronomy"
      videoUrl="vy2NuP1ITFo"
      
      // Resource paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTGK-o-RiizZsV2YB4f_lMoLouCf4yxPvwMFLqZRS4gy53vWsrFJ0Ldf_GbWkPU5ulKrOsByciosSn6/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/astroworksheet1"
      
      // Notes - parent version
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTdGKXqqYoyPqLKc0Ld-IO4bzXW_3duz3FE2ftNBGyrckhh9ZmfiISNx_6CL6E0zjrhoD8hLle8ReI_/pub"
      notesLabel="Parent Notes"
      
      // Version type
      isParentVersion={true}
      
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
    />
  );
};

export default Astrovid1p;