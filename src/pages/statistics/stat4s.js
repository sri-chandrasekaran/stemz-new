import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const stat4s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Types of Graphs"
      lessonNumber="lesson4"
      courseKey="statistics"
      videoUrl="folkaRAmLWw"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vR0Wr_xLf2klBNgsoY9fOfMBB0jT6QGcCElaLQ3xBrf4lIwoYIvlCjSrDXgnKLTcG7i3lrnPDUovwkl/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/statworksheet3"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vS1Iq8-klZyrr-4GHb-2LZt2PKiCMUHCnGVJjioo0k0SyvRf2LKdzT2Vf4vI6bcJ77iPYDJcbW2VS1F/pub"
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

export default stat4s;
