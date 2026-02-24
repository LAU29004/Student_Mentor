# 🎓 MentorConnect - Student-Mentor Scheduling Platform

A high-fidelity, two-sided scheduling platform built with React, TypeScript, and Tailwind CSS, featuring role-based dashboards for both students and mentors with seamless booking workflows and interactive calendar management.

## ✨ Features

### 🎯 Dual User Roles

**Student Portal:**
- Discover and search mentors by expertise, subject, and availability
- View detailed mentor profiles with ratings, reviews, and weekly availability
- Book mentoring sessions with multi-step booking flow
- Track upcoming sessions and booking status (Pending/Confirmed)
- Submit post-session feedback with ratings and detailed reviews
- View session history and progress metrics

**Mentor Portal:**
- Interactive Google Calendar-style availability management
- Drag-and-drop interface to create availability blocks
- Real-time booking management (Accept/Reschedule/Decline)
- View upcoming sessions and pending requests
- Track session history and student feedback
- Performance metrics dashboard (avg rating, total sessions, repeat rate)

### 🎨 Design System

- **Modern SaaS Aesthetic**: Clean, professional EdTech design
- **Color Palette**: Indigo primary, with semantic colors (green for success, amber for warnings)
- **Typography**: Inter font family for optimal readability
- **Components**: Reusable UI components built with Radix UI primitives
- **Responsive**: Desktop-first design (1440px) with mobile-ready foundations

### 🔑 Key Workflows

#### Student Booking Flow:
1. **Login** → Enter credentials (use "student@email.com" for Student view)
2. **Dashboard** → Browse quick action cards and upcoming sessions
3. **Mentor Discovery** → Search and filter mentors by expertise
4. **View Profile** → See detailed mentor info, ratings, and availability
5. **Book Session** → Select date/time, add session notes, confirm booking
6. **Confirmation** → Receive booking status (Pending mentor approval)
7. **Meeting** → Join session when confirmed
8. **Feedback** → Submit 5-star rating and detailed feedback

#### Mentor Availability Flow:
1. **Login** → Enter credentials (use "mentor@email.com" for Mentor view)
2. **Dashboard** → View summary cards (upcoming sessions, pending requests, rating)
3. **Availability Tab** → Access interactive calendar
4. **Set Availability** → Click and drag to create time blocks
5. **Manage Bookings** → Accept/reschedule/decline booking requests
6. **Session History** → Review completed sessions and feedback
7. **Save** → Persist availability changes

### 📅 Interactive Availability Calendar

The centerpiece feature inspired by Google Calendar:

- **Drag-to-Create**: Click and drag across time slots to create availability blocks
- **Visual Feedback**: Blue translucent blocks for availability, green for confirmed bookings
- **Current Time Indicator**: Red horizontal line showing real-time position
- **Weekly Grid**: 7-day view with hourly increments (8 AM - 10 PM)
- **Hover Actions**: Delete availability blocks with hover controls
- **Smart Layout**: Mini calendar sidebar with active bookings list
- **Real-time Updates**: Dynamic positioning and smooth interactions

## 🚀 How to Use

### Quick Start
1. Click the login page to authenticate
2. Use `student@email.com` for Student view or `mentor@email.com` for Mentor view
3. Any password works in demo mode

### Demo Mode Features
- **Role Switcher**: Fixed panel in bottom-right corner
- Switch between Student and Mentor views instantly
- Sign out to return to login screen

### Student Actions:
- **Search Mentors**: Use the search bar to find mentors by name or expertise
- **Book Sessions**: Click "Book Session" on any mentor card
- **View Profiles**: Click "View Profile" for detailed mentor information
- **Track Bookings**: Monitor upcoming sessions in the dashboard

### Mentor Actions:
- **Set Availability**: Navigate to the Availability tab and drag to create time blocks
- **Manage Requests**: Go to Bookings tab to handle pending requests
- **View Feedback**: Check the Feedback tab to see student reviews
- **Track History**: Review completed sessions in the History tab

## 🎨 Component Architecture

```
/src/app/
├── App.tsx                      # Main application with role routing
├── components/
│   ├── AuthScreen.tsx           # Login page (email, password, SSO)
│   ├── StudentDashboard.tsx     # Student portal home
│   ├── MentorDashboard.tsx      # Mentor portal home
│   ├── AvailabilityCalendar.tsx # Interactive calendar (PRIMARY FEATURE)
│   ├── BookingFlow.tsx          # Multi-step booking wizard
│   ├── BookingManagement.tsx    # Mentor booking request handler
│   ├── MentorProfileModal.tsx   # Detailed mentor profile view
│   ├── FeedbackModal.tsx        # Post-session feedback form
│   ├── SessionHistory.tsx       # Mentor session timeline
│   ├── StudentHistory.tsx       # Student session history
│   └── ui/                      # Reusable UI components
└── data/
    └── mockData.ts              # Sample data (mentors, bookings, feedback)
```

## 🎯 User Experience Highlights

### State Management
- **Pending Status**: Yellow badge (⏳) for awaiting mentor confirmation
- **Confirmed Status**: Green badge (✓) for accepted bookings
- **Rescheduled Status**: Blue badge (🔄) for time changes
- **Completed Status**: Session moved to history with feedback prompt

### Visual Indicators
- 🟢 Green dot = Available this week
- ⭐ Star ratings for mentor quality
- 📊 Progress metrics and analytics
- 🔴 Red line = Current time on calendar

### Accessibility
- High-contrast color scheme
- Clear visual hierarchy
- Descriptive button labels
- Keyboard-friendly interactions

## 🛠️ Tech Stack

- **Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion successor)
- **Notifications**: Sonner toast system
- **Build Tool**: Vite

## 📦 Mock Data

The application uses realistic mock data including:
- 6 diverse mentors with different expertise areas
- Pre-configured availability blocks
- Sample bookings in various states
- Student feedback with ratings and comments
- Weekly availability schedules

## 🎓 Platform Goals

1. **Seamless Scheduling**: Minimize friction in booking process
2. **High Booking Conversion**: Clear CTAs and simplified flows
3. **Clarity of Availability**: Visual calendar makes timing obvious
4. **Quality Assurance**: Feedback system ensures mentor quality
5. **User Empowerment**: Students find help, mentors manage time effectively

## 💡 Future Enhancements

- Real-time notifications for booking confirmations
- Video integration with Zoom/Google Meet
- Payment processing for paid mentoring sessions
- Advanced filtering (price range, ratings, availability)
- Calendar sync with Google/Outlook
- Mentor analytics dashboard
- Student progress tracking
- Automated reminders via email/SMS

---

Built with ❤️ using modern web technologies for optimal performance and user experience.
