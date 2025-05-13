import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const stat3p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Advanced Percents"
      lessonNumber="lesson3"
      courseKey="statistics"
      videoUrl="WY7m3HsZf0k"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQlMmDkJ7RDMK4vbKOhI5plpkziwZnh8DUP34BIN5vwV51_1Of8bgx0MvuABCENsBZJn_Gy1FlYk_zd/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/statworksheet2"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSbVhd6X3VrxFXB3byG5YCiOaFizyptuSao9QmId4Yj3qQJQH3ssVU_PgSsOFD-pv7NgXQFxllI_uT5/pub"
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

export default stat3p;
