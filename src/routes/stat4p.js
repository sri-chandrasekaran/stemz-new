import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const stat4p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 4: Types of Graphs"
      lessonNumber="lesson4"
      courseKey="statistics"
      videoUrl="folkaRAmLWw"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQJIvyl_lwBvbOFaVu7XreDDTYJUpEt2_KChv1YuxrB9O-FvQN6vxzK9gUIWFAoUtrsgdzD5386Z4UV/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/statworksheet3"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRJ13GWv9LxD3rAkdpkr4Lux_5TRi174Ki6JH9dLv8JAQhT04pS9IM_oFdeIHyYLtPZ-2Tj9JLOdPk8/pub"
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

export default stat4p;
