import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const Astrovid2p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: Galaxies"
      lessonNumber="lesson2"
      courseKey="astronomy"
      videoUrl="0MG58dFzUkU"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQdWU47l-5s2mNONAWdRRoNh2ZsahyiY29n3cHM94xjfzq_TQ_NVBM-0TAGhDHDF0xCRWSKC9Gm3u99/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null} // No worksheet for this lesson
      quizPath={null} // No quiz for this lesson
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTAjORWJP-cQc51q-GOvASlOxpB-onhHM6Hio7wROacriLdXWZCqTuI4pPSp4Ws1Y0-Qxk8S2uKGuT_/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      completionThreshold={95}
      // Version type
      isParentVersion={true}
    />
  );
};

export default Astrovid2p;
