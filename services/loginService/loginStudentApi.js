import { apiClient } from "../api";

const getEmailStudentOtp = (body,options) =>{
  return apiClient.post(
    '/api/v1/students/auth/email/send-otp',
    body,
    options
  );
};

const verifyEmailStudentOtp = (body,options) =>{
  return apiClient.post(
    '/api/v1/students/auth/email/verify-otp',
    body,
    options
  );
}

export {getEmailStudentOtp,verifyEmailStudentOtp};