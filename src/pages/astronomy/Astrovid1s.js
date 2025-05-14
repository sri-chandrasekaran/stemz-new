import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const Astrovid1s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: The Solar System"
      lessonNumber="lesson1"
      courseKey="astronomy"
      videoUrl="vy2NuP1ITFo"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vSHCaacBter5Vp_LpWpW8qmNphqR4CZdmyFp9OIRzzuvveXNrmg-iTwFLOcsIdQMDazL6KyxAfk9ftU/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/astroworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRvLzrRtS52Gup_N7UbX3YdJN9DBAhImvR8jqu8yKo7Fwt2pY0UoOfxJlkt2HJKKrA1M3-L-KHihTpF/pub"
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

export default Astrovid1s;