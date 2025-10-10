

import { apiClient } from "../api";

const concatenatePath = (url, arr) => {
    const strArr = arr.join("/");
    console.log("wow", strArr);
    return url + strArr;
};

const getStudentSubjects = () => {
    return apiClient.get("/api/v1/subjects/student/all-subjects");
};

const getStudentAttendence = (data) => {
    return apiClient.get("/api/v1/student/classroom/attendance", data);
};

const getStudentClassroomAnnouncement = (data) => {
    return apiClient.get("/api/v1/announcement/student/classroom/list-all", data);
};
const getStudentClassroomRemark = (data) => {
    return apiClient.get("/api/v1/remark/list-all-remarks", data);
};
const getStudentClassroomChapters = () => {
    return apiClient.get("/api/v1/chapters/student/classroom-chapters");
};
const getStudentClassroomModules = (chapterId, data) => {
    return apiClient.get("/api/v1/modules/student/all-modules/" + chapterId, data);
};

export {
    getStudentSubjects,
    getStudentAttendence,
    getStudentClassroomAnnouncement,
    getStudentClassroomRemark,
    getStudentClassroomChapters,
    getStudentClassroomModules
};
