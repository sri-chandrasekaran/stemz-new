import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const circuit2s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: More Circuit Board Tools"
      lessonNumber="lesson2"
      courseKey="circuits"
      videoUrl="pK9h_Ts3gWw"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vTswf_-q8sb9x-TCJ7FXOx6-6XzmwGh_ZZgQRG_0PZ-jRT4mP4bqqHxj9uw6TNLZjFsegpcjJSbxU0C/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/circuitworksheet"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQUW5I_4w3lys_aRBmbtFRDuM76orRlvLAob-rVoQHGyNBqu11iu6DQZGh109dIEQEQ1nlYvHsjuhlI/pub"
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

export default circuit2s;
