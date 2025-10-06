import { apiClient } from "../api";

const getRemarks = (data) => {
    return apiClient.get("/api/v1/remark/classroom/get-remarks", data);
};
const addRemarks = (data) => {
    return apiClient.post("/api/v1/remark/classroom/add-remark", data);
};

export {
    getRemarks, addRemarks
};
