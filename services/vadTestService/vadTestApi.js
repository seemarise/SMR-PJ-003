import { apiClient } from "../api";

const getVadTests = () => {
  return apiClient.get("/api/v1/vad-test/teachers/get-vad-test-subjects");
};
const getTestDetail = (test_id) => {
  return apiClient.get(`/api/v1/vad-test/details/${test_id}`);
};

export { getVadTests, getTestDetail };
