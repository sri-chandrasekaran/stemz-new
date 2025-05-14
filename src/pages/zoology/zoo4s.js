import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const zoo4s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Behavior"
      lessonNumber="lesson4"
      courseKey="zoology"
      videoUrl="x8jMSVan1Rc"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vRt9nG99aohxkgNmzufdvJ7dbinXiC4_wINUmTIVEAGVkhcyrkYVh_b_Rg7zhoPL4Lm5gJRScF0Hk0W/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet3"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vTAygONISUsQP4xvjM0hGkY8qtgsrmhnYsSu8AYAo0rinJpLpAosH4mEdDQzCf9ynB9q09EiJggJGvv/pub"
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

export default zoo4s;
