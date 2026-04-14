import React, { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Users, GraduationCap } from "lucide-react";
import { AuthScreen } from "./components/AuthScreen";
import { OnboardingForm, GoogleProfile } from "./components/OnboardingForm";
import { StudentDashboard } from "./components/StudentDashboard";
import { MentorDashboard } from "./components/MentorDashboard";
import { googleLogout } from "@react-oauth/google";
import { StudentProfile, MentorProfile, UserProfile } from "./types/user";

// ─── Types ───────────────────────────────────────────────────────────────────

type UserRole = "student" | "mentor" | null;

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [googleProfile, setGoogleProfile] = useState<GoogleProfile>({});
  const [currentView, setCurrentView] = useState("dashboard");

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole;
    const storedOnboarded = localStorage.getItem("hasCompletedOnboarding");
    const storedProfile = localStorage.getItem("userProfile");
    const storedGoogle = localStorage.getItem("googleProfile");

    if (storedRole && storedProfile) {
      setUserRole(storedRole);
    }
    if (storedOnboarded === "true") setHasCompletedOnboarding(true);

    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch {
        /* ignore */
      }
    }
    if (storedGoogle) {
      try {
        setGoogleProfile(JSON.parse(storedGoogle));
      } catch {
        /* ignore */
      }
    }
  }, []);

  /**
   * Called by AuthScreen after a successful login.
   *
   * @param role        - 'student' | 'mentor'
   * @param isNewUser   - true for first-time signups → show onboarding
   * @param gProfile    - name / email / picture returned by Google OAuth
   */
  const handleLogin = (
    role: "student" | "mentor",
    isNewUser = true,
    gProfile: GoogleProfile = {},
  ) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);

    // Persist Google profile so it survives a page refresh during onboarding
    setGoogleProfile(gProfile);
    localStorage.setItem("googleProfile", JSON.stringify(gProfile));

    if (isNewUser) {
      setHasCompletedOnboarding(false);
      localStorage.removeItem("hasCompletedOnboarding");
    }
  };

  const handleOnboardingComplete = (formData: Omit<UserProfile, "id">) => {
    if (formData.role === "student") {
const studentData = formData as Omit<StudentProfile, "id">;

const studentProfile: StudentProfile = {
  id: crypto.randomUUID(),
  ...studentData,
};

      setUserProfile(studentProfile);
      localStorage.setItem("userProfile", JSON.stringify(studentProfile));
    }

    if (formData.role === "mentor") {
const mentorData = formData as Omit<MentorProfile, "id">;

const mentorProfile: MentorProfile = {
  id: crypto.randomUUID(),
  ...mentorData,
};

      setUserProfile(mentorProfile);
      localStorage.setItem("userProfile", JSON.stringify(mentorProfile));
    }

    setHasCompletedOnboarding(true);
    localStorage.setItem("hasCompletedOnboarding", "true");
  };

  const handleLogout = () => {
    googleLogout();
    setUserRole(null);
    setHasCompletedOnboarding(false);
    setUserProfile(null);
    setGoogleProfile({});
    setCurrentView("dashboard");
    localStorage.removeItem("userRole");
    localStorage.removeItem("hasCompletedOnboarding");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("googleProfile");
  };

  // ── Routing ───────────────────────────────────────────────────────────────

  // 1. Not logged in
  if (!userRole) {
    return (
      <>
        {/*
          AuthScreen must call: onLogin(role, isNewUser, { name, email, picture })
          The googleProfile fields come from the JWT decoded after Google OAuth:
            import { jwtDecode } from 'jwt-decode';
            const decoded = jwtDecode(credentialResponse.credential);
            // decoded.name, decoded.email, decoded.picture
        */}
        <AuthScreen onLogin={handleLogin} />
        <Toaster position="top-right" />
      </>
    );
  }

  // 2. New user — show onboarding pre-filled with Google data
  if (!hasCompletedOnboarding) {
    return (
      <>
        <OnboardingForm
          role={userRole}
          googleProfile={googleProfile}
          onComplete={handleOnboardingComplete}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  // 3. Returning user — go straight to dashboard
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {userProfile?.role === "student" ? (
          <StudentDashboard
            onViewChange={setCurrentView}
            userProfile={userProfile}
          />
        ) : userProfile?.role === "mentor" ? (
          <MentorDashboard userProfile={userProfile} />
        ) : null}

        {/* Demo switcher — remove in production */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-3 text-center font-medium">
              Demo Mode
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={userRole === "student" ? "default" : "outline"}
                onClick={() => setUserRole("student")}
                className={
                  userRole === "student"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : ""
                }
              >
                <GraduationCap className="w-4 h-4 mr-1.5" /> Student
              </Button>
              <Button
                size="sm"
                variant={userRole === "mentor" ? "default" : "outline"}
                onClick={() => setUserRole("mentor")}
                className={
                  userRole === "mentor"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : ""
                }
              >
                <Users className="w-4 h-4 mr-1.5" /> Mentor
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="w-full mt-2 text-xs text-gray-500"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
