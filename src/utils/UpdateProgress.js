import { call_api } from "../api";

export const updateProgress = async (
  userProgress,
  courseKey,
  lessonNumber,
  earnedPoints,
  worksheetTitle,
  showStatus
) => {
  const updatedProgress = { ...userProgress };

  // Ensure the path exists
  if (!updatedProgress.courses) updatedProgress.courses = {};
  if (!updatedProgress.courses[courseKey]) {
    updatedProgress.courses[courseKey] = {
      lessons: {},
      title: courseKey.charAt(0).toUpperCase() + courseKey.slice(1),
    };
  }
  if (!updatedProgress.courses[courseKey].lessons) {
    updatedProgress.courses[courseKey].lessons = {};
  }
  if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
    updatedProgress.courses[courseKey].lessons[lessonNumber] = {
      activities: {},
      title: worksheetTitle,
    };
  }
  if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
    updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
  }

  // Set worksheet data
  updatedProgress.courses[courseKey].lessons[
    lessonNumber
  ].activities.worksheet = {
    completed: true,
    earned: earnedPoints,
    points: 5, // Total possible points is 5
    type: "worksheet",
    title: worksheetTitle,
  };

  // Update lesson points
  updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints =
    earnedPoints;

  // Mark lesson as completed if video is also completed
  if (
    updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video
      ?.completed
  ) {
    updatedProgress.courses[courseKey].lessons[lessonNumber].completed = true;
  }

  // Update course points
  let coursePoints = 0;
  Object.values(updatedProgress.courses[courseKey].lessons).forEach(
    (lesson) => {
      coursePoints += lesson.lessonPoints || 0;
    }
  );
  updatedProgress.courses[courseKey].coursePoints = coursePoints;

  // Update total points
  let totalPoints = 0;
  Object.values(updatedProgress.courses).forEach((course) => {
    totalPoints += course.coursePoints || 0;
  });
  updatedProgress.totalPoints = totalPoints;

  try {
    const response = await call_api(updatedProgress, "points", "POST");
    if (response) {
      showStatus(
        `✓ Progress saved! You've earned ${earnedPoints} points!`,
        3000
      );
      return updatedProgress;
    }
  } catch (error) {
    console.error("Update error:", error);
    showStatus("❌ Error saving progress", 3000);
    return null;
  }
};
