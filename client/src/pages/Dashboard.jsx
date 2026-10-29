import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  TrendingUp,
  Users
} from 'lucide-react';
import { runMatchmaking } from '../services/api';

export default function Dashboard({ currentStudent, onNavigate, onSelectStudent }) {
  const [quickMatches, setQuickMatches] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  useEffect(() => {
    if (currentStudent) {
      setLoadingMatches(true);
      runMatchmaking({ username: currentStudent.username })
        .then(res => setQuickMatches(res))
        .catch(err => console.error(err))
        .finally(() => setLoadingMatches(false));
    }
  }, [currentStudent]);

  if (!currentStudent) {
    return (
      <div className="card empty-state">
        <Users className="empty-state-icon" />
        <h3 className="empty-state-title">No Student Selected</h3>
        <p className="empty-state-desc">Select a student from the top bar or register a new account.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #FAF8F2 0%, #F2EFE7 100%)', 
        border: '1px solid var(--border-medium)',
        padding: '28px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'var(--sage-soft)', color: 'var(--sage-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '12px' }}>
              <GraduationCap size={14} />
              <span>
                {currentStudent.username === '_navneet_singh' ? 'Platform Admin & Creator • ' : ''}
                {currentStudent.college || 'Arya College of Engineering'} &bull; {currentStudent.branch} (Sem {currentStudent.sem})
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '6px' }}>
              Welcome back, {currentStudent.name}
              {currentStudent.username === '_navneet_singh' && ' (Admin)'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px' }}>
              {currentStudent.bio || 'Ready to exchange skills and connect with college study partners.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('matching')}
            >
              <Sparkles size={16} />
              <span>Find Study Partner</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('profile')}
            >
              <span>View Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Profile Snapshot & Skills */}
      <div className="grid-3">
        {/* Teach Skills */}
        <div className="card">
          <div className="card-title" style={{ color: 'var(--sage-dark)' }}>
            <BookOpen size={18} />
            <span>Skills I Can Teach</span>
          </div>
          <div className="card-subtitle">
            What you offer to study partners
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '60px' }}>
            {currentStudent.strongSubjects && currentStudent.strongSubjects.length > 0 ? (
              currentStudent.strongSubjects.map(sub => (
                <span key={sub.id} className="badge badge-teach" style={{ fontSize: '0.82rem', padding: '5px 10px' }}>
                  {sub.name}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No strong subjects listed</span>
            )}
          </div>
        </div>

        {/* Learn Skills */}
        <div className="card">
          <div className="card-title" style={{ color: 'var(--blue-primary)' }}>
            <TrendingUp size={18} />
            <span>Skills I Want to Learn</span>
          </div>
          <div className="card-subtitle">
            Subjects you need assistance in
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '60px' }}>
            {currentStudent.weakSubjects && currentStudent.weakSubjects.length > 0 ? (
              currentStudent.weakSubjects.map(sub => (
                <span key={sub.id} className="badge badge-learn" style={{ fontSize: '0.82rem', padding: '5px 10px' }}>
                  {sub.name}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No learning goals listed</span>
            )}
          </div>
        </div>

        {/* Schedule & Mode */}
        <div className="card">
          <div className="card-title">
            <Calendar size={18} />
            <span>Availability & Mode</span>
          </div>
          <div className="card-subtitle">
            Study preference and active hours
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Study Mode:</span>
              <span className="badge badge-mode" style={{ fontWeight: 600 }}>{currentStudent.studyMode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Days:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentStudent.availableDayCount} days/week</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contact:</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{currentStudent.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: C++ Match Recommendations & Algorithm Concept */}
      <div className="grid-dashboard">
        {/* Left: Real C++ Match Preview */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Top Compatible Study Partners</h3>
              <p className="card-subtitle" style={{ marginBottom: 0 }}>
                Computed in real-time by the C++ matchmaking engine
              </p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('matching')}
            >
              <span>Explore All Matches</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {loadingMatches ? (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Clock size={24} style={{ animation: 'spin 1s linear infinite', marginBottom: '8px' }} />
              <div>Running C++ matchmaking engine...</div>
            </div>
          ) : quickMatches && quickMatches.topMatches && quickMatches.topMatches.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickMatches.topMatches.slice(0, 3).map((item) => (
                <div 
                  key={item.student.userID}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#FCFCF9',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--sage-soft)',
                      color: 'var(--sage-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      #{item.rank}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.student.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        @{item.student.username} &bull; {item.student.studyMode} &bull; {item.student.branch}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>C++ Score</div>
                      <span className="badge badge-score">+{item.matchScore} pts</span>
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('matching')}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '24px' }}>
              <Info className="empty-state-icon" style={{ width: '36px', height: '36px' }} />
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>No Mutual Matches Found</div>
              <div style={{ fontSize: '0.84rem' }}>
                The C++ algorithm requires mutual skill exchange (they teach what you need, and you teach what they need).
              </div>
            </div>
          )}
        </div>

        {/* Right: How P2P Matching Works (Authentic C++ rules) */}
        <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
          <div className="card-title">
            <ShieldCheck size={18} color="var(--sage-primary)" />
            <span>P2P Matching Logic</span>
          </div>
          <div className="card-subtitle">
            Directly implemented in C++
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--sage-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Reciprocal Skill Exchange (+4 pts max)</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  A match is only valid if both students offer skills the other wants to learn (<code style={{ fontFamily: 'var(--font-mono)' }}>teachMatch && learnMatch</code>).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--sage-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Schedule Overlap (+1 pt per day)</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  Compares common weekdays and overlapping 24-hr study windows (<code style={{ fontFamily: 'var(--font-mono)' }}>cand.from &lt; user.till && user.from &lt; cand.till</code>).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--sage-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Study Mode Match (+1 pt)</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  Awards bonus compatibility when both students prefer Online or both prefer Offline study.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ width: '100%' }}
              onClick={() => onNavigate('algorithm')}
            >
              <span>View Full C++ Engine Specs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
