
import { apiClient } from "../api";

const getAllAnnouncements = (data) => {
    return apiClient.get("/api/v1/announcement/teachers/list-all", data);
};
const deleteAnnouncement = (id) => {
    return apiClient.delete("/api/v1/announcement/teachers/delete/" + id);
};

export { getAllAnnouncements, deleteAnnouncement };
