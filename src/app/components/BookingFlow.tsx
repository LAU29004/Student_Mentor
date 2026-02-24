import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { type Mentor } from '../data/mockData';

interface BookingFlowProps {
  mentor: Mentor;
  onClose: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function BookingFlow({ mentor, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState('');

  // Generate next 7 days
  const getNextWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const nextWeek = getNextWeek();

  const handleConfirmBooking = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">Book a Session</h2>
              <p className="text-gray-600">Schedule time with {mentor.name}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            <div className={`flex items-center gap-2 ${step === 'select' ? 'text-indigo-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'select' ? 'bg-indigo-100' : 'bg-green-100'
              }`}>
                {step === 'select' ? '1' : <CheckCircle className="w-5 h-5" />}
              </div>
              <span className="text-sm font-medium">Select Time</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${
              step === 'confirm' ? 'text-indigo-600' : step === 'success' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'confirm' ? 'bg-indigo-100' : step === 'success' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {step === 'success' ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className="text-sm font-medium">Confirm</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'success' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {step === 'success' ? <CheckCircle className="w-5 h-5" /> : '3'}
              </div>
              <span className="text-sm font-medium">Done</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'select' && (
            <div className="space-y-6">
              {/* Mentor Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={mentor.photo} alt={mentor.name} />
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{mentor.name}</p>
                  <p className="text-sm text-gray-600">{mentor.expertise.join(', ')}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {nextWeek.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="text-xs text-gray-600 mb-1">{weekDays[date.getDay()]}</div>
                      <div className="font-medium text-gray-900">{date.getDate()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Select Time (1 hour session)</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((time) => {
                      // Mock availability - some slots unavailable
                      const isAvailable = Math.random() > 0.3;
                      return (
                        <button
                          key={time}
                          onClick={() => isAvailable && setSelectedTime(time)}
                          disabled={!isAvailable}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedTime === time
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                              : isAvailable
                              ? 'border-gray-200 hover:border-indigo-300'
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="font-medium text-sm">{time}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-indigo-50 border-2 border-indigo-600"></div>
                      <span className="text-gray-600">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded border-2 border-gray-200"></div>
                      <span className="text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-gray-50 border-2 border-gray-100"></div>
                      <span className="text-gray-600">Booked</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Session Notes */}
              {selectedTime && (
                <div>
                  <label className="block font-semibold text-gray-900 mb-3">
                    Session Notes (Optional)
                  </label>
                  <Textarea
                    placeholder="What would you like to discuss in this session? (Max 200 characters)"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value.slice(0, 200))}
                    className="h-24 resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">{sessionNotes.length}/200</p>
                </div>
              )}
            </div>
          )}

          {step === 'confirm' && selectedDate && selectedTime && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Review Your Booking</h4>
                  <p className="text-sm text-blue-700">Please confirm the details below before submitting.</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">Mentor</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={mentor.photo} alt={mentor.name} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{mentor.name}</p>
                      <p className="text-sm text-gray-600">{mentor.expertise[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">Date & Time</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {selectedTime} - {parseInt(selectedTime) + 1}:00 (1 hour)
                    </span>
                  </div>
                </div>

                {sessionNotes && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-2">Session Notes</p>
                    <p className="text-gray-900">{sessionNotes}</p>
                  </div>
                )}

                {/* {mentor.hourlyRate && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-2">Total Cost</p>
                    <p className="text-2xl font-semibold text-gray-900">${mentor.hourlyRate}</p>
                  </div>
                )} */}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> You'll receive a confirmation email with a Zoom link once the mentor accepts your booking request.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Booking Submitted!</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Your booking request has been sent to {mentor.name}. You'll receive a confirmation email once they accept.
              </p>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-sm px-4 py-2">
                ⏳ Pending Confirmation
              </Badge>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'success' && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              {step === 'select' ? (
                <>
                  <Button variant="outline" className="flex-1" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep('confirm')}
                  >
                    Continue
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" onClick={() => setStep('select')}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
