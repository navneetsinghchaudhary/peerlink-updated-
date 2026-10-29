import React from 'react';
import { Menu, Cpu, Sun, Moon } from 'lucide-react';

export default function Topbar({ 
  activeTab, 
  students, 
  currentStudent, 
  onSelectStudent, 
  engineStatus,
  toggleMobile,
  theme,
  toggleTheme
}) {
  const titles = {
    matching: { title: 'Find The Match', desc: 'Find compatible study partners based on mutual skills and schedule' },
    profiles: { title: 'Student Profiles', desc: 'Explore student directory and individual profiles' },
    register: { title: 'User Registration', desc: 'Register a new student into the study network' }
  };

  const currentMeta = titles[activeTab] || { title: 'PeerLink', desc: 'Peer-to-Peer Study Partner Platform' };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          onClick={toggleMobile}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
          className="mobile-menu-btn"
          aria-label="Toggle Navigation"
        >
          <Menu size={24} color="var(--text-main)" />
        </button>
        <div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
            {currentMeta.title}
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {currentMeta.desc}
          </p>
        </div>
      </div>

      <div className="topbar-right">
        {/* Dark / Light Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{
            padding: '8px 14px',
            fontSize: '0.9rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={18} color="#FBBF24" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} color="#6366F1" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Live Engine Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '6px 12px',
          background: 'var(--bg-subtle)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--indigo-primary)'
        }}>
          <span style={{
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            display: 'inline-block',
            animation: 'pulseDot 2s infinite'
          }}></span>
          <Cpu size={15} />
          <span>Live Engine</span>
        </div>

        {/* Identity Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select 
            className="form-select"
            style={{ width: 'auto', padding: '8px 14px', fontSize: '0.92rem', fontWeight: 600, borderColor: 'var(--border-medium)' }}
            value={currentStudent ? currentStudent.username : ''}
            onChange={(e) => {
              const selected = students.find(s => s.username === e.target.value);
              if (selected) onSelectStudent(selected);
            }}
          >
            {students.map(s => {
              const isNavneet = s.username === '_navneet_singh';
              return (
                <option key={s.username} value={s.username}>
                  {isNavneet ? '★ ' : ''}{s.name} (@{s.username})
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </header>
  );
}
