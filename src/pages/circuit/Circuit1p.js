import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const circuit1p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Circuits & Circuit Boards"
      lessonNumber="lesson1"
      courseKey="circuits"
      videoUrl="MFr0Y52UICk"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTHBLWAv2u9mwRdYATw_vNu1Q5IA5vbzKiljOA1KE5XMCr7j5jykd51oI6SBDjli_avQ8USgVLHsBlW/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTqewhkRFQc22hPOxTK3eWIDkvVYcHimu0YmMy45O446Y34ZnJNLSTN9ToA2Cgsm1d3FtDOXAzSYGu7/pub"
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

export default circuit1p;
