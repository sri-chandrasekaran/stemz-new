import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const zoo4p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Behavior"
      lessonNumber="lesson4"
      courseKey="zoology"
      videoUrl="x8jMSVan1Rc"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTPdKnx0plsaOFF7bS1e6U0_T-M3P81XDKJQb0L2yUVE0l59pH7ncwzIVOvypfDFlqP2jyty3ZboRLa/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet3"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vR_bXrXP3HQhsJwoTmgk8yOs5YMyBWEkSHi2f7quAYEKcIc7mmi8c8dVkMwYJYxKmntL-Er1p7sEED6/pub"
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

export default zoo4p;
