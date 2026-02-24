import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Users, GraduationCap } from 'lucide-react';
import { AuthScreen } from './components/AuthScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { MentorDashboard } from './components/MentorDashboard';

type UserRole = 'student' | 'mentor' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (role: 'student' | 'mentor') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('dashboard');
  };

  const toggleRole = () => {
    setUserRole(userRole === 'student' ? 'mentor' : 'student');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {!userRole ? (
          <AuthScreen onLogin={handleLogin} />
        ) : (
          <>
            {userRole === 'student' ? (
              <StudentDashboard onViewChange={setCurrentView} />
            ) : (
              <MentorDashboard />
            )}
            
            {/* Demo Role Switcher - Fixed bottom right */}
            <div className="fixed bottom-6 right-6 z-50">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-3 text-center font-medium">Demo Mode</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={userRole === 'student' ? 'default' : 'outline'}
                    onClick={() => setUserRole('student')}
                    className={userRole === 'student' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Student
                  </Button>
                  <Button
                    size="sm"
                    variant={userRole === 'mentor' ? 'default' : 'outline'}
                    onClick={() => setUserRole('mentor')}
                    className={userRole === 'mentor' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Mentor
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full mt-2 text-xs"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}