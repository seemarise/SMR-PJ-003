
import { apiClient } from "../api";

const getStudentAssignment = (subjectId, data) => {
    return apiClient.get(`/api/v1/assignments/student/all-assignments/${subjectId}`, data);
};
const getAssignmentDetail = (assignmentId) => {
    return apiClient.get(`/api/v1/assignments/assignment/${assignmentId}`);
};
const deleteAnnouncement = (id) => {
    return apiClient.delete("/api/v1/announcement/teachers/delete/" + id);
};
const addAssignment = (data) => {
    return apiClient.post("/api/v1/assignments/teachers/add-assignment", data);
};
const updateAssignment = (assignmentId, data) => {
    return apiClient.put(`/api/v1/assignments/teachers/update-assignment/${assignmentId}`, data);
};
const submitAssignment = (assignmentId, data) => {
    return apiClient.post(`/api/v1/assignments/student/submit/${assignmentId}`, data);
};
const generateAssignment = (data) => {
    return apiClient.post("/api/v1/chat/teachers/assignment/generate-quiz", data);
};

export { getStudentAssignment, deleteAnnouncement, addAssignment, generateAssignment, getAssignmentDetail, updateAssignment, submitAssignment };
