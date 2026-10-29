import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  Search, 
  Users, 
  Filter, 
  Hash, 
  Clock,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export default function Profiles({ 
  students, 
  currentStudent, 
  onSelectStudent, 
  onNavigate 
}) {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const profileTopRef = useRef(null);

  // Active student to display in the main spotlight
  const activeStudent = currentStudent || (students && students.length > 0 ? students[0] : null);

  const filteredStudents = (students || []).filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.username.toLowerCase().includes(search.toLowerCase()) ||
      s.branch.toLowerCase().includes(search.toLowerCase());
    
    const matchesMode = selectedMode === 'all' || s.studyMode.toLowerCase() === selectedMode.toLowerCase();
    
    let matchesSubject = true;
    if (selectedSubject !== 'all') {
      const subId = parseInt(selectedSubject);
      const teaches = s.strongSubjects && s.strongSubjects.some(sub => sub.id === subId);
      const learns = s.weakSubjects && s.weakSubjects.some(sub => sub.id === subId);
      matchesSubject = teaches || learns;
    }

    return matchesSearch && matchesMode && matchesSubject;
  });

  const handleSelectAndScroll = (student) => {
    onSelectStudent(student);
    if (profileTopRef.current) {
      profileTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!activeStudent) {
    return (
      <div className="card empty-state">
        <User className="empty-state-icon" />
        <h3 className="empty-state-title">No Students in Pool</h3>
        <p className="empty-state-desc">Register a new student using the Registration tab to begin.</p>
      </div>
    );
  }

  const isCurrentActive = currentStudent && currentStudent.username === activeStudent.username;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in" ref={profileTopRef}>
      {/* Search and Filter Card */}
      <div className="card" style={{
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={24} color="var(--indigo-primary)" />
              <span>Explore Student Profiles</span>
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Search across all {students.length} students in the peer study network.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-indigo" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
              {filteredStudents.length} Students Listed
            </span>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '14px' 
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              className="form-input"
              placeholder="Search by username or name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '44px', fontSize: '0.98rem' }}
            />
          </div>

          {/* Subject Filter */}
          <select 
            className="form-select"
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            style={{ fontSize: '0.98rem' }}
          >
            <option value="all">All Subjects (1 to 6)</option>
            <option value="1">1. DSA</option>
            <option value="2">2. OOPs</option>
            <option value="3">3. Video Editing</option>
            <option value="4">4. UI Design</option>
            <option value="5">5. Database</option>
            <option value="6">6. Web Development</option>
          </select>

          {/* Study Mode Filter */}
          <select 
            className="form-select"
            value={selectedMode}
            onChange={e => setSelectedMode(e.target.value)}
            style={{ fontSize: '0.98rem' }}
          >
            <option value="all">All Study Modes</option>
            <option value="Online">Online Study</option>
            <option value="Offline">Offline Study</option>
          </select>
        </div>
      </div>

      {/* Main Active Profile Showcase Card */}
      <div className="card" style={{ 
        padding: '32px',
        background: 'var(--bg-card)',
        border: '2px solid var(--indigo-border)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative'
      }}>
        {/* Active Badge */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--emerald-soft)',
          color: 'var(--emerald-dark)',
          fontSize: '0.82rem',
          fontWeight: 800,
          border: '1px solid var(--emerald-border)'
        }}>
          <CheckCircle2 size={15} />
          <span>Active Profile</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '22px', marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--indigo-primary) 0%, var(--purple-primary) 100%)',
              color: '#FFFFFF',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.4rem',
              fontWeight: 900,
              flexShrink: 0
            }}>
              {activeStudent.name ? activeStudent.name[0] : 'U'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{activeStudent.name}</h2>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-dim)', fontWeight: 600 }}>@{activeStudent.username}</span>
                <span className="badge badge-mode" style={{ fontSize: '0.88rem' }}>{activeStudent.studyMode} Mode</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '8px', maxWidth: '680px', fontWeight: 500, lineHeight: 1.5 }}>
                {activeStudent.bio || 'College student participating in peer study exchange.'}
              </p>
            </div>
          </div>

          <div>
            <button 
              className="btn btn-primary"
              style={{ padding: '14px 26px', fontSize: '1.05rem', fontWeight: 700 }}
              onClick={() => {
                onSelectStudent(activeStudent);
                onNavigate('matching');
              }}
            >
              <Sparkles size={19} />
              <span>Find Study Matches for {activeStudent.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* Academic & Contact Details (From C++ User::displayUser / SampleData::showData) */}
        <div style={{
          marginTop: '28px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '20px',
          fontSize: '0.96rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GraduationCap size={22} color="var(--indigo-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>College & Branch</div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-main)' }}>{activeStudent.college || 'Arya College of Engineering'} &bull; {activeStudent.branch}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={22} color="var(--purple-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Section & Semester</div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-main)' }}>Section {activeStudent.section} &bull; Semester {activeStudent.sem}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail size={22} color="var(--blue-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Email Address</div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-main)' }}>{activeStudent.email}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Phone size={22} color="var(--emerald-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Phone Number</div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-main)' }}>+91 {activeStudent.phone}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Hash size={22} color="var(--amber-primary)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Student ID</div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-main)' }}>#{activeStudent.userID}</strong>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid-2" style={{ marginTop: '28px' }}>
          {/* Skills They Teach */}
          <div style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1.5px solid var(--emerald-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <TrendingUp size={22} color="var(--emerald-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Skills They Teach ({activeStudent.strongCount || (activeStudent.strongSubjects ? activeStudent.strongSubjects.length : 0)})
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Subjects where {activeStudent.name.split(' ')[0]} has high proficiency and can mentor peers:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {activeStudent.strongSubjects && activeStudent.strongSubjects.length > 0 ? (
                activeStudent.strongSubjects.map((sub) => (
                  <span key={sub.id} className="badge badge-teach" style={{ fontSize: '0.95rem', padding: '8px 16px' }}>
                    #{sub.id} &bull; {sub.name}
                  </span>
                ))
              ) : (
                <span style={{ color: 'var(--text-dim)', fontSize: '0.94rem' }}>No teaching skills listed</span>
              )}
            </div>
          </div>

          {/* Skills They Want to Learn */}
          <div style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1.5px solid var(--purple-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <BookOpen size={22} color="var(--purple-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Skills They Want To Learn ({activeStudent.weakCount || (activeStudent.weakSubjects ? activeStudent.weakSubjects.length : 0)})
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Subjects where {activeStudent.name.split(' ')[0]} is seeking peer guidance and study partners:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {activeStudent.weakSubjects && activeStudent.weakSubjects.length > 0 ? (
                activeStudent.weakSubjects.map((sub) => (
                  <span key={sub.id} className="badge badge-learn" style={{ fontSize: '0.95rem', padding: '8px 16px' }}>
                    #{sub.id} &bull; {sub.name}
                  </span>
                ))
              ) : (
                <span style={{ color: 'var(--text-dim)', fontSize: '0.94rem' }}>No learning skills listed</span>
              )}
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div style={{
          marginTop: '26px',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-subtle)',
          border: '1.5px solid var(--indigo-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Calendar size={22} color="var(--indigo-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Weekly Available Study Schedule ({activeStudent.availableDayCount || (activeStudent.schedule ? activeStudent.schedule.length : 0)} Days)
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '14px'
          }}>
            {activeStudent.schedule && activeStudent.schedule.length > 0 ? (
              activeStudent.schedule.map((sc, i) => (
                <div key={i} style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--indigo-primary)', marginBottom: '4px' }}>
                    {sc.day}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.94rem', color: 'var(--text-muted)' }}>
                    <Clock size={16} />
                    <span>{sc.from}:00 - {sc.till}:00 ({sc.till - sc.from} hrs)</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-dim)', fontSize: '0.94rem' }}>No schedule slots configured</div>
            )}
          </div>
        </div>
      </div>

      {/* Directory of All Students */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              All Students in Study Pool ({filteredStudents.length})
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Click any card to inspect their complete profile or instantly find matching peers.
            </p>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="card empty-state">
            <Search className="empty-state-icon" />
            <h3 className="empty-state-title">No matching students found</h3>
            <p className="empty-state-desc">Try clearing the search query or adjusting the subject/mode filter.</p>
          </div>
        ) : (
          <div className="grid-3">
            {filteredStudents.map((student) => {
              const isSelected = activeStudent && activeStudent.username === student.username;

              return (
                <div 
                  key={student.username} 
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                    border: isSelected ? '2px solid var(--indigo-primary)' : '1px solid var(--border-medium)',
                    backgroundColor: isSelected ? 'var(--bg-subtle)' : 'var(--bg-card)',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: 'var(--radius-full)',
                          background: isSelected ? 'linear-gradient(135deg, var(--indigo-primary), var(--purple-primary))' : 'var(--bg-subtle)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '1.25rem',
                          border: '1px solid var(--border-medium)',
                          flexShrink: 0
                        }}>
                          {student.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                            {student.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                            @{student.username} &bull; {student.branch} Sec {student.section}
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-mode" style={{ fontSize: '0.78rem' }}>
                        {student.studyMode}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
                      {student.bio}
                    </p>

                    {/* Quick Skill Badges */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                        Teaches:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {student.strongSubjects.map(s => (
                          <span key={s.id} className="badge badge-teach" style={{ fontSize: '0.8rem', padding: '3px 8px' }}>
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                        Wants to Learn:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {student.weakSubjects.map(s => (
                          <span key={s.id} className="badge badge-learn" style={{ fontSize: '0.8rem', padding: '3px 8px' }}>
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                    <button 
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ flex: 1, fontWeight: 700 }}
                      onClick={() => handleSelectAndScroll(student)}
                    >
                      <span>{isSelected ? 'Viewing Profile' : 'View Profile'}</span>
                    </button>
                    <button 
                      className="btn btn-emerald btn-sm"
                      title="Match Immediately"
                      onClick={() => {
                        onSelectStudent(student);
                        onNavigate('matching');
                      }}
                    >
                      <Sparkles size={16} />
                      <span>Match</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
