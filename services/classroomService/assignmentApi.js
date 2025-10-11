
import { apiClient } from "../api";

const getAllAnnouncements = (data) => {
    return apiClient.get("/api/v1/announcement/teachers/list-all", data);
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

export { getAllAnnouncements, deleteAnnouncement, addAssignment, generateAssignment };
