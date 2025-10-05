
import { apiClient } from "../api";

const getAllComment = (parentId, data) => {
    return apiClient.get("/api/v1/comment/viewComments/" + parentId, data);
};
const addComment = (data) => {
    return apiClient.post("/api/v1/comment/teachers/addComment", data);
};
export { getAllComment, addComment };
