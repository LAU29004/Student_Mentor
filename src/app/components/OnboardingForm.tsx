import React, { useState, ChangeEvent } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Upload,
} from "lucide-react";

// ─── Types (aligned to DB schema) ────────────────────────────────────────────

export interface BaseProfile {
  id: string;
  name: string;
  email: string;
  contact: string;
  picture: string;
  linkedin: string;
  github: string;
}

export interface StudentProfile extends BaseProfile {
  role: "student";
  collegeId: string;
  photo?: string;
}

export interface MentorProfile extends BaseProfile {
  role: "mentor";
  jobTitle: string;
  company: string;
  yearsOfExperience: string;
  areaOfExpertise: string;
}

export type UserProfile = StudentProfile | MentorProfile;

export interface GoogleProfile {
  name?: string;
  email?: string;
  picture?: string;
}

interface OnboardingFormProps {
  role: "student" | "mentor";
  googleProfile?: GoogleProfile;
  /**
   * Called with the collected form data. Note: `id` is not set by this form —
   * the caller is responsible for assigning a DB-generated id before persisting.
   */
  onComplete: (formData: Omit<UserProfile, "id">) => void;
  onSkip?: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EXPERTISE_AREAS = [
  "Software Engineering",
  "Data Science & ML",
  "Product Management",
  "UI/UX Design",
  "DevOps & Cloud",
  "Cybersecurity",
  "Finance & Fintech",
  "Marketing & Growth",
  "Entrepreneurship",
  "Research & Academia",
  "Mobile Development",
  "Game Development",
];

const EXPERIENCE_OPTIONS = [
  "0–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProfilePictureUpload = ({
  value,
  onChange,
  name,
}: {
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
}) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(name, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {value ? (
          <img
            src={value}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-200"
            onError={(e) => {
              console.log("Image failed to load:", value);
              e.currentTarget.src = "https://ui-avatars.com/api/?name=User";
            }}
          />
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center ring-4 ring-slate-200">
            <Upload className="w-6 h-6 text-slate-400" />
          </div>
        )}
        <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-white text-xs font-medium">Change</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-slate-500">Profile photo (optional)</p>
    </div>
  );
};

const InputField = ({
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm text-slate-900 placeholder:text-slate-400"
    />
  </div>
);

const PrefixedInputField = ({
  label,
  required,
  prefix,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  prefix: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="flex">
      <span className="inline-flex items-center px-4 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-500 text-sm font-medium">
        {prefix}
      </span>
      <input
        {...props}
        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm text-slate-900 placeholder:text-slate-400"
      />
    </div>
  </div>
);

const ChipGroup = ({
  label,
  required,
  options,
  value,
  onChange,
  columns = 2,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  columns?: 1 | 2;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-3">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div
      className={`grid gap-2 ${columns === 1 ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-left ${
            value === opt
              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/30"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// ─── Form state types (no `id` — that's DB-assigned) ─────────────────────────

type BaseFormState = Omit<BaseProfile, "id">;

type StudentFormState = Omit<StudentProfile, "id">;
type MentorFormState = Omit<MentorProfile, "id">;

// ─── Main Component ───────────────────────────────────────────────────────────

export function OnboardingForm({
  role,
  googleProfile = {},
  onComplete,
  onSkip,
}: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Shared base fields (no id — DB assigns it)
  const [baseData, setBaseData] = useState<BaseFormState>({
    name: googleProfile.name ?? "",
    email: googleProfile.email ?? "",
    picture: googleProfile.picture ?? "",
    contact: "",
    linkedin: "",
    github: "",
  });

  // Student-specific fields
  const [studentData, setStudentData] = useState<
    Pick<StudentFormState, "collegeId" | "photo">
  >({
    collegeId: "",
    photo: undefined,
  });

  // Mentor-specific fields
  const [mentorData, setMentorData] = useState<
    Pick<
      MentorFormState,
      "jobTitle" | "company" | "yearsOfExperience" | "areaOfExpertise"
    >
  >({
    jobTitle: "",
    company: "",
    yearsOfExperience: "",
    areaOfExpertise: "",
  });

  const steps =
    role === "student"
      ? [
          { id: 1, title: "Personal Information", icon: "👤" },
          { id: 2, title: "Education & Profiles", icon: "🎓" },
        ]
      : [
          { id: 1, title: "Personal Information", icon: "👤" },
          { id: 2, title: "Professional Details", icon: "💼" },
          { id: 3, title: "Online Profiles", icon: "🔗" },
        ];

  const totalSteps = steps.length;

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!baseData.name.trim()) newErrors.name = "Name is required";
      if (!baseData.email.trim()) newErrors.email = "Email is required";
      if (!baseData.contact.trim())
        newErrors.contact = "Contact number is required";
      else if (baseData.contact.length !== 10)
        newErrors.contact = "Contact must be 10 digits";
    }

    if (role === "student" && currentStep === 2) {
      if (!studentData.collegeId.trim())
        newErrors.collegeId = "College/University is required";
    }

    if (role === "mentor" && currentStep === 2) {
      if (!mentorData.jobTitle.trim())
        newErrors.jobTitle = "Job title is required";
      if (!mentorData.company.trim()) newErrors.company = "Company is required";
      if (!mentorData.yearsOfExperience)
        newErrors.yearsOfExperience = "Please select years of experience";
      if (!mentorData.areaOfExpertise)
        newErrors.areaOfExpertise = "Please select an area of expertise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBaseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBaseData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStudentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMentorChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setMentorData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep((s) => s + 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    // `id` is intentionally omitted — the caller/DB layer assigns it.
    if (role === "student") {
      const payload: Omit<StudentProfile, "id"> = {
        ...baseData,
        role: "student",
        collegeId: studentData.collegeId,
        photo: studentData.photo,
      };
      onComplete(payload);
    } else {
      const payload: Omit<MentorProfile, "id"> = {
        ...baseData,
        role: "mentor",
        ...mentorData,
      };
      onComplete(payload);
    }
  };

  const renderStep = () => {
    // ── Step 1: Personal Information (shared) ──────────────────────────────
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          {googleProfile.email && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <div className="text-2xl mt-0.5">✓</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  Signed in with Google
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Your email is verified and secure
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <ProfilePictureUpload
              value={baseData.picture}
              onChange={(name, value) =>
                setBaseData((prev) => ({ ...prev, [name]: value }))
              }
              name="picture"
            />
          </div>

          <InputField
            label="Full Name"
            required
            type="text"
            name="name"
            value={baseData.name}
            onChange={handleBaseChange}
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={baseData.email}
              onChange={handleBaseChange}
              placeholder="jane@example.com"
              readOnly={!!googleProfile.email}
              className={`w-full px-4 py-2.5 rounded-lg text-sm transition-all border ${
                googleProfile.email
                  ? "bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
            />
            {googleProfile.email && (
              <p className="text-xs text-slate-500 mt-1.5">
                Verified via Google Sign-in
              </p>
            )}
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}

          <PrefixedInputField
            label="Phone Number"
            required
            prefix="+91"
            type="tel"
            name="contact"
            value={baseData.contact}
            onChange={handleBaseChange}
            placeholder="9876543210"
            maxLength={10}
          />
          {errors.contact && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.contact}
            </p>
          )}
        </div>
      );
    }

    // ── Step 2 (Mentor): Professional Details ──────────────────────────────
    if (role === "mentor" && currentStep === 2) {
      return (
        <div className="space-y-6">
          <InputField
            label="Job Title"
            required
            type="text"
            name="jobTitle"
            value={mentorData.jobTitle}
            onChange={handleMentorChange}
            placeholder="e.g. Senior Software Engineer"
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.jobTitle}
            </p>
          )}

          <InputField
            label="Company"
            required
            type="text"
            name="company"
            value={mentorData.company}
            onChange={handleMentorChange}
            placeholder="e.g. Google"
          />
          {errors.company && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.company}
            </p>
          )}

          <ChipGroup
            label="Years of Experience"
            required
            options={EXPERIENCE_OPTIONS}
            value={mentorData.yearsOfExperience}
            onChange={(val) =>
              setMentorData((prev) => ({ ...prev, yearsOfExperience: val }))
            }
          />
          {errors.yearsOfExperience && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.yearsOfExperience}
            </p>
          )}

          <ChipGroup
            label="Area of Expertise"
            required
            options={EXPERTISE_AREAS}
            value={mentorData.areaOfExpertise}
            onChange={(val) =>
              setMentorData((prev) => ({ ...prev, areaOfExpertise: val }))
            }
            columns={2}
          />
          {errors.areaOfExpertise && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.areaOfExpertise}
            </p>
          )}
        </div>
      );
    }

    // ── Step 2 (Student) / Step 3 (Mentor): Education + Online Profiles ────
    return (
      <div className="space-y-6">
        {role === "student" && (
          <>
            <InputField
              label="College / University"
              required
              type="text"
              name="collegeId"
              value={studentData.collegeId}
              onChange={handleStudentChange}
              placeholder="e.g. IIT Bombay"
            />
            {errors.collegeId && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.collegeId}
              </p>
            )}

            <div className="border-t border-slate-200 pt-6 mt-6">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                Online Profiles (Optional)
              </p>
            </div>
          </>
        )}

        <PrefixedInputField
          label="LinkedIn"
          prefix="linkedin.com/in/"
          type="text"
          name="linkedin"
          value={baseData.linkedin}
          onChange={handleBaseChange}
          placeholder="yourhandle"
        />

        <PrefixedInputField
          label="GitHub"
          prefix="github.com/"
          type="text"
          name="github"
          value={baseData.github}
          onChange={handleBaseChange}
          placeholder="yourhandle"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            All set! 🎉
          </p>
          <p className="text-xs text-blue-700">
            You can update your profiles anytime from your account settings.
          </p>
        </div>
      </div>
    );
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500 mb-4">
            <span className="text-xl font-bold text-white">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MentorConnect</h1>
          <p className="text-blue-200 text-sm">
            {role === "student" ? "Student" : "Mentor"} Onboarding
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-1">
                    Step {currentStep} of {totalSteps}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {currentStepData.title}
                  </h2>
                </div>
                <div className="text-4xl">{currentStepData.icon}</div>
              </div>

              {/* Step dots */}
              <div className="flex gap-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      step.id <= currentStep ? "bg-blue-500" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">{renderStep()}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentStep === 1
                    ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <div className="flex items-center gap-3">
                {onSkip && currentStep === 1 && (
                  <button
                    onClick={onSkip}
                    className="text-xs text-slate-400 hover:text-slate-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    Skip for now
                  </button>
                )}

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:shadow-xl active:scale-95 transition-all shadow-lg"
                  >
                    <Check className="w-4 h-4" /> Complete Setup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-6">
          © 2026 MentorConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default OnboardingForm;
