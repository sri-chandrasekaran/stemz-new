import React from "react";
import VideoLessonPage from "../components/VideoLessonPage";

const zoo1p = () => {
  return (
    <VideoLessonPage
      lessonTitle="Lesson 1: Classification & Taxonomy"
      lessonNumber="lesson1"
      courseKey="zoology"
      videoUrl="pEDK7r21GBM"
      // Resource URLs and paths
      slideshowUrl="https://docs.google.com/presentation/d/e/2PACX-1vQX54pfNPy3LsDG1TCZGj6FQydW8ZVCaPKcAykyBwV3j7pM3ZU1hIkAsjLY92i7s3EUICgdiSVdgEkO/pub?start=false&loop=false&delayms=3000"
      worksheetPath="/zooworksheet1"
      quizPath={null}
      // Notes configuration
      notesUrl="https://docs.google.com/document/d/e/2PACX-1vQlPRXMCAbRcZ5te8WPSoPYemQfzEJzJgGvh2KOkjKuGHZD-8-rGG4zZ_08P9trbXA7dkKX_mUO60TD/pub"
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

export default zoo1p;
