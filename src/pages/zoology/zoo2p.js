import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const zoo2p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: Darwin's Theory"
      lessonNumber="lesson2"
      courseKey="zoology"
      videoUrl="8IekIaOqmwA"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQSZAvS9tPwlxXZnRI3fSwa8i-BRYY5pugaIcj8eZjGDLd4zSLSVuwMsolK_WQLZxs-poIHfuwby_Km/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet2"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSVKeeZ_2086uJNoqcx7djBZpQSy22nSzTOF4UinEfqzjgCfN964IOQEH5XxqQuuHUG4_0x1GC59OdO/pub"
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

export default zoo2p;
