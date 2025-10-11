
import { apiClient } from "../api";

const getStudentAssignment = (subjectId, data) => {
    return apiClient.get(`/api/v1/assignments/student/all-assignments/${subjectId}`, data);
};
const deleteAnnouncement = (id) => {
    return apiClient.delete("/api/v1/announcement/teachers/delete/" + id);
};
const addAssignment = (data) => {
    return apiClient.post("/api/v1/assignments/teachers/add-assignment", data);
};
const generateAssignment = (data) => {
    return apiClient.post("/api/v1/chat/teachers/assignment/generate-quiz", data);
};

export { getStudentAssignment, deleteAnnouncement, addAssignment, generateAssignment };
