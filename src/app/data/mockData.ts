// Mock data for the Student-Mentor Scheduling Platform

export interface Mentor {
  id: string;
  name: string;
  photo: string;
  expertise: string[];
  bio: string;
  rating: number;
  totalReviews: number;
  experience: string;
  hourlyRate?: number;
}

export interface TimeSlot {
  day: number; // 0-6 (Sun-Sat)
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorPhoto: string;
  studentId: string;
  studentName: string;
  studentPhoto: string;
  date: string; // ISO date
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  sessionNotes?: string;
  subject?: string;
}

export interface Feedback {
  id: string;
  bookingId: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  rating: number;
  whatWorkedWell: string;
  areasForImprovement: string;
  timeManagement: number; // 1-5
  wouldBookAgain: boolean;
  date: string;
}

export interface AvailabilityBlock {
  id: string;
  mentorId: string;
  day: number; // 0-6
  startHour: number; // 0-23
  endHour: number; // 0-23
}

export const mockMentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Sarah Mitchell',
    photo: 'https://images.unsplash.com/photo-1758270704587-43339a801396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzb3IlMjBhY2FkZW1pYyUyMGVkdWNhdG9yfGVufDF8fHx8MTc3MTkyMDExNnww&ixlib=rb-4.1.0&q=80&w=1080',
    expertise: ['Mathematics', 'Statistics', 'Data Science'],
    bio: 'PhD in Mathematics with 10+ years of teaching experience. Specializing in helping students master calculus, linear algebra, and statistical analysis.',
    rating: 4.9,
    totalReviews: 127,
    experience: '10+ years',
    hourlyRate: 50
  },
  {
    id: 'm2',
    name: 'James Rodriguez',
    photo: 'https://images.unsplash.com/photo-1659353221237-6a1cfb73fd90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYnVzaW5lc3MlMjBtZW50b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxOTIwMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    expertise: ['Business Strategy', 'Entrepreneurship', 'Marketing'],
    bio: 'Former Fortune 500 executive turned mentor. Helping aspiring entrepreneurs build successful businesses and master strategic thinking.',
    rating: 4.8,
    totalReviews: 94,
    experience: '8 years',
    hourlyRate: 75
  },
  {
    id: 'm3',
    name: 'Emily Chen',
    photo: 'https://images.unsplash.com/photo-1765248149194-cde5803aada0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwdGVhY2hlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE5MjAxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    expertise: ['Computer Science', 'Python', 'Machine Learning'],
    bio: 'Software engineer at a leading tech company. Passionate about teaching programming fundamentals and AI/ML concepts to beginners.',
    rating: 5.0,
    totalReviews: 156,
    experience: '6 years',
    hourlyRate: 60
  },
  {
    id: 'm4',
    name: 'Prof. Michael Thompson',
    photo: 'https://images.unsplash.com/photo-1758685845906-6f705cde4fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTIwMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    expertise: ['Physics', 'Engineering', 'Research Methods'],
    bio: 'University professor specializing in applied physics and engineering principles. Helping students excel in STEM subjects.',
    rating: 4.7,
    totalReviews: 83,
    experience: '12 years',
    hourlyRate: 55
  },
  {
    id: 'm5',
    name: 'David Washington',
    photo: 'https://images.unsplash.com/photo-1602657863501-721a979aa2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbGUlMjBwcm9mZXNzaW9uYWwlMjBlZHVjYXRvcnxlbnwxfHx8fDE3NzE5MjAxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    expertise: ['Creative Writing', 'Literature', 'Essay Coaching'],
    bio: 'Award-winning author and writing coach. Specializing in academic writing, creative storytelling, and college essay preparation.',
    rating: 4.9,
    totalReviews: 112,
    experience: '9 years',
    hourlyRate: 45
  },
  {
    id: 'm6',
    name: 'Alex Martinez',
    photo: 'https://images.unsplash.com/photo-1761039808597-5639866bab8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGNvYWNoJTIwbWVudG9yfGVufDF8fHx8MTc3MTkyMDExNnww&ixlib=rb-4.1.0&q=80&w=1080',
    expertise: ['Web Development', 'React', 'UI/UX Design'],
    bio: 'Full-stack developer and design enthusiast. Teaching modern web development with focus on React, TypeScript, and user experience.',
    rating: 4.8,
    totalReviews: 68,
    experience: '5 years',
    hourlyRate: 65
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    mentorId: 'm1',
    mentorName: 'Dr. Sarah Mitchell',
    mentorPhoto: mockMentors[0].photo,
    studentId: 's1',
    studentName: 'Jessica Parker',
    studentPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    date: '2026-02-26',
    startTime: '14:00',
    endTime: '15:00',
    status: 'confirmed',
    sessionNotes: 'Need help with calculus derivatives',
    subject: 'Mathematics'
  },
  {
    id: 'b2',
    mentorId: 'm3',
    mentorName: 'Emily Chen',
    mentorPhoto: mockMentors[2].photo,
    studentId: 's1',
    studentName: 'Jessica Parker',
    studentPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    date: '2026-02-27',
    startTime: '10:00',
    endTime: '11:00',
    status: 'pending',
    sessionNotes: 'Introduction to Python programming',
    subject: 'Computer Science'
  },
  {
    id: 'b3',
    mentorId: 'm2',
    mentorName: 'James Rodriguez',
    mentorPhoto: mockMentors[1].photo,
    studentId: 's2',
    studentName: 'Tom Anderson',
    studentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    date: '2026-02-25',
    startTime: '16:00',
    endTime: '17:00',
    status: 'confirmed',
    sessionNotes: 'Startup business plan review',
    subject: 'Business Strategy'
  },
  {
    id: 'b4',
    mentorId: 'm1',
    mentorName: 'Dr. Sarah Mitchell',
    mentorPhoto: mockMentors[0].photo,
    studentId: 's3',
    studentName: 'Maria Garcia',
    studentPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    date: '2026-02-28',
    startTime: '13:00',
    endTime: '14:00',
    status: 'pending',
    sessionNotes: 'Statistics exam preparation',
    subject: 'Statistics'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: 'f1',
    bookingId: 'b10',
    mentorId: 'm1',
    mentorName: 'Dr. Sarah Mitchell',
    studentId: 's1',
    rating: 5,
    whatWorkedWell: 'Clear explanations and patient teaching style. Helped me understand derivatives much better!',
    areasForImprovement: 'Would love more practice problems to work through.',
    timeManagement: 5,
    wouldBookAgain: true,
    date: '2026-02-20'
  },
  {
    id: 'f2',
    bookingId: 'b11',
    mentorId: 'm3',
    mentorName: 'Emily Chen',
    studentId: 's1',
    rating: 5,
    whatWorkedWell: 'Excellent coding examples and real-world projects. Made Python fun to learn!',
    areasForImprovement: 'None, session was perfect.',
    timeManagement: 5,
    wouldBookAgain: true,
    date: '2026-02-18'
  },
  {
    id: 'f3',
    bookingId: 'b12',
    mentorId: 'm5',
    mentorName: 'David Washington',
    studentId: 's1',
    rating: 4,
    whatWorkedWell: 'Great feedback on my essay structure and writing style.',
    areasForImprovement: 'Would have liked more time on conclusion paragraphs.',
    timeManagement: 4,
    wouldBookAgain: true,
    date: '2026-02-15'
  }
];

export const mockAvailability: AvailabilityBlock[] = [
  // Monday
  { id: 'a1', mentorId: 'm1', day: 1, startHour: 9, endHour: 12 },
  { id: 'a2', mentorId: 'm1', day: 1, startHour: 14, endHour: 17 },
  // Wednesday
  { id: 'a3', mentorId: 'm1', day: 3, startHour: 10, endHour: 15 },
  // Friday
  { id: 'a4', mentorId: 'm1', day: 5, startHour: 13, endHour: 18 },
  // Saturday
  { id: 'a5', mentorId: 'm1', day: 6, startHour: 10, endHour: 14 },
];

export const mockCurrentStudent = {
  id: 's1',
  name: 'Jessica Parker',
  email: 'jessica.parker@email.com',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
};

export const mockCurrentMentor = {
  id: 'm1',
  name: 'Dr. Sarah Mitchell',
  email: 'sarah.mitchell@email.com',
  photo: mockMentors[0].photo
};
