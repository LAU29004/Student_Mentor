export interface BaseProfile {
  id: string; // ✅ add this
  name: string;
  email: string;
  contact: string;
  picture: string;
  linkedin: string;
  github: string;
}

export interface StudentProfile extends BaseProfile {
  role: 'student';
  collegeId: string;
  photo?: string
}

export interface MentorProfile extends BaseProfile {
  role: 'mentor';
  jobTitle: string;
  company: string;
  yearsOfExperience: string;
  areaOfExpertise: string;
}

export type UserProfile = StudentProfile | MentorProfile;