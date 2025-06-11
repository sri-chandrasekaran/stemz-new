import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const circuit2p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: More Circuit Board Tools"
      lessonNumber="lesson2"
      courseKey="circuits"
      videoUrl="pK9h_Ts3gWw"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQKXKuhKmKYY8iKcw7S5N_hMPgAoFGbFCE-_9j_bFp-z7HQUGweO7n1c8sHpm2m3sIrRgrBUs1it6XG/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/circuitworksheet"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vR6wstmAy6lQMQ_lXFke4YQUb3cb6htepWdwPYoNeqKA0AcpUNmSHHtDZQkdLxlEOZ4wrME-t2Kf3UB/pub"
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

export default circuit2p;
