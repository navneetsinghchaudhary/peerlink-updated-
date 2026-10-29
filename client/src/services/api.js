// API Service connecting the React frontend directly to the local Express/C++ backend

const BASE_URL = '/api';

export async function fetchHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  if (!res.ok) throw new Error('Failed to reach backend health endpoint');
  return res.json();
}

export async function fetchSubjects() {
  const res = await fetch(`${BASE_URL}/subjects`);
  if (!res.ok) throw new Error('Failed to fetch subjects from C++ engine');
  return res.json();
}

export async function fetchStudents() {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error('Failed to fetch students from C++ engine');
  return res.json();
}

export async function fetchStudent(username) {
  const res = await fetch(`${BASE_URL}/students/${encodeURIComponent(username)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Student not found' }));
    throw new Error(err.error || 'Student not found');
  }
  return res.json();
}

export async function runMatchmaking({ username, profile }) {
  const body = username ? { username } : { profile };
  const res = await fetch(`${BASE_URL}/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Matchmaking failed' }));
    throw new Error(err.error || 'Matchmaking calculation failed');
  }
  return res.json();
}

export async function registerStudent(studentData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Registration failed');
  }
  return data;
}

