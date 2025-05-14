import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const bio1 = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Nucleic Acids"
      lessonNumber="lesson1"
      courseKey="biochemistry"
      videoUrl="Vo_1vhGWER8"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRNDXu_-pVyFsP6CmtbRtNo3r4ytpzzwCUrScwUNA076Rw_xPe_O2D0_OmWBJne2_MG7npPq6MkJdwd/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQIBdNnmb7ZNhqb7dwI7ruLCCrW660HRNd9qzS4JhKO7EuN31WHIeDeiKsvNSxhpn2srjNf_rMF0GnD/pub"
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

export default bio1;
