import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  Eye, 
  BookOpen
} from 'lucide-react';

export default function Directory({ 
  students, 
  currentStudent, 
  onSelectStudent, 
  onNavigate 
}) {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [inspectStudent, setInspectStudent] = useState(null);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }} className="animate-fade-in">
      {/* Header with Admin Navneet Singh Badge */}
      <div className="card" style={{ 
        padding: '28px',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
        border: '2px solid #86EFAC',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: '#DCFCE7', color: '#166534', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px' }}>
              <ShieldCheck size={18} color="#15803D" />
              <span>Admin: Navneet Singh (Active by Default)</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Display Data of Existing Users (C++ Menu #2)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', marginTop: '4px' }}>
              Browse all {students.length} students loaded directly from C++ <code style={{ fontFamily: 'var(--font-mono)' }}>SampleData</code>. Click "View Profile" to see the authentic C++ profile display.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ 
          marginTop: '24px', 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr', 
          gap: '14px' 
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              className="form-input"
              placeholder="Enter username (e.g. _mitarth, _navneet_singh)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '44px', fontSize: '1.02rem' }}
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
            <option value="all">All Modes</option>
            <option value="Online">Online Mode</option>
            <option value="Offline">Offline Mode</option>
          </select>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid-2">
        {filteredStudents.map(student => {
          const isNavneet = student.username === '_navneet_singh';
          return (
            <div 
              key={student.userID}
              className="card"
              style={{
                borderColor: isNavneet ? '#34D399' : 'var(--border-light)',
                backgroundColor: isNavneet ? '#F6FAF7' : '#FFFFFF',
                borderLeft: isNavneet ? '6px solid #10B981' : '6px solid var(--indigo-primary)',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div className="user-avatar-circle" style={{
                    width: '48px',
                    height: '48px',
                    fontSize: '1.25rem',
                    background: isNavneet ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, var(--indigo-primary) 0%, var(--purple-primary) 100%)'
                  }}>
                    {student.name ? student.name[0] : 'S'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{student.name}</h3>
                      {isNavneet && (
                        <span className="badge badge-admin" style={{ fontSize: '0.74rem', padding: '2px 8px' }}>
                          ★ Admin
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      @{student.username} &bull; {student.branch} (Sec {student.section}, Sem {student.sem})
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="badge badge-mode">{student.studyMode}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>ID: {student.userID}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', marginBottom: '16px', minHeight: '44px', fontWeight: 500 }}>
                {student.bio || 'College student participating in peer study exchange.'}
              </p>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', marginBottom: '18px' }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Skills You Teach:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {student.strongSubjects.map(s => (
                      <span key={s.id} className="badge badge-teach">{s.name}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Skills Wants to Learn:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {student.weakSubjects.map(s => (
                      <span key={s.id} className="badge badge-learn">{s.name}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#F8FAFC',
                fontSize: '0.88rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '18px',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="var(--indigo-primary)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{student.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="var(--indigo-primary)" />
                  <span>{student.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setInspectStudent(student)}
                >
                  <Eye size={15} />
                  <span>C++ Profile View</span>
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onSelectStudent(student);
                    onNavigate('matching');
                  }}
                >
                  <Sparkles size={15} />
                  <span>FIND THE MATCH</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Raw C++ Record Modal (Mirrors C++ SampleData::showData()) */}
      {inspectStudent && (
        <div className="modal-overlay" onClick={() => setInspectStudent(null)}>
          <div className="modal-dialog" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>C++ Profile Output: {inspectStudent.name}</h3>
              <button 
                onClick={() => setInspectStudent(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', fontWeight: 700 }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div style={{
                backgroundColor: '#0F172A',
                color: '#38BDF8',
                padding: '22px',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.94rem',
                lineHeight: 1.7,
                maxHeight: '440px',
                overflowY: 'auto',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
              }}>
                <div style={{ color: '#F8FAFC', fontWeight: 700 }}>==========User Profile==========</div>
                <div>User Id : {inspectStudent.userID}</div>
                <div>Name : {inspectStudent.name}</div>
                <div>User Name : {inspectStudent.username}</div>
                <div style={{ color: '#94A3B8' }}>Email Id : {inspectStudent.email}</div>
                <div>Phone Number : {inspectStudent.phone}</div>
                <div style={{ color: '#94A3B8' }}>College Name : {inspectStudent.college}</div>
                <div>Branch: {inspectStudent.branch}</div>
                <div>Section : {inspectStudent.section}</div>
                <div>Semester : {inspectStudent.sem}</div>
                <div style={{ marginTop: '10px', color: '#34D399', fontWeight: 700 }}>Skills you teach :</div>
                <div>{inspectStudent.strongSubjects.map(s => s.id).join(' , ')} ({inspectStudent.strongSubjects.map(s => s.name).join(', ')})</div>
                <div style={{ marginTop: '10px', color: '#A78BFA', fontWeight: 700 }}>Skills wants to learn :</div>
                <div>{inspectStudent.weakSubjects.map(s => s.id).join(' , ')} ({inspectStudent.weakSubjects.map(s => s.name).join(', ')})</div>
                <div style={{ marginTop: '10px', color: '#FDE047', fontWeight: 700 }}>Available Schedule :</div>
                {inspectStudent.schedule.map((sc, i) => (
                  <div key={i}>{sc.day} : {sc.from} - {sc.till}</div>
                ))}
                <div style={{ color: '#F8FAFC', fontWeight: 700, marginTop: '10px' }}>==================================</div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => {
                  onSelectStudent(inspectStudent);
                  setInspectStudent(null);
                  onNavigate('matching');
                }}
              >
                <Sparkles size={16} />
                <span>Run Match For This Student</span>
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setInspectStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
