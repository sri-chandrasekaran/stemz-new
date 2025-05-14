import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const bc3p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Wait & Sensors"
      lessonNumber="lesson3"
      courseKey="basicsOfCoding"
      videoUrl="qEcc3yjrwOI"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTpYmMLpS2w-sD732G_S_JwiWTAZo_FHTKEl12QpaTkmsvzYaNCjlGdPODJDqNWYkMd0kor5pydwWEb/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRh4DJfgSYvBBVJf96tO7wg1y_-o_QYSPeGz7YiiwVyd8ZEPvRBpLhUXy0Eaum-6fG_KF5dslDG8J2u/pub"
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

export default bc3p;
