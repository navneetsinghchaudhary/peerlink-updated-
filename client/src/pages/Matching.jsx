import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Trophy, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  Clock, 
  Users, 
  UserPlus,
  Phone, 
  Mail, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { runMatchmaking } from '../services/api';

export default function Matching({ currentStudent, onNavigate }) {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeMatch = async () => {
    if (!currentStudent) return;
    setLoading(true);
    setError(null);
    try {
      const data = await runMatchmaking({ username: currentStudent.username });
      setMatchData(data);
    } catch (err) {
      setError(err.message || 'Failed to execute matchmaking engine.');
    } finally {
      setLoading(false);
    }
  };

  // DO NOT auto-fetch — user must click "Run Matchmaking" explicitly

  if (!currentStudent) {
    return (
      <div className="card empty-state">
        <UserPlus className="empty-state-icon" size={48} />
        <h3 className="empty-state-title">Register First!</h3>
        <p className="empty-state-desc">
          You need to register as a student before finding study partner matches.
          Head over to <strong>User Registration</strong> to get started.
        </p>
        <button
          className="btn btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => onNavigate('register')}
        >
          <UserPlus size={18} />
          <span>Go to Registration</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }} className="animate-fade-in">
      {/* Hero Action Card */}
      <div className="card matching-hero-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="user-identity-pill" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.88rem', 
              fontWeight: 800, 
              marginBottom: '12px'
            }}>
              <GraduationCap size={18} color="var(--indigo-primary)" />
              <span>
                {currentStudent.name} (@{currentStudent.username})
              </span>
            </div>
            
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              Find Your Study Partner
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '650px' }}>
              Connect with compatible peers based on mutual skill exchange, schedule overlap, and preferred study mode.
            </p>
          </div>

          <div>
            <button 
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.1rem', fontWeight: 700 }}
              onClick={executeMatch}
              disabled={loading}
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Finding Matches...' : 'Run Matchmaking'}</span>
            </button>
          </div>
        </div>

        {/* Current Student's Active Matching Parameters */}
        <div style={{ 
          marginTop: '24px', 
          paddingTop: '20px', 
          borderTop: '1px solid var(--border-medium)', 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          fontSize: '0.98rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-dim)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
              Skills You Teach (Strong):
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
              {currentStudent.strongSubjects && currentStudent.strongSubjects.map(s => (
                <span key={s.id} className="badge badge-teach" style={{ fontSize: '0.92rem', padding: '6px 14px' }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--text-dim)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
              Skills You Learn (Weak):
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
              {currentStudent.weakSubjects && currentStudent.weakSubjects.map(s => (
                <span key={s.id} className="badge badge-learn" style={{ fontSize: '0.92rem', padding: '6px 14px' }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--text-dim)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
              Mode & Schedule:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <span className="badge badge-mode" style={{ fontSize: '0.9rem' }}>{currentStudent.studyMode}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{currentStudent.availableDayCount} days available</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert-box alert-warning">
          <AlertCircle size={22} style={{ flexShrink: 0 }} />
          <div><strong>Error:</strong> {error}</div>
        </div>
      )}

      {/* Idle state — registered but hasn't clicked Run Matchmaking yet */}
      {!matchData && !loading && !error && (
        <div className="card empty-state" style={{ minHeight: '220px' }}>
          <Sparkles className="empty-state-icon" size={42} style={{ color: 'var(--indigo-primary)' }} />
          <h3 className="empty-state-title">Ready to Find Matches!</h3>
          <p className="empty-state-desc">
            Click <strong>Run Matchmaking</strong> above to discover your best study partners based on skills, schedule & study mode.
          </p>
        </div>
      )}

      {/* Results from Matching Engine */}
      {matchData && (
        <>
          {/* Matches Found Banner */}
          {matchData.matchesFound > 0 ? (
            <div className="alert-box alert-success" style={{ padding: '18px 24px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CheckCircle2 size={26} color="var(--emerald-primary)" />
                <div>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--emerald-dark)' }}>
                    Congratulations! {matchData.matchesFound} Matches Found
                  </strong>
                  <div style={{ fontSize: '0.92rem', color: 'var(--emerald-dark)', opacity: 0.9 }}>
                    Calculated based on mutual skill compatibility and schedule overlap.
                  </div>
                </div>
              </div>
              <div className="badge badge-score" style={{ fontSize: '1.1rem', padding: '8px 18px' }}>
                {matchData.matchesFound} Mutual Matches
              </div>
            </div>
          ) : (
            <div className="card empty-state">
              <div className="empty-state-icon">
                <Users size={32} />
              </div>
              <h3 className="empty-state-title">No matches found</h3>
              <p className="empty-state-desc">
                Matchmaking requires mutual skill exchange. A compatible partner teaches what you want to learn, and learns what you can teach.
              </p>
            </div>
          )}

          {/* BEST MATCH SPOTLIGHT CARD */}
          {matchData.bestMatch && matchData.bestMatch.available && (
            <div className="card best-match-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '6px 14px', 
                    backgroundColor: 'var(--emerald-soft)', 
                    color: 'var(--emerald-dark)', 
                    border: '1px solid var(--emerald-border)',
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.85rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '10px'
                  }}>
                    <Trophy size={16} color="var(--emerald-primary)" />
                    <span>WHY THIS IS THE BEST MATCH (RANK #1)</span>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {matchData.bestMatch.student.name}
                  </h3>
                  <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                    @{matchData.bestMatch.student.username} &bull; {matchData.bestMatch.student.branch} (Section {matchData.bestMatch.student.section}, Sem {matchData.bestMatch.student.sem})
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Match Score
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--emerald-dark)', lineHeight: 1 }}>
                    {matchData.bestMatch.matchScore} <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>pts</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                    Highest score in pool
                  </div>
                </div>
              </div>

              {/* 3 Detail Cards */}
              <div className="grid-3" style={{ marginBottom: '24px' }}>
                {/* 1. Skill Compatibility */}
                <div className="match-subcard" style={{ padding: '18px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, color: 'var(--emerald-dark)', marginBottom: '12px' }}>
                    <BookOpen size={18} />
                    <span>Skill Compatibility</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.94rem' }}>
                    {matchData.bestMatch.skillsTheyCanTeach.map((st, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-dark)', fontWeight: 600 }}>
                        <CheckCircle2 size={16} color="var(--emerald-primary)" />
                        <span>{st.message}</span>
                      </div>
                    ))}
                    {matchData.bestMatch.skillsYouCanTeach.map((st, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-dark)', fontWeight: 600 }}>
                        <CheckCircle2 size={16} color="var(--blue-primary)" />
                        <span>{st.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Schedule Overlap */}
                <div className="match-subcard" style={{ padding: '18px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, color: 'var(--indigo-dark)', marginBottom: '12px' }}>
                    <Calendar size={18} />
                    <span>Schedule Overlap</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
                    {matchData.bestMatch.scheduleCompatibility && matchData.bestMatch.scheduleCompatibility.length > 0 ? (
                      matchData.bestMatch.scheduleCompatibility.map((sc, idx) => (
                        <div key={idx} style={{ paddingBottom: '8px', borderBottom: idx < matchData.bestMatch.scheduleCompatibility.length - 1 ? '1px dashed var(--border-medium)' : 'none' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Common Day: {sc.day}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            Your: <strong>{sc.yourTime}</strong> | Their: <strong>{sc.theirTime}</strong>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: 'var(--text-muted)' }}>No common overlapping window</div>
                    )}
                  </div>
                </div>

                {/* 3. Study Mode & Contact */}
                <div className="match-subcard" style={{ padding: '18px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
                    <Users size={18} />
                    <span>Study Mode & Contact</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.94rem' }}>
                    <div>
                      <span className="badge badge-mode" style={{ fontSize: '0.88rem' }}>
                        {matchData.bestMatch.studyModeMessage}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-body)' }}>
                      <Phone size={15} color="var(--indigo-primary)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{matchData.bestMatch.student.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-body)' }}>
                      <Mail size={15} color="var(--indigo-primary)" />
                      <span>{matchData.bestMatch.student.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason Box */}
              <div className="algo-reason-box" style={{ 
                padding: '16px 20px', 
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                fontSize: '1rem'
              }}>
                <strong>Reason for Best Match: </strong>"{matchData.bestMatch.reason}"
              </div>
            </div>
          )}

          {/* TOP MATCHES (Rank 1 to 5) */}
          {matchData.topMatches && matchData.topMatches.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '18px' }}>
                <Trophy size={22} color="var(--amber-primary)" />
                <span>TOP MATCHED STUDY PARTNERS</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {matchData.topMatches.map((item) => (
                  <div 
                    key={item.student.userID}
                    className="card"
                    style={{ 
                      padding: '24px', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      gap: '24px',
                      flexWrap: 'wrap',
                      borderLeft: item.rank === 1 ? '6px solid var(--emerald-primary)' : '6px solid var(--indigo-primary)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                      <div className={item.rank === 1 ? 'rank-badge-first' : 'rank-badge-other'}>
                        #{item.rank}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.student.name}</h4>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>@{item.student.username}</span>
                          <span className="badge badge-mode">{item.student.studyMode}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{item.student.branch} &bull; Sem {item.student.sem}</span>
                        </div>

                        {/* Skills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.92rem', marginTop: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Can Teach You:</span>
                            {item.teachMatches.map(t => (
                              <span key={t.id} className="badge badge-teach">{t.name}</span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>You Teach Them:</span>
                            {item.learnMatches.map(l => (
                              <span key={l.id} className="badge badge-learn">{l.name}</span>
                            ))}
                          </div>
                        </div>

                        {/* Times */}
                        {item.commonSchedule && item.commonSchedule.length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', marginTop: '10px', color: 'var(--text-muted)' }}>
                            <Clock size={15} color="var(--indigo-primary)" />
                            <span>Common Schedule:</span>
                            {item.commonSchedule.map((cs, i) => (
                              <span key={i} className="schedule-tag" style={{ padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                                {cs.day} ({cs.yourTime})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Match Score</div>
                        <span className="badge badge-score" style={{ fontSize: '1.25rem', padding: '6px 16px' }}>
                          +{item.matchScore} pts
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: 'var(--text-body)', textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{item.student.phone}</span>
                        <span>{item.student.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
