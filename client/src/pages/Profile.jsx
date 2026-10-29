import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Sparkles,
  Award
} from 'lucide-react';

export default function Profile({ currentStudent, onNavigate }) {
  if (!currentStudent) {
    return (
      <div className="card empty-state">
        <User className="empty-state-icon" />
        <h3 className="empty-state-title">No Student Selected</h3>
        <p className="empty-state-desc">Select a student from the top bar to inspect their profile.</p>
      </div>
    );
  }

  const isNavneet = currentStudent.username === '_navneet_singh';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }} className="animate-fade-in">
      {/* Profile Header Card */}
      <div className="card" style={{ 
        padding: '32px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: isNavneet ? '2px solid #6EE7B7' : '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            <div style={{
              width: '82px',
              height: '82px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              fontWeight: 900,
              flexShrink: 0
            }}>
              {currentStudent.name ? currentStudent.name[0] : 'U'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{currentStudent.name}</h2>
                <span style={{ fontSize: '1.05rem', color: 'var(--text-dim)', fontWeight: 600 }}>@{currentStudent.username}</span>
                {isNavneet && (
                  <span className="badge badge-admin" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>★ Administrator</span>
                )}
                <span className="badge badge-mode" style={{ fontSize: '0.85rem' }}>{currentStudent.studyMode} Mode</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '6px', maxWidth: '650px', fontWeight: 500 }}>
                {currentStudent.bio || 'College student participating in peer study exchange.'}
              </p>
            </div>
          </div>

          <div>
            <button 
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '1.02rem', fontWeight: 700 }}
              onClick={() => onNavigate('matching')}
            >
              <Sparkles size={18} />
              <span>Find Study Matches</span>
            </button>
          </div>
        </div>

        {/* Academic & Contact Details (From C++ User::displayUser) */}
        <div style={{
          marginTop: '28px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          fontSize: '0.96rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GraduationCap size={20} color="var(--indigo-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>College & Branch</div>
              <strong style={{ fontSize: '1.02rem' }}>{currentStudent.college || 'Arya College of Engineering'} &bull; {currentStudent.branch}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Award size={20} color="var(--indigo-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Section & Semester</div>
              <strong style={{ fontSize: '1.02rem' }}>Section {currentStudent.section || 'N/A'}, Semester {currentStudent.sem}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Phone size={20} color="#10B981" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Phone Number</div>
              <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}>{currentStudent.phone || 'Not provided'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail size={20} color="#3B82F6" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Email Address</div>
              <strong style={{ fontSize: '1rem' }}>{currentStudent.email || 'Not provided'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Comparison Cards (From C++ User::displayUser) */}
      <div className="grid-2">
        {/* Strong Subjects */}
        <div className="card" style={{ borderLeft: '6px solid #10B981' }}>
          <div className="card-title" style={{ color: '#065F46', fontSize: '1.35rem' }}>
            <BookOpen size={22} color="#10B981" />
            <span>Skills I Teach (Strong Subjects)</span>
          </div>
          <div className="card-subtitle" style={{ fontSize: '0.95rem' }}>
            Subjects where you guide and mentor other students
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentStudent.strongSubjects && currentStudent.strongSubjects.length > 0 ? (
              currentStudent.strongSubjects.map((sub) => (
                <div 
                  key={sub.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#ECFDF5',
                    border: '1.5px solid #A7F3D0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: '#10B981', 
                      color: '#fff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.85rem',
                      fontWeight: 800 
                    }}>
                      {sub.id}
                    </span>
                    <strong style={{ color: '#065F46', fontSize: '1.1rem' }}>{sub.name}</strong>
                  </div>
                  <span className="badge badge-teach" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>Can Teach</span>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>No strong subjects listed.</div>
            )}
          </div>
        </div>

        {/* Weak Subjects */}
        <div className="card" style={{ borderLeft: '6px solid var(--indigo-primary)' }}>
          <div className="card-title" style={{ color: 'var(--indigo-dark)', fontSize: '1.35rem' }}>
            <TrendingUp size={22} color="var(--indigo-primary)" />
            <span>Skills I Want to Learn (Weak Subjects)</span>
          </div>
          <div className="card-subtitle" style={{ fontSize: '0.95rem' }}>
            Subjects where you want peer tutoring
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentStudent.weakSubjects && currentStudent.weakSubjects.length > 0 ? (
              currentStudent.weakSubjects.map((sub) => (
                <div 
                  key={sub.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#EEF2FF',
                    border: '1.5px solid #C7D2FE'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: 'var(--indigo-primary)', 
                      color: '#fff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.85rem',
                      fontWeight: 800 
                    }}>
                      {sub.id}
                    </span>
                    <strong style={{ color: 'var(--indigo-dark)', fontSize: '1.1rem' }}>{sub.name}</strong>
                  </div>
                  <span className="badge badge-learn" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>Wants to Learn</span>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>No learning goals listed.</div>
            )}
          </div>
        </div>
      </div>

      {/* Available Schedule Table (From C++ User::displayUser) */}
      <div className="card">
        <div className="card-title" style={{ fontSize: '1.35rem' }}>
          <Calendar size={22} color="var(--indigo-primary)" />
          <span>Available Schedule (User::displayUser)</span>
        </div>
        <div className="card-subtitle" style={{ fontSize: '0.95rem' }}>
          Weekly availability windows used in C++ time overlap checking
        </div>

        {currentStudent.schedule && currentStudent.schedule.length > 0 ? (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Day of Week</th>
                <th>Available From (24-hr)</th>
                <th>Available Till (24-hr)</th>
                <th>Total Window</th>
                <th>Study Mode</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.schedule.map((item, idx) => {
                const hours = item.till - item.from;
                return (
                  <tr key={idx}>
                    <td><strong style={{ fontSize: '1.05rem' }}>{item.day}</strong></td>
                    <td><span style={{ fontWeight: 600 }}>{item.from}:00</span> ({item.from > 12 ? `${item.from - 12}:00 PM` : `${item.from}:00 AM`})</td>
                    <td><span style={{ fontWeight: 600 }}>{item.till}:00</span> ({item.till > 12 ? `${item.till - 12}:00 PM` : `${item.till}:00 AM`})</td>
                    <td>
                      <span className="badge" style={{ background: '#F1F5F9', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                        {hours} hours
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-mode">{currentStudent.studyMode}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ color: 'var(--text-muted)' }}>No schedule windows configured.</div>
        )}
      </div>
    </div>
  );
}
