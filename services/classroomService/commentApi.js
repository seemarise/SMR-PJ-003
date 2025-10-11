
import { apiClient } from "../api";

const getAllComment = (parentId, data) => {
    return apiClient.get("/api/v1/comment/viewComments/" + parentId, data);
};
const addComment = (data) => {
    return apiClient.post("/api/v1/comment/teachers/addComment", data);
};
const addReplyToComment = (data) => {
    return apiClient.post("/api/v1/comment/reply/addReply", data);
};
const getAllReply = (commentId, data) => {
    return apiClient.get(`/api/v1/comment/reply/listRepliesUser/${commentId}`, data);
};
export { getAllComment, addComment, addReplyToComment, getAllReply };
