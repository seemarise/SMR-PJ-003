import { getEmailTeacherOtp,verifyEmailTeacherOtp } from "./loginTeacherApi";
import { getEmailStudentOtp, verifyEmailStudentOtp } from "./loginStudentApi";

const loginApi = {
  student :{
    getOtp:getEmailStudentOtp,
    verifyOtp: verifyEmailStudentOtp
  },
  teacher :{
    getOtp:getEmailTeacherOtp,
    verifyOtp: verifyEmailTeacherOtp
  },
};

export {loginApi};