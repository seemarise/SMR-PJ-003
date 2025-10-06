
import { apiClient } from "../api";

const concatenatePath = (url, arr, obj = {}) => {
  const strArr = arr.length ? arr.join("/") : "";
  const query = Object.keys(obj).length
    ? "?" + new URLSearchParams(obj).toString()
    : "";
  return url+ "/" + strArr + query;
};

const getSubjectChaptersByClassSecAndSubId = (queryParams=[],searchParams={}) => {
    return apiClient.get(concatenatePath("/api/v1/chapters/teachers/all-chapters",queryParams,searchParams));
};

const addChaptersByClassSecAndSubId = (body)=>{
      return apiClient.post("/api/v1/chapters/teachers/add-chapter",body);
}

const removeChaptersById = (queryParams=[],searchParams={}) => {
    return apiClient.delete(concatenatePath("/api/v1/chapters/teachers/remove-chapter",queryParams,searchParams));
};

const getAllModulesByChapterId = (queryParams=[],searchParams={}) => {
    return apiClient.get(concatenatePath("/api/v1/modules/teachers/all-modules",queryParams,searchParams));
};

const addModuleByChapterId = (body)=>{
  return apiClient.post("/api/v1/chapters/teachers/add-module",body);
};

const removeModuleById = (queryParams=[],searchParams={}) => {
    return apiClient.delete(concatenatePath("/api/v1/chapters/teachers/remove-module",queryParams,searchParams));
};

const addDocumentByChapterId = (queryParams=[],body)=>{
    return apiClient.post("/api/v1/chapters/teachers/add-document",queryParams,body);
};

const removeDocumentByModuleAndDocumentId = (queryParams=[],body)=>{
    return apiClient.delete("/api/v1/chapters/teachers/remove-document/",queryParams,body);
};

export { 
          getSubjectChaptersByClassSecAndSubId ,
          addChaptersByClassSecAndSubId,
          removeChaptersById,
          getAllModulesByChapterId,
          addModuleByChapterId,
          removeModuleById,
          addDocumentByChapterId,
          removeDocumentByModuleAndDocumentId
};