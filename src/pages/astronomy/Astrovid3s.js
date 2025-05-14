import React from "react";
import VideoLessonPage from "../../components/VideoLessonPage";

const Astrovid3s = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 3: Space and Humans"
      lessonNumber="lesson3"
      courseKey="astronomy"
      videoUrl="v4pT0yllkO0"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vS_xvppSffjBQYinMkvctQfRa5v4oC0AtkGn54254erImV0xHnQi1fWvVEL-VSxDFK_M-KPCsOa4IDy/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/astroworksheet2" // Note: Worksheet path is different from lesson number
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vRJxZ8cM1W83Zu7f_WpP_jzGS5Cb_uPZMH-pUVKVn5rfyUyjOBTu9HFf3HWvdcRlha0tdgHwR9p7e1q/pub"
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

export default Astrovid3s;
