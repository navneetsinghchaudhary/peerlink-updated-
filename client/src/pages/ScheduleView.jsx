import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRightLeft, 
  Info,
  Users
} from 'lucide-react';

export default function ScheduleView({ currentStudent, students, onSelectStudent }) {
  const [compareStudentId, setCompareStudentId] = useState(
    students.find(s => s.username !== currentStudent?.username)?.username || ''
  );

  const compareStudent = students.find(s => s.username === compareStudentId);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate overlaps between currentStudent and compareStudent
  const calculateOverlaps = () => {
    if (!currentStudent || !compareStudent) return [];
    const overlaps = [];

    currentStudent.schedule.forEach(uDay => {
      compareStudent.schedule.forEach(cDay => {
        if (uDay.day.toLowerCase() === cDay.day.toLowerCase()) {
          // Check overlap condition: uDay.from < cDay.till && cDay.from < uDay.till
          if (uDay.from < cDay.till && cDay.from < uDay.till) {
            const overlapStart = Math.max(uDay.from, cDay.from);
            const overlapEnd = Math.min(uDay.till, cDay.till);
            overlaps.push({
              day: uDay.day,
              overlapStart,
              overlapEnd,
              userTime: `${uDay.from}:00 - ${uDay.till}:00`,
              peerTime: `${cDay.from}:00 - ${cDay.till}:00`,
              duration: overlapEnd - overlapStart
            });
          }
        }
      });
    });

    return overlaps;
  };

  const overlaps = calculateOverlaps();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Peer Comparison Selector */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Weekly Study Availability & Overlap Analysis</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
              Inspect weekly time commitments and evaluate schedule compatibility according to the C++ overlap condition.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Compare With:</span>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={compareStudentId}
              onChange={e => setCompareStudentId(e.target.value)}
            >
              {students
                .filter(s => s.username !== currentStudent?.username)
                .map(s => (
                  <option key={s.username} value={s.username}>
                    {s.name} (@{s.username}) &bull; {s.studyMode}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Schedule Overlap Result Summary */}
        <div style={{ 
          marginTop: '18px', 
          padding: '14px 18px', 
          backgroundColor: overlaps.length > 0 ? 'var(--sage-soft)' : 'var(--bg-subtle)',
          border: `1px solid ${overlaps.length > 0 ? 'var(--sage-border)' : 'var(--border-light)'}`,
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {overlaps.length > 0 ? (
              <CheckCircle2 size={18} color="var(--sage-primary)" />
            ) : (
              <XCircle size={18} color="var(--crimson-text)" />
            )}
            <div>
              <strong style={{ fontSize: '0.92rem', color: overlaps.length > 0 ? 'var(--sage-dark)' : 'var(--text-main)' }}>
                {overlaps.length > 0 
                  ? `${overlaps.length} Common Study Session Day(s) Detected (+${overlaps.length} pts in C++ matching)`
                  : 'No Overlapping Availability Between These Two Schedules'}
              </strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Comparing {currentStudent?.name} ({currentStudent?.studyMode}) & {compareStudent?.name} ({compareStudent?.studyMode})
              </div>
            </div>
          </div>

          {overlaps.length > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {overlaps.map((ov, i) => (
                <span key={i} className="badge badge-teach" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                  {ov.day}: {ov.overlapStart}:00 - {ov.overlapEnd}:00 ({ov.duration}h)
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Day Cards */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>
          <Calendar size={18} color="var(--sage-primary)" />
          <span>7-Day Schedule Comparison Table</span>
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table className="schedule-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Weekday</th>
                <th style={{ width: '35%' }}>{currentStudent?.name} (You)</th>
                <th style={{ width: '35%' }}>{compareStudent?.name}</th>
                <th style={{ width: '15%' }}>Overlap Result</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(day => {
                const uSlot = currentStudent?.schedule.find(s => s.day.toLowerCase() === day.toLowerCase());
                const cSlot = compareStudent?.schedule.find(s => s.day.toLowerCase() === day.toLowerCase());
                
                const hasOverlap = uSlot && cSlot && (uSlot.from < cSlot.till && cSlot.from < uSlot.till);
                let overlapWindow = null;
                if (hasOverlap) {
                  const s = Math.max(uSlot.from, cSlot.from);
                  const e = Math.min(uSlot.till, cSlot.till);
                  overlapWindow = `${s}:00 - ${e}:00 (${e - s} hrs)`;
                }

                return (
                  <tr key={day} style={{ backgroundColor: hasOverlap ? '#F6FAF7' : 'transparent' }}>
                    <td>
                      <strong>{day}</strong>
                    </td>
                    <td>
                      {uSlot ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="badge badge-teach">{uSlot.from}:00 - {uSlot.till}:00</span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>({uSlot.till - uSlot.from} hrs)</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>Not Available</span>
                      )}
                    </td>
                    <td>
                      {cSlot ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="badge badge-learn">{cSlot.from}:00 - {cSlot.till}:00</span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>({cSlot.till - cSlot.from} hrs)</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>Not Available</span>
                      )}
                    </td>
                    <td>
                      {hasOverlap ? (
                        <span className="badge badge-score" style={{ fontSize: '0.78rem' }}>
                          Overlap: {overlapWindow}
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          {uSlot && cSlot ? 'Different Hours' : 'No Overlap'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparency Note */}
      <div className="alert-box alert-info">
        <Info size={16} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.82rem' }}>
          <strong>Algorithmic Integrity Note:</strong> The schedule compatibility score in C++ awards <strong>+1 point per common day with overlapping hours</strong>. This section visualizes actual configured hours without inventing a fake booking or calendar invite system.
        </div>
      </div>
    </div>
  );
}
