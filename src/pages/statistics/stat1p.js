import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const stat1p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Fractions"
      lessonNumber="lesson1"
      courseKey="statistics"
      videoUrl="imGo9o7Epo8"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRMohCHR7LpleWfVyfEUMajglNlI29aC5D2lVLFJd9IBKtefsGpBYp3yRvEX5obuGqDySWoKpEJcMfd/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/statworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQhhp7VA72W4MwqXwYGNz0x1JiYV4LE6YxVh-VXggqD1N79Inpa4cwCbDBDmTW_oI_nozE8Ml5ou8uO/pub"
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

export default stat1p;
