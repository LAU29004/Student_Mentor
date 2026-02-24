import React from 'react';
import { Calendar, Clock, Star, TrendingUp, BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { mockFeedback, mockCurrentMentor } from '../data/mockData';

export function SessionHistory() {
  const completedSessions = mockFeedback.filter(f => f.mentorId === mockCurrentMentor.id);
  const totalSessions = completedSessions.length;
  const averageRating = completedSessions.length > 0
    ? (completedSessions.reduce((sum, f) => sum + f.rating, 0) / completedSessions.length).toFixed(1)
    : '0.0';
  const wouldBookAgainCount = completedSessions.filter(f => f.wouldBookAgain).length;
  const repeatRate = totalSessions > 0 
    ? Math.round((wouldBookAgainCount / totalSessions) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-gray-900 mb-1">{totalSessions}</h3>
          <p className="text-sm text-gray-600">Total Sessions</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-gray-900 mb-1">{averageRating} ⭐</h3>
          <p className="text-sm text-gray-600">Average Rating</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-gray-900 mb-1">{repeatRate}%</h3>
          <p className="text-sm text-gray-600">Would Book Again</p>
        </Card>
      </div>

      {/* Session Timeline */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Session History</h3>

        {completedSessions.length > 0 ? (
          <div className="space-y-6">
            {completedSessions.map((session) => (
              <div key={session.id} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:pb-0">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 -ml-2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div>

                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">Session Completed</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < session.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    {session.wouldBookAgain && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Would book again
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">What worked well:</p>
                      <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
                        {session.whatWorkedWell}
                      </p>
                    </div>

                    {session.areasForImprovement && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Areas for improvement:</p>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
                          {session.areasForImprovement}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Time Management:</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < session.timeManagement ? 'bg-indigo-600' : 'bg-gray-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-gray-600">{session.timeManagement}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">No Sessions Yet</h4>
            <p className="text-gray-600">Completed sessions will appear here</p>
          </div>
        )}
      </Card>
    </div>
  );
}
