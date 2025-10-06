

import { apiClient } from "../api";

const concatenatePath = (url, arr) => {
    const strArr = arr.join("/");
    console.log("wow", strArr);
    return url + strArr;
};

const getClassromSubjects = () => {
    return apiClient.get("/api/v1/teachers/classroom/get-subjects-taking");
};
const getAttendence = (data) => {
    return apiClient.get("/api/v1/teachers/classroom/get-attendance-details", data);
};
const updateAttendence = (data) => {
    return apiClient.post("/api/v1/teachers/classroom/submit-attendance", data);
};
const getPeople = (data) => {
    return apiClient.get("/api/v1/teachers/classroom/get-all-students", data);
};
const getListOfAnnouncements = () => {
    return apiClient.get("/api/v1/announcement/teachers/list-all");
};
const getAssignments = (queryParams) => {
    return apiClient.get(concatenatePath("/api/v1/assignments/teachers/all-assignments/", queryParams));
};
const getSubmissions = (queryParams) => {
    return apiClient.get(concatenatePath("/api/v1/assignments/teachers/all-submissions/", queryParams));
};
const getSubmissionsInfoById = (queryParams) => {
    return apiClient.get(concatenatePath("/api/v1/assignments/teachers/submission/", queryParams));
};

const approveSubmissionBySubId = (queryParams) => {
    return apiClient.post(concatenatePath("/api/v1/assignments/teachers/approve-submission/", queryParams));
};

const rejectSubmissionBySubId = (queryParams, body) => {
    return apiClient.post(concatenatePath("/api/v1/assignments/teachers/reject-submission/", queryParams), body);
};

const deleteAssignmentById = (queryParams) => {
    return apiClient.delete(concatenatePath("/api/v1/assignments/teachers/delete-assignment/", queryParams));
};

export {
    getClassromSubjects,
    getListOfAnnouncements,
    getAssignments,
    getPeople,
    getSubmissions,
    getSubmissionsInfoById,
    approveSubmissionBySubId,
    rejectSubmissionBySubId,
    getAttendence,
    updateAttendence,
    deleteAssignmentById
};
