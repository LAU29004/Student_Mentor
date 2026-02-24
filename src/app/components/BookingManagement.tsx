import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { type Booking } from '../data/mockData';
import { toast } from 'sonner';

interface BookingManagementProps {
  bookings: Booking[];
}

export function BookingManagement({ bookings }: BookingManagementProps) {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'reschedule' | null>(null);
  const [responseMessage, setResponseMessage] = useState('');

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

  const handleAccept = (bookingId: string) => {
    toast.success('Booking accepted! Student will be notified.');
    setSelectedBooking(null);
    setActionType(null);
  };

  const handleSuggestNewTime = (bookingId: string) => {
    if (!responseMessage) {
      toast.error('Please provide alternative times');
      return;
    }
    toast.success('Alternative times sent to student');
    setSelectedBooking(null);
    setActionType(null);
    setResponseMessage('');
  };

  const handleDecline = (bookingId: string) => {
    toast.error('Booking declined');
    setSelectedBooking(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {pendingBookings.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Pending Requests ({pendingBookings.length})
            </h3>
          </div>

          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={booking.studentPhoto} alt={booking.studentName} />
                      <AvatarFallback>{booking.studentName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{booking.studentName}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                        {booking.subject && (
                          <Badge variant="secondary" className="text-xs">
                            {booking.subject}
                          </Badge>
                        )}
                        {booking.sessionNotes && (
                          <div className="bg-gray-50 rounded p-3 mt-2">
                            <p className="text-sm font-medium text-gray-700 mb-1">Session Notes:</p>
                            <p className="text-sm text-gray-900">{booking.sessionNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                    Pending
                  </Badge>
                </div>

                {/* Action Area */}
                {selectedBooking === booking.id ? (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    {actionType === 'reschedule' && (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Suggest Alternative Times
                        </label>
                        <Textarea
                          placeholder="E.g., I'm available on Wednesday at 2 PM or Thursday at 10 AM..."
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          className="h-24"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(null);
                              setActionType(null);
                              setResponseMessage('');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => handleSuggestNewTime(booking.id)}
                          >
                            Send Suggestion
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAccept(booking.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedBooking(booking.id);
                        setActionType('reschedule');
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Suggest New Time
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDecline(booking.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Confirmed Bookings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Confirmed Sessions ({confirmedBookings.length})
          </h3>
        </div>

        {confirmedBookings.length > 0 ? (
          <div className="space-y-4">
            {confirmedBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={booking.studentPhoto} alt={booking.studentName} />
                      <AvatarFallback>{booking.studentName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{booking.studentName}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                        {booking.subject && (
                          <Badge variant="secondary" className="text-xs">
                            {booking.subject}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Confirmed
                    </Badge>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No confirmed sessions yet</p>
          </div>
        )}
      </Card>

      {/* Empty State for Pending */}
      {pendingBookings.length === 0 && (
        <Card className="p-6">
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">No Pending Requests</h3>
            <p className="text-gray-600">You're all caught up! New booking requests will appear here.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
