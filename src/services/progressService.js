import { call_api } from '../api';

/**
 * Normalize lesson identifier to backend assignment_number (e.g. "lesson1" -> "1").
 * @param {string} lessonNumber - e.g. "lesson1", "lesson2", or "1", "2"
 * @returns {string}
 */
export function toAssignmentNumber(lessonNumber) {
  if (!lessonNumber) return '';
  const s = String(lessonNumber).toLowerCase();
  return s.replace(/^lesson\s*/, '') || s;
}

/**
 * Get all progress records for a user.
 * GET /api/progress/user/:user_id
 * @param {string} userId - User's _id
 * @returns {Promise<Array>} Array of progress records
 */
export async function getProgressByUserId(userId) {
  if (!userId) throw new Error('User ID is required');
  const data = await call_api(null, `progress/user/${userId}`, 'GET');
  return Array.isArray(data) ? data : [];
}

/**
 * Delete a single progress record by id.
 * DELETE /api/progress/:id
 * @param {string} id - Progress record _id
 * @returns {Promise<Object>} Response from backend
 */
export async function deleteProgressById(id) {
  if (!id) throw new Error('Progress record ID is required');
  return call_api(null, `progress/${id}`, 'DELETE');
}

/**
 * Reset one assignment (one lesson) by deleting its progress record(s) via the backend Progress API.
 * Fetches user's progress, finds records for the given course + assignment number + types, deletes each by id.
 *
 * @param {string} userId - Current user's _id
 * @param {string} courseName - course_name (e.g. 'astronomy') - must match backend
 * @param {string} lessonNumber - e.g. 'lesson1' or '1' - normalized to assignment_number
 * @param {Array<string>} assignmentTypes - e.g. ['lesson', 'worksheet', 'quiz'] - backend uses 'lesson' not 'video'
 * @returns {Promise<{ deleted: number, ids: string[] }>}
 */
export async function resetLessonProgressByAssignmentIds(userId, courseName, lessonNumber, assignmentTypes) {
  const assignmentNumber = toAssignmentNumber(lessonNumber);
  const records = await getProgressByUserId(userId);

  const toDelete = records.filter(
    (r) =>
      r.course_name === courseName &&
      String(r.assignment_number) === String(assignmentNumber) &&
      assignmentTypes.includes(r.assignment_type)
  );

  const ids = toDelete.map((r) => r._id).filter(Boolean);
  for (const id of ids) {
    await deleteProgressById(id);
  }

  return { deleted: ids.length, ids };
}
