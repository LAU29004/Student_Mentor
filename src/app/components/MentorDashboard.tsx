import React, { useState } from 'react';
import { Calendar, Users, Star, Clock, Settings, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockBookings, mockFeedback, mockCurrentMentor, mockMentors } from '../data/mockData';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { BookingManagement } from './BookingManagement';
import { SessionHistory } from './SessionHistory';

export function MentorDashboard() {
  const [activeTab, setActiveTab] = useState('availability');
  
  const mentorBookings = mockBookings.filter(b => b.mentorId === mockCurrentMentor.id);
  const upcomingSessions = mentorBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  const pendingRequests = mentorBookings.filter(b => b.status === 'pending').length;
  
  const mentorFeedback = mockFeedback.filter(f => f.mentorId === mockCurrentMentor.id);
  const averageRating = mentorFeedback.length > 0
    ? (mentorFeedback.reduce((sum, f) => sum + f.rating, 0) / mentorFeedback.length).toFixed(1)
    : '5.0';

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
                <p className="text-sm text-gray-500">Mentor Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{mockCurrentMentor.name}</p>
                  <p className="text-xs text-gray-500">Mentor</p>
                </div>
                <Avatar>
                  <AvatarImage src={mockCurrentMentor.photo} alt={mockCurrentMentor.name} />
                  <AvatarFallback>SM</AvatarFallback>
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
            Welcome back, {mockCurrentMentor.name.split(' ')[1]}! 👋
          </h2>
          <p className="text-gray-600">Manage your availability and upcoming sessions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{upcomingSessions}</h3>
            <p className="text-sm text-gray-600">Upcoming Sessions</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              {pendingRequests > 0 && (
                <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                  {pendingRequests} New
                </Badge>
              )}
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{pendingRequests}</h3>
            <p className="text-sm text-gray-600">Pending Requests</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{averageRating} ⭐</h3>
            <p className="text-sm text-gray-600">Average Rating</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="availability" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Bookings
              {pendingRequests > 0 && (
                <Badge className="ml-2 bg-amber-500 text-white hover:bg-amber-500 h-5 px-1.5">
                  {pendingRequests}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="availability">
            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingManagement bookings={mentorBookings} />
          </TabsContent>

          <TabsContent value="history">
            <SessionHistory />
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Student Feedback</h3>
              <div className="space-y-4">
                {mentorFeedback.length > 0 ? (
                  mentorFeedback.map((feedback) => (
                    <div key={feedback.id} className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < feedback.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(feedback.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <Badge className={
                          feedback.wouldBookAgain 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        }>
                          {feedback.wouldBookAgain ? '✓ Would book again' : 'One-time session'}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">What worked well:</p>
                          <p className="text-gray-900">{feedback.whatWorkedWell}</p>
                        </div>
                        {feedback.areasForImprovement && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Areas for improvement:</p>
                            <p className="text-gray-900">{feedback.areasForImprovement}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Time Management:</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < feedback.timeManagement ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                              ></div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{feedback.timeManagement}/5</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No feedback yet</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
