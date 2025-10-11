
import { apiClient } from "../api";

const concatenatePath = (url, arr = [], obj = {}) => {
  const strArr = arr.length ? arr.join("/") : "";
  const query = Object.keys(obj).length
    ? "?" + new URLSearchParams(obj).toString()
    : "";
  return url + "/" + strArr + query;
};

const getCompendiaCategories = () => {
  return apiClient.get("/api/v1/compendia/category/get-all-categories");
}
const getCompendiaSubCategories = (id) => {
  return apiClient.get(concatenatePath("/api/v1/compendia/sub-category/get-all-sub-categories/" + id));
}
const getAllCompendia = (queryParams) => {
  return apiClient.get(concatenatePath("/api/v1/compendia/student/get-all-compendia", [], queryParams));
}
const getMyCompendia = (queryParams) => {
  return apiClient.get(concatenatePath("/api/v1/compendia/student/my-compendia", [], queryParams));
}
const getVadSquadreviewsByComId = (pathParams) => {
  return apiClient.get(concatenatePath("/api/v1/compendia/student/get-reviews", pathParams));
}
const pinCompendiaById = (pathParams) => {
  return apiClient.get(concatenatePath("/api/v1/compendia/student/pin-compendium", pathParams));
}
const removePinCompendiaById = (pathParams) => {
  return apiClient.get(concatenatePath("//api/v1/compendia/student/remove-pinned-compendium", pathParams));
}
// getListSuggestions not working
// getAllCompedia 

export {
  getCompendiaCategories,
  getCompendiaSubCategories,
  getAllCompendia,
  getMyCompendia,
  getVadSquadreviewsByComId,
  pinCompendiaById,
  removePinCompendiaById
};