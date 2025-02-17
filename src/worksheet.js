import { getUserEmail } from './auth';
import { call_api } from './api';

export const createWorksheetProgress = async (worksheetId, progress) => {
  const email = await getUserEmail();
  if (!email) {
    console.error("CreateWorksheet: User email not found.");
    return;
  }
  console.log("create:", email);

  const payload = {
    userEmail: email,
    worksheetId: worksheetId,
    progress: progress,
  };

  console.log("create payload", payload);

  try {
    const response = await call_api(payload, "worksheets/create", "POST");
    console.log("Progress created successfully:", response);
  } catch (error) {
    console.error("Error creating progress:", error);
  }
};

export const fetchWorksheetProgress = async (worksheetId) => {
    const email = await getUserEmail();
    if (!email) {
      console.error("FetchWorksheet: User email not found.");
      return;
    }
    console.log("fetch:", email);
  
    try {
        const response = await call_api(null, `worksheets/get/email/${email}/worksheetId/${worksheetId}`, "GET");
        return response;
    } catch (error) {
        console.error("Error fetching results:", error);
    }
};

export const updateWorksheetProgress = async (worksheetId, progress) => {
    const email = await getUserEmail();
    if (!email) {
        console.error("UpdateWorksheet: User email not found.");
        return;
    }
    console.log("update:", email);

    const payload = {
        userEmail: email,
        worksheetId: worksheetId,
        progress: progress,
    };

    console.log("update payload:", payload)

    try {
        const response = await call_api(payload, `worksheets/update`, "PUT");
        console.log("Results saved successfully:", response);
    } catch (error) {
        console.error("Error saving results:", error);
    }
}
