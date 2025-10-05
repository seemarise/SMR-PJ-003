
import { apiClient } from "../api";

const getAllAnnouncements = (data) => {
    return apiClient.get("/api/v1/announcement/teachers/list-all", data);
};
const deleteAnnouncement = (id) => {
    return apiClient.delete("/api/v1/announcement/teachers/delete/" + id);
};
const addAnnouncement = (data) => {
    return apiClient.post("/api/v1/announcement/teachers/create", data);
};
const updateAnnouncement = (id, data) => {
    return apiClient.put("/api/v1/announcement/teachers/update/" + id, data);
};

export { getAllAnnouncements, deleteAnnouncement, addAnnouncement, updateAnnouncement };
