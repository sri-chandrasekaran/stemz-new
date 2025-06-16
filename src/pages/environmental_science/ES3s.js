import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const es3s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Population in the Water & Air"
      lessonNumber="lesson3"
      courseKey="earthscience"
      videoUrl="3Q8WkWc_Y5M"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQJYH5jwfAFP20o3kz-CQ2k_PgFlSiSI3e6gAn1igdZT5w9PXs89rvuLPgDCAbhmxxDzf5bd3-p50SJ/pub?start=false&loop=false&delayms=3000"
      worksheetPath={null}
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vSdJdP_cu7N9df9qJnFB1oo7JsXGpgmhSs1yXgktCDjkGQ9Z1qBQc9nKyhgl9uFQUyhjwJ8FGXYshGL/pub"
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

export default es3s;
