

import { apiClient } from "../api";

const getClassromSubjects = () => {
    return apiClient.get("/api/v1/teachers/classroom/get-subjects-taking");
};

export { getClassromSubjects };
