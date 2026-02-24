import React, { useState } from 'react';
import { Calendar, Clock, Star, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { mockFeedback, mockBookings, mockCurrentStudent } from '../data/mockData';
import { FeedbackModal } from './FeedbackModal';

export function StudentHistory() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const studentFeedback = mockFeedback.filter(f => f.studentId === mockCurrentStudent.id);
  const completedBookings = mockBookings.filter(
    b => b.studentId === mockCurrentStudent.id && b.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Session History</h1>
              <p className="text-gray-600">Review your past sessions and feedback</p>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-1">
              {studentFeedback.length}
            </h3>
            <p className="text-sm text-gray-600">Sessions Completed</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-1">
              {studentFeedback.length > 0
                ? (studentFeedback.reduce((sum, f) => sum + f.rating, 0) / studentFeedback.length).toFixed(1)
                : '0.0'}
              ⭐
            </h3>
            <p className="text-sm text-gray-600">Avg. Rating Given</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-1">
              {studentFeedback.filter(f => f.wouldBookAgain).length}
            </h3>
            <p className="text-sm text-gray-600">Would Book Again</p>
          </Card>
        </div>

        {/* Feedback History */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Feedback</h3>

          {studentFeedback.length > 0 ? (
            <div className="space-y-6">
              {studentFeedback.map((feedback) => (
                <div key={feedback.id} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:pb-0">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 -ml-2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={mockBookings.find(b => b.id === feedback.bookingId)?.mentorPhoto}
                            alt={feedback.mentorName}
                          />
                          <AvatarFallback>{feedback.mentorName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{feedback.mentorName}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(feedback.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
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
                        </div>
                      </div>

                      {feedback.wouldBookAgain && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Would book again
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">What worked well:</p>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
                          {feedback.whatWorkedWell}
                        </p>
                      </div>

                      {feedback.areasForImprovement && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Areas for improvement:
                          </p>
                          <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
                            {feedback.areasForImprovement}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Time Management:</span>
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
                        <span className="text-gray-600">{feedback.timeManagement}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">No Feedback Yet</h4>
              <p className="text-gray-600">Complete a session to leave feedback</p>
            </div>
          )}
        </Card>
      </div>

      {/* Feedback Modal */}
      {selectedBooking && (
        <FeedbackModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
