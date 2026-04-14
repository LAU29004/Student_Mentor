import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "./ui/button";
import { GoogleProfile } from "./OnboardingForm";
type Role = "student" | "mentor";

interface AuthScreenProps {
  onLogin: (
    role: Role,
    isNewUser: boolean,
    googleProfile: GoogleProfile
  ) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [activeRole, setActiveRole] = useState<Role>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isStudent = activeRole === "student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            MentorConnect
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Role Toggler */}
          <div className="relative flex bg-gray-100 rounded-xl p-1 mb-6">
            <div
              className="absolute top-1 bottom-1 bg-indigo-600 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
              style={{
                width: "calc(50% - 4px)",
                transform: isStudent
                  ? "translateX(4px)"
                  : "translateX(calc(100% + 4px))",
              }}
            />
            <button
              type="button"
              onClick={() => setActiveRole("student")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                isStudent ? "text-white" : "text-gray-500"
              }`}
            >
              <span>🎓</span> Student
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("mentor")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                !isStudent ? "text-white" : "text-gray-500"
              }`}
            >
              <span>🧑‍🏫</span> Mentor
            </button>
          </div>

          {/* Context hint */}
          <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-3 mb-6">
            <div
              className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                isStudent ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            <p className="text-sm text-gray-500 leading-snug">
              {isStudent
                ? "Sign in as a Student to explore sessions and connect with mentors."
                : "Sign in as a Mentor to manage your profile and guide learners."}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}
          <div className="flex items-center justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (!credentialResponse.credential) {
                  setError("Login failed. No credential received.");
                  return;
                }

                try {
                  const decoded: any = jwtDecode(credentialResponse.credential);

                  const googleProfile = {
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture,
                  };
                  console.log("Google Profile:", googleProfile);
                  console.log("Selected Role:", activeRole);
                  console.log(decoded);

                  setIsLoading(false);
                  onLogin(activeRole, true, googleProfile);
                } catch (err) {
                  console.error(err);
                  setError("Failed to decode token");
                }
              }}
              onError={() => {
                setError("Google Login Failed");
                setIsLoading(false);
              }}
            />
          </div>
          {/* Role confirm */}
          <p className="text-center text-xs text-gray-400 mt-3">
            Signing in as{" "}
            <span
              className={`font-semibold ${isStudent ? "text-green-600" : "text-amber-600"}`}
            >
              {isStudent ? "Student" : "Mentor"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
