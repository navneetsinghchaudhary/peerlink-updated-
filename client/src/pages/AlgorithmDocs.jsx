import React from 'react';
import { 
  Code2, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react';

export default function AlgorithmDocs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Overview Banner */}
      <div className="card" style={{ padding: '26px', background: 'linear-gradient(135deg, #FAF8F2 0%, #F1EEE6 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Code2 size={24} color="var(--sage-primary)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>C++ Engine & Algorithm Transparency</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          This full-stack application connects directly to a compiled binary (<code style={{ fontFamily: 'var(--font-mono)' }}>peer_engine.exe</code>) built from the original C++ program. Every match calculation, ranking score, and compatibility explanation is executed natively in C++.
        </p>
      </div>

      {/* Section 1: The Exact C++ Matching Formula */}
      <div className="card">
        <h3 className="card-title">
          <Cpu size={18} color="var(--sage-primary)" />
          <span>The C++ Scoring & Compatibility Formula</span>
        </h3>
        <p className="card-subtitle">
          Implemented in <code style={{ fontFamily: 'var(--font-mono)' }}>match::matchmaking(User &user)</code>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div style={{ padding: '14px', backgroundColor: 'var(--sage-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sage-border)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--sage-dark)' }}>+2 pts</div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>They Teach You</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Each candidate strong skill that matches your weak skill (<code style={{ fontFamily: 'var(--font-mono)' }}>teachMatch = 1</code>)</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: 'var(--blue-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--blue-border)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue-primary)' }}>+2 pts</div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>You Teach Them</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Each candidate weak skill that matches your strong skill (<code style={{ fontFamily: 'var(--font-mono)' }}>learnMatch = 1</code>)</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>+1 pt / day</div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Schedule Overlap</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Common day with overlapping 24-hr hours (<code style={{ fontFamily: 'var(--font-mono)' }}>c.from &lt; u.till && u.from &lt; c.till</code>)</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>+1 pt</div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Study Mode Match</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Awarded when both students prefer Online or both prefer Offline</div>
          </div>
        </div>

        {/* The Fundamental Invariant */}
        <div style={{
          padding: '16px',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.86rem'
        }}>
          <strong style={{ color: '#92400E', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <ShieldCheck size={16} />
            The Mutual Exchange Invariant:
          </strong>
          <p style={{ color: '#78350F', lineHeight: 1.5 }}>
            In the C++ code, candidate inclusion is strictly conditioned on <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>if (teachMatch && learnMatch)</code>. Even if a peer has high schedule overlap or matches study mode, they are <strong>disqualified</strong> unless there is a genuine bidirectional skill exchange. This guarantees true peer-to-peer reciprocity!
          </p>
        </div>
      </div>

      {/* Section 2: Subject Domain Mapping */}
      <div className="card">
        <h3 className="card-title">
          <Layers size={18} color="var(--sage-primary)" />
          <span>Predefined Subjects & Encodings (subs[30])</span>
        </h3>
        <p className="card-subtitle">
          The 6 subjects supported by the C++ engine
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { id: 1, name: 'DSA', desc: 'Data Structures & Algorithms' },
            { id: 2, name: 'OOPs', desc: 'Object-Oriented Programming' },
            { id: 3, name: 'Video Editing', desc: 'Multimedia & Content Production' },
            { id: 4, name: 'UI Design', desc: 'User Experience & Interface Design' },
            { id: 5, name: 'Database', desc: 'SQL, DBMS & Storage Systems' },
            { id: 6, name: 'Web Development', desc: 'Frontend, Full-Stack & APIs' }
          ].map(s => (
            <div key={s.id} style={{ padding: '12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-teach">{s.id}</span>
                <strong>{s.name}</strong>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Inherited C++ Limitations */}
      <div className="card">
        <h3 className="card-title">
          <AlertTriangle size={18} color="var(--amber-text)" />
          <span>Known Limitations Inherited from Original C++ Code</span>
        </h3>
        <p className="card-subtitle">
          Clear identification of authentic constraints as requested in Section 12 of the project brief
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber-text)', marginTop: '8px', flexShrink: 0 }}></div>
            <div>
              <strong>Sample Dataset Size:</strong> The original C++ program defines <code style={{ fontFamily: 'var(--font-mono)' }}>const int NUMBER_OF_SAMPLE_STUDENTS = 12;</code>. The initial search pool consists of these 12 hardcoded college student records.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber-text)', marginTop: '8px', flexShrink: 0 }}></div>
            <div>
              <strong>Fixed 6-Subject Array:</strong> Subjects are indexed 1 through 6 in <code style={{ fontFamily: 'var(--font-mono)' }}>subs[30]</code>. Custom arbitrary subject names cannot be added without updating the subject mapping.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber-text)', marginTop: '8px', flexShrink: 0 }}></div>
            <div>
              <strong>In-Memory Persistence:</strong> The original C++ console program had no file I/O or database persistence; newly registered users were held in volatile memory during the CLI session. Our integration bridge adds local JSON persistence (<code style={{ fontFamily: 'var(--font-mono)' }}>registered_users.json</code>) so registered students can be reused during localhost demonstrations.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber-text)', marginTop: '8px', flexShrink: 0 }}></div>
            <div>
              <strong>Admin Credentials:</strong> Option 2 in the C++ menu uses hardcoded credentials (<code style={{ fontFamily: 'var(--font-mono)' }}>navneet</code> / <code style={{ fontFamily: 'var(--font-mono)' }}>12345678</code>) to authenticate user profile viewing.
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Future Roadmap (Not in C++ yet) */}
      <div className="card">
        <h3 className="card-title">
          <Sparkles size={18} color="var(--blue-primary)" />
          <span>Future Development Roadmap (Post-Hackathon Scope)</span>
        </h3>
        <p className="card-subtitle">
          Features from the broader hackathon prompt that are not yet implemented in C++ and are intentionally not faked in this version:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
            <strong>1. Session Booking Engine</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Accept/decline study meeting requests, calendar invites, and automated reminders.
            </p>
          </div>

          <div style={{ padding: '14px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
            <strong>2. Shared Notes & Resources</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Collaborative workspace screen with PDF/notes upload and shared markdown editor.
            </p>
          </div>

          <div style={{ padding: '14px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
            <strong>3. Peer Ratings & Badges</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Post-session peer reviews, 5-star ratings, and gamified achievement badges.
            </p>
          </div>

          <div style={{ padding: '14px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
            <strong>4. In-App Direct Chat</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Real-time messaging between matched peer tutors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
