import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const stat5s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 5: Surveys & Real World"
      lessonNumber="lesson5"
      courseKey="statistics"
      videoUrl="folkaRAmLWw"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSA3MYni_IvxR-V6IFSpxEMkzm6wOXsRwo9yF9m_IuOoFBfGCZkHOIsf6u8_Nau5BhdRXRPeJr31_TJ/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath="/statquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRub6nhi7MPqAAfqYmWCfCPpS90UZToPJLYEcJPk9nbzbVvnNAwKeiwt0N7a9P525QRRzuT2D6w2NKC/pub"
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

export default stat5s;
