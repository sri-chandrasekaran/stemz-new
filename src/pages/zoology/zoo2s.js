import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const zoo2s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: Darwin's Theory"
      lessonNumber="lesson2"
      courseKey="zoology"
      videoUrl="8IekIaOqmwA"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTiEy26Olh9_L-UlQ3TkDpRUV63zB92diaKleyhvokJgNQYRrLbNnVLQRejZAj8XcoqWw-ZkBHEBS-H/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet2"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQ4hpdsAvud7jIxLN7FgiNNrlVn7b02-VOhExkh14W3lmp3ume655qmWRGevMBqSA1YQoDrt_XPvnOz/pub"
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

export default zoo2s;
