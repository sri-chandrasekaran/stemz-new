import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const psych1s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Psychology & Scientific Method"
      lessonNumber="lesson1"
      courseKey="psychology"
      videoUrl="TjGatGI4CJM"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQ-vjBlKAWDEa513c85FwKAIrMDkjeRvfFRmmWS3MAhYy1m8Mm2cPuEMFqybbKqiKzROBfLvLGwXeM0/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/psychworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSlH65JZnS6yB3lL8zWNOQt3XE3mhX16FE3Nk-XLKZlMOg_lutgQ6fJK_AIr_zUNFKMVyTKhdgrx4HG/pub"
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

export default psych1s;
