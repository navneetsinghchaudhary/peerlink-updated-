# PeerLink — Peer-to-Peer Community Skill & Knowledge Exchange Platform

> **College Hackathon Project**  
> **Lead Developer & Administrator**: **Navneet Singh** (`_navneet_singh`)  
> Built with a high-performance **C++ Core Engine** coupled with a modern **React + Vite** web interface and a lightweight **Node.js Express** local API bridge.

---

## 1. Project Overview

PeerLink was created by **Navneet Singh** to solve a real-world campus challenge: **students want to learn skills from their peers while sharing what they already know**. By default, the application is authenticated with **Navneet Singh** as the platform administrator and lead student profile. 

Unlike naive matchmaking systems or generic keyword search, PeerLink enforces **true peer-to-peer reciprocity**:
- A match is only valid when **Student A can teach what Student B wants to learn** AND **Student B can teach what Student A wants to learn** (`teachMatch && learnMatch`).
- Compatibility is scored in real time by the compiled C++ program based on **bidirectional skill exchange (+4 pts max)**, **schedule window overlap (+1 pt per common day)**, and **study mode alignment (+1 pt for same Online/Offline mode)**.

---

## 2. Architecture & Tech Stack

```
   ┌───────────────────────────────────────────────────────────────┐
   │                  React (Vite) Frontend                        │
   │               Running on http://localhost:5173                │
   │  (Dashboard, Partner Discovery, Profile, Timetable, Admin)   │
   └──────────────────────────────┬────────────────────────────────┘
                                  │ HTTP / JSON (via Vite Proxy)
                                  ▼
   ┌───────────────────────────────────────────────────────────────┐
   │                 Node.js Express API Bridge                    │
   │               Running on http://localhost:5000                │
   │      (Input validation, child process execution, routing)     │
   └──────────────────────────────┬────────────────────────────────┘
                                  │ stdio / CLI Execution
                                  ▼
   ┌───────────────────────────────────────────────────────────────┐
   │             Native C++ Engine (peer_engine.exe)              │
   │       Compiled via MinGW64 g++ (tdm64-1 4.9.2, C++11)         │
   │  - Preserves exact SampleData, User, and match::matchmaking  │
   │  - Computes sc_array, rankings, and showMatchedDetails       │
   └───────────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18, Vite, Vanilla CSS Design System, Lucide-React icons.
- **Backend API**: Node.js, Express, CORS.
- **Core Engine**: C++ (`peer to peer (1).cpp` and `cpp_bridge.cpp` compiled to `peer_engine.exe`).
- **Data Storage**: In-memory C++ `SampleData` array (12 student records) + local JSON file persistence (`registered_users.json`) for newly registered students.

---

## 3. Quick Start (Localhost Windows)

### Prerequisites
1. **Node.js** (v18+; current machine has v24.18.0) & **npm**.
2. **g++ compiler** (Dev-Cpp MinGW64 at `C:\Program Files (x86)\Dev-Cpp\MinGW64\bin\g++.exe` or any system `g++`).

---

### One-Click Startup (PowerShell)
Open PowerShell in the project directory and run:
```powershell
.\scripts\start.ps1
```
*This script automatically checks the C++ binary, compiles it if needed, installs dependencies, launches the Express backend on port 5000, starts the Vite frontend on port 5173, and launches your browser at `http://localhost:5173`.*

---

### Manual Step-by-Step Commands

#### Step 1: Compile the C++ Engine
```powershell
# Using the installed MinGW64 g++:
& "C:\Program Files (x86)\Dev-Cpp\MinGW64\bin\g++.exe" -std=c++11 -O2 cpp_bridge.cpp -o peer_engine.exe
```

#### Step 2: Start the Backend Server (Port 5000)
```powershell
cd server
npm install
node server.js
```

#### Step 3: Start the Frontend Client (Port 5173)
In a second terminal:
```powershell
cd client
npm install
npm run dev
```

#### Step 4: Open in Browser
Navigate to **`http://localhost:5173/`**.

---

## 4. Key Application Sections

1. **Dashboard (`/`)**:
   - Welcome banner addressing active student by name.
   - Quick overview of active student's "Skills I Can Teach", "Skills I Want to Learn", and study availability.
   - Real-time compatibility recommendations computed directly by C++.
   - Concise explanation of the reciprocal matching mechanism.

2. **Find a Study Partner (`/matching`)**:
   - Active student parameters.
   - Live C++ matchmaking execution button.
   - **Scenario test selector**: Switch between "Current Profile", "Overlapping Schedule Test" (Score 11), and "Zero-Match Test" (demonstrates graceful empty state).
   - **Why This is the Best Match** card highlighting Rank #1 with complete compatibility breakdown:
     - Exact skill exchange messages ("Monika Sharma can teach you Video Editing", "You can teach DSA to Monika Sharma").
     - Schedule overlap breakdown ("Common Day: Wednesday, Your Time: 18:00 - 20:00, Their Time: 13:00 - 20:00").
     - Study mode alignment ("Same Study Mode: Online").
     - Algorithmic reason text from C++.
   - Top 5 ranked mutual matches sorted descending by score.
   - **Candidate Qualification Audit table**: Full matrix of all 12 candidate records explaining why each peer qualified or did not qualify.

3. **Student Profile (`/profile`)**:
   - Clean profile card with academic and contact details.
   - Visual distinction between "Skills I Can Teach" (sage badges) and "Skills I Want to Learn" (blue badges).
   - Weekly schedule breakdown table.

4. **Student Directory (`/directory`)**:
   - Searchable and filterable student directory.
   - Filter by subjects (DSA, OOPs, Video Editing, UI Design, Database, Web Development) and study mode (Online/Offline).
   - **Administrator Login Modal**: Corresponds to Option 2 in the C++ console menu (`navneet` / `12345678`). Unlocks raw C++ student record inspection (<code style={{ fontFamily: 'var(--font-mono)' }}>SampleData::showData()</code>).

5. **Weekly Schedule & Overlap (`/schedule`)**:
   - 7-day schedule comparison table.
   - Interactive peer overlap inspector calculating exact overlapping time blocks without pretending to be a fake calendar booking system.

6. **Student Registration (`/register`)**:
   - Complete registration form corresponding to C++ <code style={{ fontFamily: 'var(--font-mono)' }}>User::registerUser()</code>.
   - Validates User ID (positive integer), strong subjects (1-5), weak subjects (1-5), and availability slots (1-7).
   - Automatically activates newly registered profile for immediate matchmaking.

7. **C++ Engine & Rules (`/algorithm`)**:
   - Complete documentation of data structures, scoring formulas, inherited limitations, and future roadmap.

---

## 5. C++ Matching Algorithm Details

### Subject Mapping
- **1**: DSA (Data Structures & Algorithms)
- **2**: OOPs (Object-Oriented Programming)
- **3**: Video Editing
- **4**: UI Design
- **5**: Database
- **6**: Web Development

### Scoring Formula
$$\text{Score} = 2 \times (\text{They Teach You}) + 2 \times (\text{You Teach Them}) + 1 \times (\text{Overlapping Days}) + 1 \times (\text{Same Study Mode})$$

### The Reciprocal Rule
$$\text{Qualified Match} \iff (\text{teachMatch} == 1 \land \text{learnMatch} == 1)$$

---

## 6. Test Suite & Verification Results

The implementation has been thoroughly tested across both the C++ CLI binary and the HTTP API:

| Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|
| **C++ Bridge Compilation** | Clean build with MinGW64 g++ 4.9.2 | Generated `peer_engine.exe` with 0 warnings/errors | PASS |
| **Mitarth Matchmaking** | Rank 1: Monika Sharma (Score 11) | Monika Sharma (Score 11, Wed & Fri overlap, Online) | PASS |
| **Zero-Match Scenario** | `matchesFound = 0`, graceful empty state | `matchesFound: 0`, explains reciprocal requirement | PASS |
| **Admin Login (Valid)** | `navneet` / `12345678` -> Success | Returns `{ success: true }` | PASS |
| **Admin Login (Invalid)** | Wrong password -> Denied | Returns HTTP 401 with error message | PASS |
| **Student Registration (Valid)** | Registered & appended to active pool | Student profile returned & saved to JSON | PASS |
| **Registration Validation** | User ID 0 or empty fields rejected | Returns HTTP 400 with specific field error | PASS |
| **Vite Client Production Build** | Zero bundling or syntax errors | Built cleanly in 522ms (`dist/` generated) | PASS |
| **End-to-End HTTP Proxy** | `localhost:5173/api/` -> Express port 5000 | Proxied seamlessly with HTTP 200 responses | PASS |

---

## 7. Known Limitations Inherited from Original C++ Code

1. **Sample Pool Size**: Initial sample dataset consists of 12 predefined students (`NUMBER_OF_SAMPLE_STUDENTS = 12`).
2. **Fixed Subject Domain**: 6 predefined subjects (IDs 1 through 6).
3. **Admin Credentials**: Administrator credentials are hardcoded as `navneet` / `12345678` as defined in `peer to peer (1).cpp` line 1034.

---

## 8. Future Roadmap (Post-Hackathon Phase)

The following features from the broader hackathon prompt are intentionally not faked in this version and will be added in Phase 2:
- **Session Planner**: Accept/decline study meeting requests with calendar invites.
- **Shared Workspace**: Document/notes upload and shared markdown notes.
- **Peer Reviews & Badges**: 5-star ratings and gamified completion badges.
- **Direct Messaging**: In-app chat between matched partners.
