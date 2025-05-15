import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const bio2 = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 2: Proteins & Carbohydrates"
      lessonNumber="lesson2"
      courseKey="biochemistry"
      videoUrl="Vg1nWNNHhok"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSbaxlHQxP4MboLd2JWNeOP55uL1eEdqCMhzy8_-8GRUtnznUn10LytPOOqwQZA2tRrt9hXrlOdM86V/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/biochemworksheet"
      quizPath="/bioquiz"
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRgN28ND5SLhY9wg_V3hwq3KllgU_SgHbO2TlDtdS7BUFhH03VDgwOdf4WGdX4UJf7z68YicgeQN22g/pub"
      notesLabel="Parent Notes"
      // Points configuration
      maxVideoPoints={7}
      worksheetPoints={5}
      completionThreshold={95}
      // Version type
      isParentVersion={false}
    />
  );
};

export default bio2;
