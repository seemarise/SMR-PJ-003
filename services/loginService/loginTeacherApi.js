import { apiClient } from "../api";

const getEmailTeacherOtp = (body,options) =>{
  return apiClient.post(
  '/api/v1/teachers/account/email/send-otp',
  body,
  options
  );
};

const verifyEmailTeacherOtp = (body,options) =>{
  return apiClient.post(
    '/api/v1/teachers/account/email/verify-otp',
    body,
    options
  );
};


export {getEmailTeacherOtp,verifyEmailTeacherOtp};