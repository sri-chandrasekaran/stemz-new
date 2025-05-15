import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const psych4p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Mind Tricks"
      lessonNumber="lesson4"
      courseKey="psychology"
      videoUrl="0KVSJrtktCY"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQnNZjuXykeqwiQlZhzDAZzbH7byUHn_kgWVHsySYbsV_o14t84vseL0L6orqx99k_tsVVsci34Ji5n/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/psychquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRLQW9cUCp2i8a-uzbhwtZpsIxlOFUh26ZyM2fRhl32pJn_vsrjGLKufF9xMqjOnl1-yZDHBtxH2cnY/pub"
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

export default psych4p;
