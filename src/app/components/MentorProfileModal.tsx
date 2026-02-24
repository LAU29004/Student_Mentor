import React from 'react';
import { X, Star, Clock, Award, BookOpen, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { type Mentor } from '../data/mockData';

interface MentorProfileModalProps {
  mentor: Mentor;
  onClose: () => void;
  onBook: () => void;
}

const mockReviews = [
  {
    id: '1',
    studentName: 'Alex Johnson',
    rating: 5,
    date: '2026-02-15',
    comment: 'Excellent mentor! Very patient and explains complex concepts clearly.'
  },
  {
    id: '2',
    studentName: 'Maria Garcia',
    rating: 5,
    date: '2026-02-10',
    comment: 'Helped me ace my exam. Highly recommend!'
  },
  {
    id: '3',
    studentName: 'Tom Wilson',
    rating: 4,
    date: '2026-02-05',
    comment: 'Great session, learned a lot. Would book again.'
  }
];

export function MentorProfileModal({ mentor, onClose, onBook }: MentorProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={mentor.photo} alt={mentor.name} />
                <AvatarFallback>{mentor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{mentor.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-900">{mentor.rating}</span>
                    <span className="text-sm text-gray-500">({mentor.totalReviews} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {mentor.experience}
                  </div>
                  {mentor.hourlyRate && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-900">${mentor.hourlyRate}/hr</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <Badge key={skill} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">About</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Availability Preview */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Availability This Week</h3>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div
                  key={day}
                  className={`p-3 rounded-lg text-center ${
                    index === 1 || index === 3 || index === 5
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="text-xs font-medium text-gray-600 mb-1">{day}</div>
                  {index === 1 || index === 3 || index === 5 ? (
                    <div className="w-2 h-2 rounded-full bg-green-500 mx-auto"></div>
                  ) : (
                    <div className="text-xs text-gray-400">—</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
            </div>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{review.studentName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={onBook}>
              <Calendar className="w-4 h-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
