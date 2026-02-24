import React, { useState, useRef, useEffect } from 'react';
import { Save, Calendar as CalendarIcon, Trash2, GripVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { mockAvailability, mockBookings, type AvailabilityBlock, mockCurrentMentor } from '../data/mockData';
import { toast } from 'sonner';

const HOURS = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOUR_HEIGHT = 60; // px per hour
const GRID_START = 8; // 8 AM

interface TimeBlock {
  id: string;
  day: number;
  startHour: number;
  endHour: number;
}

export function AvailabilityCalendar() {
  const [availabilityBlocks, setAvailabilityBlocks] = useState<TimeBlock[]>(
    mockAvailability.map(a => ({ ...a }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ day: number; hour: number } | null>(null);
  const [currentDrag, setCurrentDrag] = useState<{ day: number; hour: number } | null>(null);
  const [resizing, setResizing] = useState<{ id: string; edge: 'top' | 'bottom' } | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Get current time indicator position
  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    if (currentHour < GRID_START || currentHour > GRID_START + HOURS.length) return null;
    return (currentHour - GRID_START) * HOUR_HEIGHT;
  };

  const [currentTimePosition, setCurrentTimePosition] = useState(getCurrentTimePosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimePosition(getCurrentTimePosition());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (day: number, hour: number) => {
    // Check if clicking on existing block
    const existingBlock = availabilityBlocks.find(
      b => b.day === day && hour >= b.startHour && hour < b.endHour
    );
    if (existingBlock) return;

    setIsDragging(true);
    setDragStart({ day, hour });
    setCurrentDrag({ day, hour });
  };

  const handleMouseMove = (day: number, hour: number) => {
    if (isDragging && dragStart) {
      setCurrentDrag({ day, hour });
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragStart && currentDrag) {
      // Only create block if on same day
      if (dragStart.day === currentDrag.day) {
        const startHour = Math.min(dragStart.hour, currentDrag.hour);
        const endHour = Math.max(dragStart.hour, currentDrag.hour) + 1;

        const newBlock: TimeBlock = {
          id: `availability-${Date.now()}`,
          day: dragStart.day,
          startHour,
          endHour,
          mentorId: mockCurrentMentor.id
        };

        setAvailabilityBlocks(prev => [...prev, newBlock]);
      }
    }

    setIsDragging(false);
    setDragStart(null);
    setCurrentDrag(null);
  };

  const handleDeleteBlock = (id: string) => {
    setAvailabilityBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleSaveAvailability = () => {
    toast.success('Availability saved successfully!');
  };

  const getDragPreview = () => {
    if (!isDragging || !dragStart || !currentDrag) return null;
    if (dragStart.day !== currentDrag.day) return null;

    const startHour = Math.min(dragStart.hour, currentDrag.hour);
    const endHour = Math.max(dragStart.hour, currentDrag.hour) + 1;

    return {
      day: dragStart.day,
      startHour,
      endHour
    };
  };

  const dragPreview = getDragPreview();

  // Get bookings for the calendar
  const mentorBookings = mockBookings.filter(b => b.mentorId === mockCurrentMentor.id && b.status === 'confirmed');

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How to Set Your Availability</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Click and drag</strong> on the calendar to create availability blocks</li>
          <li>• <strong>Hover over blocks</strong> to see delete option</li>
          <li>• Blue blocks indicate your available hours</li>
          <li>• Green blocks show confirmed bookings</li>
          <li>• Don't forget to click <strong>Save Availability</strong> when done!</li>
        </ul>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mini Calendar Sidebar */}
        <div className="space-y-6">
          {/* Monthly Overview */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">February 2026</h3>
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-gray-500 font-medium">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 29 }, (_, i) => {
                const day = i + 1;
                const isToday = day === 24;
                return (
                  <div
                    key={i}
                    className={`p-1 rounded ${
                      isToday ? 'bg-indigo-600 text-white font-medium' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Active Bookings */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Active Bookings</h3>
            <div className="space-y-3">
              {mentorBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="text-sm">
                  <p className="font-medium text-gray-900">{booking.studentName}</p>
                  <p className="text-gray-600 text-xs">
                    {new Date(booking.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {booking.startTime}
                  </p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs mt-1">
                    Confirmed
                  </Badge>
                </div>
              ))}
              {mentorBookings.length === 0 && (
                <p className="text-sm text-gray-500">No bookings yet</p>
              )}
            </div>
          </Card>

          {/* Save Button */}
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSaveAvailability}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Availability
          </Button>
        </div>

        {/* Calendar Grid */}
        <Card className="lg:col-span-3 p-6 overflow-auto">
          <div
            ref={calendarRef}
            className="relative select-none"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-gray-200 mb-4 pb-4 sticky top-0 bg-white z-10">
              <div className="text-sm font-medium text-gray-600">Time</div>
              {DAYS.map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-sm font-medium text-gray-900">{day}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(2026, 1, 23 + index).getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-8 relative">
              {/* Time Labels */}
              <div className="space-y-0">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="text-xs text-gray-500 text-right pr-2"
                    style={{ height: `${HOUR_HEIGHT}px`, lineHeight: `${HOUR_HEIGHT}px` }}
                  >
                    {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              {DAYS.map((day, dayIndex) => (
                <div
                  key={day}
                  className="relative border-l border-gray-200"
                  style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
                >
                  {/* Hour Grid Lines */}
                  {HOURS.map((hour, hourIndex) => (
                    <div
                      key={hour}
                      className="absolute w-full border-b border-gray-100 hover:bg-indigo-50/30 cursor-crosshair transition-colors"
                      style={{
                        height: `${HOUR_HEIGHT}px`,
                        top: `${hourIndex * HOUR_HEIGHT}px`
                      }}
                      onMouseDown={() => handleMouseDown(dayIndex, hour)}
                      onMouseMove={() => handleMouseMove(dayIndex, hour)}
                    />
                  ))}

                  {/* Availability Blocks */}
                  {availabilityBlocks
                    .filter(block => block.day === dayIndex)
                    .map((block) => (
                      <div
                        key={block.id}
                        className={`absolute w-full px-1 group ${
                          hoveredBlock === block.id ? 'z-10' : ''
                        }`}
                        style={{
                          top: `${(block.startHour - GRID_START) * HOUR_HEIGHT}px`,
                          height: `${(block.endHour - block.startHour) * HOUR_HEIGHT}px`
                        }}
                        onMouseEnter={() => setHoveredBlock(block.id)}
                        onMouseLeave={() => setHoveredBlock(null)}
                      >
                        <div className="h-full bg-indigo-500/20 border-2 border-indigo-500 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-indigo-900">
                              Available
                            </span>
                          </div>

                          {/* Delete Button */}
                          {hoveredBlock === block.id && (
                            <button
                              onClick={() => handleDeleteBlock(block.id)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* Drag Preview */}
                  {dragPreview && dragPreview.day === dayIndex && (
                    <div
                      className="absolute w-full px-1 pointer-events-none"
                      style={{
                        top: `${(dragPreview.startHour - GRID_START) * HOUR_HEIGHT}px`,
                        height: `${(dragPreview.endHour - dragPreview.startHour) * HOUR_HEIGHT}px`
                      }}
                    >
                      <div className="h-full bg-indigo-400/30 border-2 border-indigo-400 border-dashed rounded-lg" />
                    </div>
                  )}

                  {/* Confirmed Bookings */}
                  {mentorBookings
                    .filter(booking => {
                      const bookingDate = new Date(booking.date);
                      return bookingDate.getDay() === dayIndex;
                    })
                    .map((booking) => {
                      const startHour = parseInt(booking.startTime.split(':')[0]);
                      const endHour = parseInt(booking.endTime.split(':')[0]);
                      return (
                        <div
                          key={booking.id}
                          className="absolute w-full px-1 pointer-events-none"
                          style={{
                            top: `${(startHour - GRID_START) * HOUR_HEIGHT}px`,
                            height: `${(endHour - startHour) * HOUR_HEIGHT}px`
                          }}
                        >
                          <div className="h-full bg-green-500/20 border-2 border-green-500 rounded-lg p-2">
                            <p className="text-xs font-medium text-green-900 truncate">
                              {booking.studentName}
                            </p>
                            <p className="text-xs text-green-700">
                              {booking.startTime}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}

              {/* Current Time Indicator */}
              {currentTimePosition !== null && (
                <div
                  className="absolute left-0 right-0 pointer-events-none z-20"
                  style={{ top: `${currentTimePosition}px` }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 ml-12"></div>
                    <div className="flex-1 h-0.5 bg-red-500"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-500/20 border-2 border-indigo-500 rounded"></div>
            <span className="text-sm text-gray-700">Your Availability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/20 border-2 border-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Confirmed Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500"></div>
            <span className="text-sm text-gray-700">Current Time</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
