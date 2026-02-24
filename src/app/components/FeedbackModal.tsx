import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { type Booking } from '../data/mockData';
import { toast } from 'sonner';

interface FeedbackModalProps {
  booking: Booking;
  onClose: () => void;
}

export function FeedbackModal({ booking, onClose }: FeedbackModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [whatWorkedWell, setWhatWorkedWell] = useState('');
  const [areasForImprovement, setAreasForImprovement] = useState('');
  const [timeManagement, setTimeManagement] = useState([3]);
  const [wouldBookAgain, setWouldBookAgain] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!whatWorkedWell.trim()) {
      toast.error('Please share what worked well');
      return;
    }
    if (wouldBookAgain === null) {
      toast.error('Please indicate if you would book again');
      return;
    }

    setStep('success');
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Session Feedback</h2>
                  <p className="text-gray-600">Help us improve your learning experience</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Session Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={booking.mentorPhoto} alt={booking.mentorName} />
                  <AvatarFallback>{booking.mentorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{booking.mentorName}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {booking.startTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          value <= (hoveredRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-3 text-2xl font-semibold text-gray-900">
                      {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                    </span>
                  )}
                </div>
              </div>

              {/* What Worked Well */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  What worked well? <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Share the positive aspects of your session..."
                  value={whatWorkedWell}
                  onChange={(e) => setWhatWorkedWell(e.target.value)}
                  className="h-24 resize-none"
                />
              </div>

              {/* Areas for Improvement */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Areas for improvement
                </label>
                <Textarea
                  placeholder="Any suggestions for improvement? (Optional)"
                  value={areasForImprovement}
                  onChange={(e) => setAreasForImprovement(e.target.value)}
                  className="h-24 resize-none"
                />
              </div>

              {/* Time Management */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Time Management
                </label>
                <div className="space-y-3">
                  <Slider
                    value={timeManagement}
                    onValueChange={setTimeManagement}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Poor</span>
                    <span className="font-medium text-indigo-600">{timeManagement[0]}/5</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>

              {/* Would Book Again */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Would you book this mentor again? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setWouldBookAgain(true)}
                    className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                      wouldBookAgain === true
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">👍</div>
                      <p className="font-medium text-gray-900">Yes</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWouldBookAgain(false)}
                    className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                      wouldBookAgain === false
                        ? 'border-gray-500 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">👎</div>
                      <p className="font-medium text-gray-900">No</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleSubmit}
                >
                  Submit Feedback
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-center max-w-md">
              Your feedback has been submitted successfully and will help improve the mentoring experience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
