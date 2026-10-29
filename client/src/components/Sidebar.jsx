import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  UserPlus, 
  BookOpen
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentStudent, 
  isMobileOpen,
  closeMobile
}) {
  // Flow: Register → Profiles → Find The Match
  const navItems = [
    { id: 'register', label: '1. User Registration', icon: UserPlus, color: 'var(--purple-primary)' },
    { id: 'profiles', label: '2. Student Profiles', icon: UserCheck, color: 'var(--emerald-primary)' },
    { id: 'matching', label: '3. Find The Match', icon: Sparkles, color: 'var(--indigo-primary)' }
  ];

  const studentInitial = currentStudent && currentStudent.name ? currentStudent.name[0] : 'N';
  const studentName = currentStudent ? currentStudent.name : 'Navneet Singh';
  const studentUsername = currentStudent ? currentStudent.username : '_navneet_singh';
  const studentBranch = currentStudent ? `${currentStudent.branch} Sec ${currentStudent.section}` : 'CSE Sec B';

  return (
    <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="brand-name">PeerLink</div>
            <div className="brand-tagline">Peer Skill Exchange</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                if (closeMobile) closeMobile();
              }}
            >
              <Icon size={20} color={isActive ? item.color : 'var(--text-dim)'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Active User Footer */}
      <div className="sidebar-footer">
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Active Student
        </div>
        <div className="user-quick-card" style={{
          borderColor: 'var(--border-medium)',
          backgroundColor: 'var(--bg-subtle)'
        }}>
          <div className="user-avatar-circle">
            {studentInitial}
          </div>
          <div className="user-quick-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="user-quick-name">{studentName}</span>
            </div>
            <div className="user-quick-role">
              @{studentUsername} &bull; {studentBranch}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
