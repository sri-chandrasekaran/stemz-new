import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const zoo1s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Classification & Taxonomy"
      lessonNumber="lesson1"
      courseKey="zoology"
      videoUrl="pEDK7r21GBM"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRwPRFdEPIJpiFnTcv1iceie5izcMvKZOcPX1aYRCIOOc1ZThFV_8ayBGIUkSucSXR8lPIUVEeNSpZW/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTJ7bigOJB6NRLgegaL-e1cLO_E1G4SwTPXBtBHEgM6jOzEvZBII-ZoKOQiRc1lPny49vLviKnny05b/pub"
      notesLabel="Student Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default zoo1s;
