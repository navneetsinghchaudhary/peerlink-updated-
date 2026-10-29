import React, { useState } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Sparkles
} from 'lucide-react';
import { registerStudent } from '../services/api';

export default function Register({ onStudentRegistered, onNavigate }) {
  const [formData, setFormData] = useState({
    userID: 125,
    username: '',
    name: '',
    email: '',
    phone: '',
    college: 'Arya College of Engineering',
    branch: 'CSE',
    section: 'A',
    sem: 3,
    bio: '',
    studyMode: 'Online',
    strongSubjects: [1, 2], // DSA, OOPs
    weakSubjects: [3, 6],   // Video Editing, Web Dev
    schedule: [
      { day: 'Monday', from: 18, till: 20 },
      { day: 'Wednesday', from: 18, till: 20 },
      { day: 'Friday', from: 18, till: 20 }
    ]
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  const subjectOptions = [
    { id: 1, name: '1. DSA (Data Structures)' },
    { id: 2, name: '2. OOPs (Object Oriented)' },
    { id: 3, name: '3. Video Editing' },
    { id: 4, name: '4. UI Design' },
    { id: 5, name: '5. Database' },
    { id: 6, name: '6. Web Development' }
  ];

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const validate = () => {
    const errs = {};
    if (!formData.userID || formData.userID <= 0) {
      errs.userID = 'User ID must be a positive integer';
    }
    if (!formData.username.trim()) {
      errs.username = 'Username is required';
    }
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    }
    if (formData.strongSubjects.length < 1 || formData.strongSubjects.length > 5) {
      errs.strongSubjects = 'Select between 1 and 5 strong subjects (skills you teach)';
    }
    if (formData.weakSubjects.length < 1 || formData.weakSubjects.length > 5) {
      errs.weakSubjects = 'Select between 1 and 5 weak subjects (skills you want to learn)';
    }
    if (formData.schedule.length < 1 || formData.schedule.length > 7) {
      errs.schedule = 'Add at least 1 day of availability (max 7)';
    }
    formData.schedule.forEach((slot, index) => {
      if (slot.from >= slot.till) {
        errs[`slot_${index}`] = 'Start hour must be before end hour';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toggleStrongSubject = (id) => {
    setFormData(prev => {
      const exists = prev.strongSubjects.includes(id);
      if (exists) {
        return { ...prev, strongSubjects: prev.strongSubjects.filter(x => x !== id) };
      } else {
        if (prev.strongSubjects.length >= 5) return prev;
        return { ...prev, strongSubjects: [...prev.strongSubjects, id] };
      }
    });
  };

  const toggleWeakSubject = (id) => {
    setFormData(prev => {
      const exists = prev.weakSubjects.includes(id);
      if (exists) {
        return { ...prev, weakSubjects: prev.weakSubjects.filter(x => x !== id) };
      } else {
        if (prev.weakSubjects.length >= 5) return prev;
        return { ...prev, weakSubjects: [...prev.weakSubjects, id] };
      }
    });
  };

  const addScheduleSlot = () => {
    if (formData.schedule.length >= 7) return;
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: 'Tuesday', from: 17, till: 20 }]
    }));
  };

  const removeScheduleSlot = (index) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const updateScheduleSlot = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.schedule];
      updated[index] = { ...updated[index], [field]: field === 'from' || field === 'till' ? parseInt(value) || 0 : value };
      return { ...prev, schedule: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    try {
      const res = await registerStudent(formData);
      setSuccessResult(res.student);
      if (onStudentRegistered) {
        onStudentRegistered(res.student);
      }
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '26px' }} className="animate-fade-in">
      {/* Header */}
      <div className="card register-hero-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <UserPlus size={26} color="var(--purple-primary)" />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>User Registration</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem' }}>
          Register a new student profile into the study network.
        </p>
      </div>

      {successResult ? (
        <div className="card success-register-card" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--emerald-soft)',
            color: 'var(--emerald-dark)',
            border: '2px solid var(--emerald-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)'
          }}>
            <CheckCircle2 size={38} />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-dark)', marginBottom: '8px' }}>
            ========== Registration Successful ==========
          </h3>
          <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 24px' }}>
            <strong>{successResult.name}</strong> (@{successResult.username}) has been registered and added to the study pool.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-emerald"
              style={{ padding: '12px 24px', fontSize: '1.05rem', fontWeight: 700 }}
              onClick={() => onNavigate('matching')}
            >
              <Sparkles size={18} />
              <span>FIND THE MATCH Now</span>
            </button>
            <button 
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '1rem' }}
              onClick={() => onNavigate('profiles')}
            >
              <span>View Profiles</span>
            </button>
            <button 
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '1rem' }}
              onClick={() => {
                setSuccessResult(null);
                setFormData(prev => ({ ...prev, userID: prev.userID + 1, username: '', name: '', bio: '' }));
              }}
            >
              <span>Register Another</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '32px' }}>
          {errors.form && (
            <div className="alert-box alert-warning">
              <AlertCircle size={20} />
              <div>{errors.form}</div>
            </div>
          )}

          {/* Identity Fields */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px', marginBottom: '22px' }}>
            Personal & Academic Information
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">User ID (in INTEGER) *</label>
              <input 
                type="number" 
                className="form-input" 
                value={formData.userID}
                onChange={e => setFormData({ ...formData, userID: parseInt(e.target.value) || 0 })}
                required 
              />
              {errors.userID && <div className="form-error">{errors.userID}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Username *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. rohan_sharma"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                required 
              />
              {errors.username && <div className="form-error">{errors.username}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Rohan Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required 
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Mobile No. *</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required 
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Id</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="e.g. rohan@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Branch & Section & Semester</label>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Branch (CSE)"
                  value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })}
                />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Sec (A)"
                  value={formData.section}
                  onChange={e => setFormData({ ...formData, section: e.target.value })}
                />
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="Sem (3)"
                  value={formData.sem}
                  onChange={e => setFormData({ ...formData, sem: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Bio</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Preparing for competitive programming."
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          {/* Subjects are: 1 to 6 */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px', marginTop: '28px', marginBottom: '22px' }}>
            Subjects Configuration (DSA, OOPs, Video Editing, UI Design, Database, Web Development)
          </h3>

          <div className="grid-2">
            {/* Strong Subjects */}
            <div>
              <label className="form-label" style={{ color: 'var(--emerald-dark)', fontSize: '1.05rem' }}>
                Total Number of Strong Subjects (Max 5) *
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {subjectOptions.map(sub => {
                  const selected = formData.strongSubjects.includes(sub.id);
                  return (
                    <button
                      type="button"
                      key={sub.id}
                      onClick={() => toggleStrongSubject(sub.id)}
                      className={`subject-btn ${selected ? 'selected-strong' : ''}`}
                    >
                      <span>{sub.name}</span>
                      {selected ? <CheckCircle2 size={18} color="var(--emerald-primary)" /> : <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Select</span>}
                    </button>
                  );
                })}
              </div>
              {errors.strongSubjects && <div className="form-error">{errors.strongSubjects}</div>}
            </div>

            {/* Weak Subjects */}
            <div>
              <label className="form-label" style={{ color: 'var(--indigo-dark)', fontSize: '1.05rem' }}>
                Total Number of Weak Subjects (Max 5) *
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {subjectOptions.map(sub => {
                  const selected = formData.weakSubjects.includes(sub.id);
                  return (
                    <button
                      type="button"
                      key={sub.id}
                      onClick={() => toggleWeakSubject(sub.id)}
                      className={`subject-btn ${selected ? 'selected-weak' : ''}`}
                    >
                      <span>{sub.name}</span>
                      {selected ? <CheckCircle2 size={18} color="var(--indigo-primary)" /> : <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Select</span>}
                    </button>
                  );
                })}
              </div>
              {errors.weakSubjects && <div className="form-error">{errors.weakSubjects}</div>}
            </div>
          </div>

          {/* Schedule & Study Mode */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px', marginTop: '28px', marginBottom: '22px' }}>
            Availability Schedule & Study Mode
          </h3>

          <div className="form-group" style={{ maxWidth: '320px' }}>
            <label className="form-label">Study Mode (Online/Offline) *</label>
            <select 
              className="form-select"
              value={formData.studyMode}
              onChange={e => setFormData({ ...formData, studyMode: e.target.value })}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label className="form-label" style={{ marginBottom: 0, fontSize: '1.02rem' }}>
                How many days are you available (Max 7) *
              </label>
              {formData.schedule.length < 7 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={addScheduleSlot}
                >
                  <Plus size={16} />
                  <span>Add Day</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formData.schedule.map((slot, index) => (
                <div key={index} className="slot-row">
                  <select
                    className="form-select"
                    value={slot.day}
                    onChange={e => updateScheduleSlot(index, 'day', e.target.value)}
                  >
                    {daysList.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>From:</span>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="0" 
                      max="23" 
                      value={slot.from} 
                      onChange={e => updateScheduleSlot(index, 'from', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>Till:</span>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="1" 
                      max="24" 
                      value={slot.till} 
                      onChange={e => updateScheduleSlot(index, 'till', e.target.value)}
                    />
                  </div>

                  {formData.schedule.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeScheduleSlot(index)}
                      style={{ background: 'none', border: 'none', color: 'var(--rose-primary)', cursor: 'pointer', padding: '6px' }}
                      title="Remove Slot"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.schedule && <div className="form-error">{errors.schedule}</div>}
          </div>

          <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.08rem', fontWeight: 700 }}
              disabled={submitting}
            >
              <UserPlus size={18} />
              <span>{submitting ? 'Registering Profile...' : 'Complete Registration'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
