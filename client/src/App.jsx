import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Matching from './pages/Matching';
import Profiles from './pages/Profiles';
import Register from './pages/Register';
import { fetchStudents, fetchHealth } from './services/api';
import { AlertCircle, Clock } from 'lucide-react';

export default function App() {
  // Start on Registration so user registers before finding matches
  const [activeTab, setActiveTab] = useState('register');
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [engineStatus, setEngineStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Theme Management (Light / Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('peerlink_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('peerlink_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [healthRes, studentsRes] = await Promise.all([
        fetchHealth(),
        fetchStudents()
      ]);
      setEngineStatus(healthRes);
      setStudents(studentsRes);
      if (studentsRes && studentsRes.length > 0) {
        // By default, active user is Navneet Singh
        const navneet = studentsRes.find(s => 
          s.username === '_navneet_singh' || 
          s.name.toLowerCase().includes('navneet')
        );
        setCurrentStudent(prev => prev || navneet || studentsRes[0]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to connect to local C++ API bridge.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStudentRegistered = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
    setCurrentStudent(newStudent);
    setActiveTab('matching'); // After registering, take user to Find The Match
  };

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentStudent={currentStudent}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Topbar
          activeTab={activeTab}
          students={students}
          currentStudent={currentStudent}
          onSelectStudent={setCurrentStudent}
          engineStatus={engineStatus}
          toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="content-area">
          {error && (
            <div className="alert-box alert-warning">
              <AlertCircle size={22} style={{ flexShrink: 0 }} />
              <div>
                <strong>Connection Error:</strong> {error}
                <div style={{ fontSize: '0.88rem', marginTop: '4px' }}>
                  Ensure backend server is running on port 5000.
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="card empty-state" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={38} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px', color: 'var(--indigo-primary)' }} />
              <div style={{ fontWeight: 800, fontSize: '1.35rem', marginBottom: '6px' }}>
                Loading Matching Engine...
              </div>
              <div style={{ fontSize: '0.98rem', color: 'var(--text-muted)' }}>
                Connecting to study partner network and initializing student dataset
              </div>
            </div>
          ) : (
            <>
              {/* Feature 1: FIND THE MATCH */}
              {activeTab === 'matching' && (
                <Matching
                  currentStudent={currentStudent}
                  onNavigate={setActiveTab}
                />
              )}

              {/* Feature 2: Student Profiles (Merged Your Profile & Existing Users) */}
              {activeTab === 'profiles' && (
                <Profiles
                  students={students}
                  currentStudent={currentStudent}
                  onSelectStudent={setCurrentStudent}
                  onNavigate={setActiveTab}
                />
              )}

              {/* Feature 3: User Registration */}
              {activeTab === 'register' && (
                <Register
                  onStudentRegistered={handleStudentRegistered}
                  onNavigate={setActiveTab}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
