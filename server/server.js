const express = require('express');
const cors = require('cors');
const { spawn, execFile, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const rootDir = path.resolve(__dirname, '..');
const exePath = path.join(rootDir, 'peer_engine.exe');
const cppBridgePath = path.join(rootDir, 'cpp_bridge.cpp');

// Look for C++ compiler
function findGppCompiler() {
  const candidates = [
    'g++',
    'C:\\Program Files (x86)\\Dev-Cpp\\MinGW64\\bin\\g++.exe',
    'C:\\Dev-Cpp\\MinGW64\\bin\\g++.exe',
    'C:\\MinGW\\bin\\g++.exe',
    'C:\\msys64\\mingw64\\bin\\g++.exe'
  ];

  for (const cmd of candidates) {
    try {
      execSync(`"${cmd}" --version`, { stdio: 'ignore' });
      return cmd;
    } catch (e) {
      // ignore
    }
  }
  return null;
}

// Ensure peer_engine.exe is compiled
function ensureEngineCompiled() {
  if (fs.existsSync(exePath)) {
    return true;
  }

  const compiler = findGppCompiler();
  if (!compiler) {
    console.error('No C++ compiler found to build peer_engine.exe.');
    return false;
  }

  console.log(`Compiling C++ bridge using ${compiler}...`);
  try {
    execSync(`"${compiler}" -std=c++11 -O2 "${cppBridgePath}" -o "${exePath}"`, {
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log('Successfully compiled peer_engine.exe.');
    return true;
  } catch (err) {
    console.error('Failed to compile C++ engine:', err.message);
    return false;
  }
}

// Helper to run peer_engine.exe
function runEngine(args, stdinPayload = null) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(exePath)) {
      const ok = ensureEngineCompiled();
      if (!ok) {
        return reject(new Error('peer_engine.exe is missing and compiler was not found.'));
      }
    }

    const child = spawn(exePath, args, { cwd: rootDir });
    let stdoutData = '';
    let stderrData = '';

    child.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    child.on('close', (code) => {
      if (code !== 0 && !stdoutData.trim()) {
        return reject(new Error(stderrData || `Process exited with code ${code}`));
      }
      try {
        const json = JSON.parse(stdoutData.trim());
        resolve(json);
      } catch (err) {
        reject(new Error(`Failed to parse C++ engine JSON: ${err.message}\nRaw output: ${stdoutData}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });

    if (stdinPayload) {
      child.stdin.write(stdinPayload);
      child.stdin.end();
    }
  });
}

// Health status
app.get('/api/health', (req, res) => {
  const binaryExists = fs.existsSync(exePath);
  res.json({
    status: 'ok',
    engineCompiled: binaryExists,
    binaryPath: exePath,
    timestamp: new Date().toISOString()
  });
});

// List the 6 predefined subjects from C++
app.get('/api/subjects', async (req, res) => {
  try {
    const subjects = await runEngine(['--subjects']);
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all students (SampleData + registered)
app.get('/api/students', async (req, res) => {
  try {
    const students = await runEngine(['--list-students']);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single student by username
app.get('/api/students/:username', async (req, res) => {
  try {
    const student = await runEngine(['--get-student', req.params.username]);
    if (student.error) {
      return res.status(404).json(student);
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Matchmaking endpoint
// Can match by existing username OR custom profile JSON
app.post('/api/match', async (req, res) => {
  try {
    const { username, profile } = req.body;
    if (username) {
      // Run match for existing user in dataset
      const result = await runEngine(['--match-student', username]);
      return res.json(result);
    } else if (profile) {
      // Run match for dynamic or custom user payload
      const jsonStr = typeof profile === 'string' ? profile : JSON.stringify(profile);
      const result = await runEngine(['--match-json'], jsonStr);
      return res.json(result);
    } else {
      return res.status(400).json({ error: 'Please provide either a username or a user profile for matching.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const jsonStr = JSON.stringify(req.body);
    const result = await runEngine(['--register'], jsonStr);
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

ensureEngineCompiled();

app.listen(PORT, () => {
  console.log(`P2P C++ Study Partner API Bridge listening on http://localhost:${PORT}`);
});
