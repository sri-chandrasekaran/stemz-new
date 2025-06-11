import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const psych4s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Mind Tricks"
      lessonNumber="lesson4"
      courseKey="psychology"
      videoUrl="0KVSJrtktCY"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTM7iYm19WktXRir8BIrAKBRoFqMacJBPRJiIaaF7VCOmNVkS1crxyXIU4w8hcBbw5QBgIbnYdg2FF8/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/psychquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSzVcIaEzeHONChJJmOgKB97vSnGB-KL88mGUUB59pRsyRDEO6jCO3kVtHTev0apflHZ9z2nv_45Gqm/pub"
      notesLabel="Student Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={0}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default psych4s;
