

import { apiClient } from "../api";

const concatenatePath = (url,arr)=>{
    const strArr = arr.join("/");
    console.log("wow",strArr);
    return url  + strArr ;
};

const getClassromSubjects = () => {
    return apiClient.get("/api/v1/teachers/classroom/get-subjects-taking");
};

const getListOfAnnouncements = (body,options) => {
    return apiClient.get("/api/v1/announcement/teachers/list-all");
};
const getAssignments = (queryParams,body,options) => {
    return apiClient.get(concatenatePath("/api/v1/assignments/teachers/all-assignments/",queryParams));
};
const getSubmissions = (queryParams,body,options) => {
    return apiClient.get(concatenatePath("/api/v1/assignments/teachers/all-submissions/",queryParams));
};

export { getClassromSubjects,getListOfAnnouncements,getAssignments,getSubmissions };
