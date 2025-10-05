"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { loginApi } from "@/services/loginService/loginApi";
import { sessionService } from "@/services/sessionService";
export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("choose"); // choose | email | otp
  const [role, setRole] = useState(null); // student | teacher
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const token = sessionService.getToken();
    if (token) {
      router.replace("/"); // or "/" for home page
    }
  }, [router]);

  // Countdown for OTP
  useEffect(() => {
    let interval;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const renderChooseScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-50">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">VADAI</h1>
      <h2 className="text-2xl font-semibold mb-2">Welcome to VADAI</h2>
      <p className="text-gray-500 mb-10">Choose how you want to use the app</p>

      <div className="w-full max-w-md space-y-5 mb-10">
        {/* Student Card */}
        <button
          onClick={() => {
            setRole("student");
            setStep("email");
          }}
          className="w-full bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border hover:shadow-lg transition"
        >
          <div className="flex-shrink-0">
            <Image
              src="/student.png"
              alt="Student"
              width={50}
              height={50}
              className="rounded-xl"
            />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-lg">Student App</p>
            <p className="text-sm text-gray-500 leading-snug font-normal">
              Access your learning resources, assignments, and track your progress
            </p>
          </div>
          <ArrowRight className="text-gray-400 w-5 h-5" />
        </button>

        {/* Teacher Card */}
        <button
          onClick={() => {
            setRole("teacher");
            setStep("email");
          }}
          className="w-full bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border hover:shadow-lg transition"
        >
          <div className="flex-shrink-0">
            <Image
              src="/teacher.png"
              alt="Teacher"
              width={50}
              height={50}
              className="rounded-xl"
            />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-lg">Teacher App</p>
            <p className="text-sm text-gray-500 leading-snug">
              Manage classes, <br /> assignments, and monitor student progress
            </p>
          </div>
          <ArrowRight className="text-gray-400 w-5 h-5" />
        </button>
      </div>

      {/* Terms inside flow (not pinned at bottom) */}
      <p className="text-xs text-gray-600 text-center">
        By using VADAI, you agree to the <br /> Terms and Privacy Policy.
      </p>
    </div>
  );

  const renderEmailScreen = () => (
    <div className="flex flex-col min-h-screen bg-gray-50 relative px-6">
      {/* Back button */}
      <button
        className="absolute top-6 left-5 text-gray-600"
        onClick={() => setStep("choose")}
      >
        <ArrowLeft className="text-gray-400 w-5 h-5" />
      </button>

      {/* Main centered content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-3">VADAI</h1>
        <h2 className="text-lg font-semibold text-center mb-10 text-gray-600">
          {role === "teacher"
            ? "👩‍🏫 Welcome to VADAI Teacher Platform ✨"
            : "👋 You're now using VAD AI - let's get started! ✨"}
        </h2>

        <div className="w-full max-w-md mb-2">
          <p className="text-gray-700 text-lg text-left">Email</p>
        </div>

        <input
          type="email"
          placeholder={role === "teacher" ? "teacher@school.edu" : "student@school.edu"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-md border p-4 rounded-xl mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="w-full max-w-md mb-5">
          <p className="text-gray-600 text-sm text-left">
            We&apos;ll send a verification code to this email
          </p>
        </div>

        <button
          onClick={async () => {
            console.log("clicked", role);
            let res = await loginApi[role].getOtp({ "email": email }, {});
            if (res.statusCode == 200) {
              setStep("otp");
              setTimer(60);
            }

          }}
          className="w-full max-w-md bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>

      {/* Bottom footer */}
      <p className="text-xs text-gray-400 text-center mb-6">
        By using VADAI, you agree to the <br /> Terms and Privacy Policy.
      </p>
    </div>
  );

  const renderOtpScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-50 relative">
      <button
        className="absolute top-6 left-5 text-gray-600"
        onClick={() => setStep("email")}
      >
        <ArrowLeft className="text-gray-400 w-5 h-5" />
      </button>

      <h1 className="text-5xl font-bold text-blue-700 mb-4">VADAI</h1>

      <span
        className={`px-4 py-1 rounded-full text-sm mb-4 ${role === "teacher"
          ? "bg-green-100 text-green-600"
          : "bg-blue-100 text-blue-600"
          }`}
      >
        {role === "teacher" ? "Teacher Portal" : "Student Portal"}
      </span>

      <p className="text-center mb-6">
        📩 Enter the code sent to{" "}
        <span className="font-semibold">{email || "your email"}</span>
      </p>

      <div className="flex gap-3 mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            className="w-12 h-12 border rounded-xl text-center text-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}
      </div>

      <button
        className={`w-full max-w-md py-3 rounded-xl text-lg font-semibold hover:transition-colors transition
    ${role === "teacher"
            ? "bg-green-800 text-white hover:bg-green-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        onClick={
          async () => {
            let res = await loginApi[role].verifyOtp({
              'email': email,
              'otp': otp.join('')
            }, {});
            if (res.statusCode == 200) {
              let data = {
                token: res.data.tokens.access.token,
                refreshToken: res.data.tokens.refresh.token,
                Id: res.data[role][role == "teacher" ? (role + "sId") : (role + "Id")]
              }
              sessionService.setSession(data);
              if (role == "teacher") {
                sessionService.setUser(res.data.teacher)
              }

              router.replace("/");
              console.log(role + " login successful");
            }
            else if (res.statusCode == 401) {
              console.log(res.meessage);
            }
          }
        }
      >
        Verify & Continue
      </button>

      <div className="w-full max-w-md mt-4 min-h-[2.25rem] flex items-center justify-center">
        {timer > 0 ? (
          <p className="text-sm text-gray-500 ">
            Resend OTP in{" "}
            <span className={`${role === "teacher" ? "text-green-800" : "text-blue-600"} font-semibold`}>
              {timer}s
            </span>
          </p>
        ) : (
          <button
            onClick={() => setTimer(60)}
            className={`w-full py-3 rounded-xl text-lg font-semibold transition
        ${role === "teacher"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-gray-200 text-blue-600 hover:bg-gray-300"
              }`}
          >
            Resend OTP
          </button>
        )}
      </div>

    </div>
  );

  return (
    <>
      {step === "choose" && renderChooseScreen()}
      {step === "email" && renderEmailScreen()}
      {step === "otp" && renderOtpScreen()}
    </>
  );
}
