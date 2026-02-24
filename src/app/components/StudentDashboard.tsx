import React, { useState } from 'react';
import { Calendar, Star, BookOpen, Settings, Search, Filter, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { mockMentors, mockBookings, mockFeedback, mockCurrentStudent, type Mentor } from '../data/mockData';
import { MentorProfileModal } from './MentorProfileModal';
import { BookingFlow } from './BookingFlow';
import { FeedbackModal } from './FeedbackModal';

interface StudentDashboardProps {
  onViewChange: (view: string) => void;
}

export function StudentDashboard({ onViewChange }: StudentDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [feedbackBooking, setFeedbackBooking] = useState<any>(null);

  const filteredMentors = mockMentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const upcomingSessions = mockBookings.filter(b => b.studentId === mockCurrentStudent.id && b.status !== 'completed');
  const completedSessions = mockFeedback.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MentorConnect</h1>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{mockCurrentStudent.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                <Avatar>
                  <AvatarImage src={mockCurrentStudent.photo} alt={mockCurrentStudent.name} />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome back, {mockCurrentStudent.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">Ready to learn something new today?</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Primary</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Book Mentor Session</h3>
            <p className="text-sm text-gray-600">Find and schedule time with expert mentors</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewChange('history')}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-500 rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Feedback History</h3>
            <p className="text-sm text-gray-600">{completedSessions} sessions completed</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Session Notes</h3>
            <p className="text-sm text-gray-600">Review your learning materials</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Progress</h3>
            <p className="text-sm text-gray-600">Track your learning journey</p>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
            <div className="grid gap-4">
              {upcomingSessions.map((booking) => (
                <Card key={booking.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={booking.mentorPhoto} alt={booking.mentorName} />
                        <AvatarFallback>{booking.mentorName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{booking.mentorName}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                        }
                      >
                        {booking.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                      </Badge>
                      <Button variant="outline" size="sm">Join Meeting</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Mentor Discovery */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Discover Mentors</h3>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, subject, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>

          {/* Mentor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.photo} alt={mentor.name} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{mentor.name}</h4>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-gray-900">{mentor.rating}</span>
                        <span className="text-sm text-gray-500">({mentor.totalReviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {mentor.bio}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Available this week</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedMentor(mentor)}
                    >
                      View Profile
                    </Button>
                    <Button
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => setBookingMentor(mentor)}
                    >
                      Book Session
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedMentor && (
        <MentorProfileModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
          onBook={() => {
            setBookingMentor(selectedMentor);
            setSelectedMentor(null);
          }}
        />
      )}

      {bookingMentor && (
        <BookingFlow
          mentor={bookingMentor}
          onClose={() => setBookingMentor(null)}
        />
      )}

      {feedbackBooking && (
        <FeedbackModal
          booking={feedbackBooking}
          onClose={() => setFeedbackBooking(null)}
        />
      )}
    </div>
  );
}