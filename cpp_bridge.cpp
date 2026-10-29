#define main original_cli_main
#include "peer to peer (1).cpp"
#undef main

#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <fstream>
#include <cctype>
#include <algorithm>

using namespace std;

// Helper to escape JSON string
string escapeJson(const string& s) {
    ostringstream o;
    for (char c : s) {
        if (c == '"') o << "\\\"";
        else if (c == '\\') o << "\\\\";
        else if (c == '\b') o << "\\b";
        else if (c == '\f') o << "\\f";
        else if (c == '\n') o << "\\n";
        else if (c == '\r') o << "\\r";
        else if (c == '\t') o << "\\t";
        else if (static_cast<unsigned char>(c) < 0x20) {
            o << "\\u00";
            int val = static_cast<unsigned char>(c);
            char hexChars[] = "0123456789abcdef";
            o << hexChars[(val >> 4) & 0x0F] << hexChars[val & 0x0F];
        } else {
            o << c;
        }
    }
    return o.str();
}

string toLowerStr(string s) {
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    return s;
}

// Convert StudentDataType to JSON string
string studentToJson(const StudentDataType& s) {
    ostringstream out;
    out << "{";
    out << "\"userID\":" << s.userID << ",";
    out << "\"name\":\"" << escapeJson(s.name) << "\",";
    out << "\"username\":\"" << escapeJson(s.username) << "\",";
    out << "\"email\":\"" << escapeJson(s.email) << "\",";
    out << "\"phone\":\"" << escapeJson(s.phone) << "\",";
    out << "\"college\":\"" << escapeJson(s.college) << "\",";
    out << "\"branch\":\"" << escapeJson(s.branch) << "\",";
    out << "\"section\":\"" << escapeJson(s.section) << "\",";
    out << "\"sem\":" << s.sem << ",";
    out << "\"studyMode\":\"" << escapeJson(s.studyMode) << "\",";
    out << "\"bio\":\"" << escapeJson(s.bio) << "\",";
    
    // Strong Subjects
    out << "\"strongCount\":" << s.strongCount << ",";
    out << "\"strongSubjects\":[";
    for (int i = 0; i < s.strongCount; i++) {
        int id = s.StrongSubject[i];
        string subName = (id >= 1 && id <= 6) ? subs[id - 1] : "Unknown";
        out << "{\"id\":" << id << ",\"name\":\"" << escapeJson(subName) << "\"}";
        if (i < s.strongCount - 1) out << ",";
    }
    out << "],";

    // Weak Subjects
    out << "\"weakCount\":" << s.weakCount << ",";
    out << "\"weakSubjects\":[";
    for (int i = 0; i < s.weakCount; i++) {
        int id = s.WeakSubject[i];
        string subName = (id >= 1 && id <= 6) ? subs[id - 1] : "Unknown";
        out << "{\"id\":" << id << ",\"name\":\"" << escapeJson(subName) << "\"}";
        if (i < s.weakCount - 1) out << ",";
    }
    out << "],";

    // Available Schedule
    out << "\"availableDayCount\":" << s.availableDayCount << ",";
    out << "\"schedule\":[";
    for (int i = 0; i < s.availableDayCount; i++) {
        out << "{";
        out << "\"day\":\"" << escapeJson(s.AvailableDays[i]) << "\",";
        out << "\"from\":" << s.availableFrom[i] << ",";
        out << "\"till\":" << s.availableTill[i];
        out << "}";
        if (i < s.availableDayCount - 1) out << ",";
    }
    out << "]";

    out << "}";
    return out.str();
}

string userToJson(const User& u) {
    StudentDataType s;
    s.userID = u.userID;
    s.name = u.name;
    s.username = u.username;
    s.email = u.email;
    s.phone = u.phone;
    s.college = u.college.empty() ? "Arya College of Engineering" : u.college;
    s.branch = u.branch;
    s.section = u.section;
    s.sem = u.sem;
    s.bio = u.bio;
    s.studyMode = u.studyMode;
    s.strongCount = u.strongCount;
    for (int i = 0; i < u.strongCount; i++) s.StrongSubject[i] = u.StrongSubject[i];
    s.weakCount = u.weakCount;
    for (int i = 0; i < u.weakCount; i++) s.WeakSubject[i] = u.WeakSubject[i];
    s.availableDayCount = u.availableDayCount;
    for (int i = 0; i < u.availableDayCount; i++) {
        s.AvailableDays[i] = u.availableDays[i];
        s.availableFrom[i] = u.availableFrom[i];
        s.availableTill[i] = u.availableTill[i];
    }
    return studentToJson(s);
}

// JSON parsing helper routines
string getJsonStringField(const string& json, const string& key) {
    string pattern = "\"" + key + "\"";
    size_t pos = json.find(pattern);
    if (pos == string::npos) return "";
    pos = json.find(':', pos);
    if (pos == string::npos) return "";
    pos = json.find('"', pos);
    if (pos == string::npos) return "";
    size_t endPos = json.find('"', pos + 1);
    if (endPos == string::npos) return "";
    return json.substr(pos + 1, endPos - pos - 1);
}

int getJsonIntField(const string& json, const string& key, int defaultVal = 0) {
    string pattern = "\"" + key + "\"";
    size_t pos = json.find(pattern);
    if (pos == string::npos) return defaultVal;
    pos = json.find(':', pos);
    if (pos == string::npos) return defaultVal;
    pos++;
    while (pos < json.size() && (isspace(json[pos]) || json[pos] == '"')) pos++;
    size_t endPos = pos;
    while (endPos < json.size() && (isdigit(json[endPos]) || json[endPos] == '-')) endPos++;
    if (pos == endPos) return defaultVal;
    return atoi(json.substr(pos, endPos - pos).c_str());
}

vector<int> getJsonIntArray(const string& json, const string& key) {
    vector<int> result;
    string pattern = "\"" + key + "\"";
    size_t pos = json.find(pattern);
    if (pos == string::npos) return result;
    pos = json.find('[', pos);
    if (pos == string::npos) return result;
    size_t endPos = json.find(']', pos);
    if (endPos == string::npos) return result;
    
    string arrayStr = json.substr(pos + 1, endPos - pos - 1);
    size_t i = 0;
    while (i < arrayStr.size()) {
        while (i < arrayStr.size() && !isdigit(arrayStr[i]) && arrayStr[i] != '-') i++;
        if (i >= arrayStr.size()) break;
        size_t start = i;
        while (i < arrayStr.size() && (isdigit(arrayStr[i]) || arrayStr[i] == '-')) i++;
        result.push_back(atoi(arrayStr.substr(start, i - start).c_str()));
    }
    return result;
}

struct DaySchedule {
    string day;
    int from;
    int till;
};

vector<DaySchedule> getJsonScheduleArray(const string& json) {
    vector<DaySchedule> sched;
    size_t pos = json.find("\"schedule\"");
    if (pos == string::npos) pos = json.find("\"availableDays\"");
    if (pos == string::npos) return sched;
    pos = json.find('[', pos);
    if (pos == string::npos) return sched;
    size_t endPos = json.find(']', pos);
    if (endPos == string::npos) return sched;

    string content = json.substr(pos + 1, endPos - pos - 1);
    size_t objStart = 0;
    while ((objStart = content.find('{', objStart)) != string::npos) {
        size_t objEnd = content.find('}', objStart);
        if (objEnd == string::npos) break;
        string objStr = content.substr(objStart, objEnd - objStart + 1);
        
        DaySchedule ds;
        ds.from = 0; ds.till = 0;
        // extract day
        size_t dpos = objStr.find("\"day\"");
        if (dpos != string::npos) {
            size_t q1 = objStr.find('"', objStr.find(':', dpos));
            if (q1 != string::npos) {
                size_t q2 = objStr.find('"', q1 + 1);
                if (q2 != string::npos) ds.day = objStr.substr(q1 + 1, q2 - q1 - 1);
            }
        }
        // extract from
        size_t fpos = objStr.find("\"from\"");
        if (fpos != string::npos) {
            size_t cpos = objStr.find(':', fpos);
            if (cpos != string::npos) ds.from = atoi(objStr.substr(cpos + 1).c_str());
        }
        // extract till
        size_t tpos = objStr.find("\"till\"");
        if (tpos != string::npos) {
            size_t cpos = objStr.find(':', tpos);
            if (cpos != string::npos) ds.till = atoi(objStr.substr(cpos + 1).c_str());
        }
        if (!ds.day.empty()) {
            sched.push_back(ds);
        }
        objStart = objEnd + 1;
    }
    return sched;
}

// Convert user JSON to User object
User parseUserFromJson(const string& json) {
    User u;
    u.userID = getJsonIntField(json, "userID", 1001);
    u.name = getJsonStringField(json, "name");
    u.username = getJsonStringField(json, "username");
    u.email = getJsonStringField(json, "email");
    u.phone = getJsonStringField(json, "phone");
    u.college = getJsonStringField(json, "college");
    if (u.college.empty()) u.college = "Arya College of Engineering";
    u.branch = getJsonStringField(json, "branch");
    u.section = getJsonStringField(json, "section");
    u.sem = getJsonIntField(json, "sem", 3);
    u.bio = getJsonStringField(json, "bio");
    u.studyMode = getJsonStringField(json, "studyMode");
    if (u.studyMode.empty()) u.studyMode = "Online";
    if (!u.studyMode.empty()) {
        u.studyMode[0] = toupper(static_cast<unsigned char>(u.studyMode[0]));
        for (size_t i = 1; i < u.studyMode.size(); i++) {
            u.studyMode[i] = tolower(static_cast<unsigned char>(u.studyMode[i]));
        }
    }

    auto strong = getJsonIntArray(json, "StrongSubject");
    if (strong.empty()) strong = getJsonIntArray(json, "strongSubjects");
    u.strongCount = min(static_cast<int>(strong.size()), 5);
    for (int i = 0; i < u.strongCount; i++) u.StrongSubject[i] = strong[i];

    auto weak = getJsonIntArray(json, "WeakSubject");
    if (weak.empty()) weak = getJsonIntArray(json, "weakSubjects");
    u.weakCount = min(static_cast<int>(weak.size()), 5);
    for (int i = 0; i < u.weakCount; i++) u.WeakSubject[i] = weak[i];

    auto sched = getJsonScheduleArray(json);
    u.availableDayCount = min(static_cast<int>(sched.size()), 7);
    for (int i = 0; i < u.availableDayCount; i++) {
        string day = sched[i].day;
        if (!day.empty()) {
            day[0] = toupper(static_cast<unsigned char>(day[0]));
            for (size_t k = 1; k < day.size(); k++) day[k] = tolower(static_cast<unsigned char>(day[k]));
        }
        u.availableDays[i] = day;
        u.availableFrom[i] = sched[i].from;
        u.availableTill[i] = sched[i].till;
    }
    return u;
}

// Read entire file to string
string readFile(const string& path) {
    ifstream in(path.c_str());
    if (!in.is_open()) return "";
    stringstream ss;
    ss << in.rdbuf();
    return ss.str();
}

// Load registered students from local file (if any)
vector<StudentDataType> loadRegisteredStudents() {
    vector<StudentDataType> list;
    string data = readFile("registered_users.json");
    if (data.empty()) return list;

    // Split on object boundaries
    size_t pos = 0;
    while ((pos = data.find('{', pos)) != string::npos) {
        size_t endPos = data.find('}', pos);
        if (endPos == string::npos) break;
        // make sure nested braces like schedule arrays are handled
        int braceDepth = 0;
        size_t cur = pos;
        while (cur < data.size()) {
            if (data[cur] == '{') braceDepth++;
            else if (data[cur] == '}') {
                braceDepth--;
                if (braceDepth == 0) {
                    endPos = cur;
                    break;
                }
            }
            cur++;
        }

        string obj = data.substr(pos, endPos - pos + 1);
        User u = parseUserFromJson(obj);
        if (!u.username.empty()) {
            StudentDataType s;
            s.userID = u.userID;
            s.name = u.name;
            s.username = u.username;
            s.email = u.email;
            s.phone = u.phone;
            s.college = u.college;
            s.branch = u.branch;
            s.section = u.section;
            s.sem = u.sem;
            s.bio = u.bio;
            s.studyMode = u.studyMode;
            s.strongCount = u.strongCount;
            for (int i = 0; i < u.strongCount; i++) s.StrongSubject[i] = u.StrongSubject[i];
            s.weakCount = u.weakCount;
            for (int i = 0; i < u.weakCount; i++) s.WeakSubject[i] = u.WeakSubject[i];
            s.availableDayCount = u.availableDayCount;
            for (int i = 0; i < u.availableDayCount; i++) {
                s.AvailableDays[i] = u.availableDays[i];
                s.availableFrom[i] = u.availableFrom[i];
                s.availableTill[i] = u.availableTill[i];
            }
            list.push_back(s);
        }
        pos = endPos + 1;
    }
    return list;
}

// Save a registered student to file
bool saveRegisteredStudent(const User& u) {
    vector<StudentDataType> existing = loadRegisteredStudents();
    // Check if username already exists
    for (size_t i = 0; i < existing.size(); i++) {
        if (toLowerStr(existing[i].username) == toLowerStr(u.username)) {
            // Update existing
            existing[i].name = u.name;
            existing[i].email = u.email;
            existing[i].phone = u.phone;
            existing[i].college = u.college;
            existing[i].branch = u.branch;
            existing[i].section = u.section;
            existing[i].sem = u.sem;
            existing[i].bio = u.bio;
            existing[i].studyMode = u.studyMode;
            existing[i].strongCount = u.strongCount;
            for (int k = 0; k < u.strongCount; k++) existing[i].StrongSubject[k] = u.StrongSubject[k];
            existing[i].weakCount = u.weakCount;
            for (int k = 0; k < u.weakCount; k++) existing[i].WeakSubject[k] = u.WeakSubject[k];
            existing[i].availableDayCount = u.availableDayCount;
            for (int k = 0; k < u.availableDayCount; k++) {
                existing[i].AvailableDays[k] = u.availableDays[k];
                existing[i].availableFrom[k] = u.availableFrom[k];
                existing[i].availableTill[k] = u.availableTill[k];
            }
            // write all
            ofstream out("registered_users.json");
            out << "[\n";
            for (size_t j = 0; j < existing.size(); j++) {
                out << studentToJson(existing[j]);
                if (j < existing.size() - 1) out << ",\n";
            }
            out << "\n]\n";
            return true;
        }
    }

    // New student
    StudentDataType s;
    s.userID = u.userID;
    s.name = u.name;
    s.username = u.username;
    s.email = u.email;
    s.phone = u.phone;
    s.college = u.college;
    s.branch = u.branch;
    s.section = u.section;
    s.sem = u.sem;
    s.bio = u.bio;
    s.studyMode = u.studyMode;
    s.strongCount = u.strongCount;
    for (int i = 0; i < u.strongCount; i++) s.StrongSubject[i] = u.StrongSubject[i];
    s.weakCount = u.weakCount;
    for (int i = 0; i < u.weakCount; i++) s.WeakSubject[i] = u.WeakSubject[i];
    s.availableDayCount = u.availableDayCount;
    for (int i = 0; i < u.availableDayCount; i++) {
        s.AvailableDays[i] = u.availableDays[i];
        s.availableFrom[i] = u.availableFrom[i];
        s.availableTill[i] = u.availableTill[i];
    }
    existing.push_back(s);

    ofstream out("registered_users.json");
    out << "[\n";
    for (size_t j = 0; j < existing.size(); j++) {
        out << studentToJson(existing[j]);
        if (j < existing.size() - 1) out << ",\n";
    }
    out << "\n]\n";
    return true;
}

// Match execution and JSON formatting
void executeAndPrintMatch(User& user) {
    match m;
    m.matchmaking(user);

    ostringstream out;
    out << "{\n";
    out << "  \"user\": " << userToJson(user) << ",\n";
    out << "  \"matchesFound\": " << m.counter << ",\n";

    // Sort tempScores and tempIDs exactly like C++ showMatches()
    int localScores[NUMBER_OF_SAMPLE_STUDENTS];
    int localIDs[NUMBER_OF_SAMPLE_STUDENTS];
    for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++) {
        localScores[i] = m.sc_array[i];
        localIDs[i] = m.userIDs[i];
    }

    for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS - 1; i++) {
        for (int j = i + 1; j < NUMBER_OF_SAMPLE_STUDENTS; j++) {
            if (localScores[j] > localScores[i]) {
                int t1 = localScores[i];
                localScores[i] = localScores[j];
                localScores[j] = t1;

                int t2 = localIDs[i];
                localIDs[i] = localIDs[j];
                localIDs[j] = t2;
            }
        }
    }

    // Top matches (up to 5)
    out << "  \"topMatches\": [\n";
    int printed = 0;
    for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS && printed < 5; i++) {
        if (localIDs[i] != 0 && localScores[i] > 0) {
            // Find student
            for (int j = 0; j < NUMBER_OF_SAMPLE_STUDENTS; j++) {
                if (m.sampledata.students[j].userID == localIDs[i]) {
                    if (printed > 0) out << ",\n";
                    out << "    {\n";
                    out << "      \"rank\": " << (printed + 1) << ",\n";
                    out << "      \"matchScore\": " << localScores[i] << ",\n";
                    out << "      \"student\": " << studentToJson(m.sampledata.students[j]) << ",\n";
                    
                    // What they can teach user
                    out << "      \"teachMatches\": [";
                    bool firstT = true;
                    for (int tj = 0; tj < m.sampledata.students[j].strongCount; tj++) {
                        for (int tk = 0; tk < user.weakCount; tk++) {
                            if (m.sampledata.students[j].StrongSubject[tj] == user.WeakSubject[tk]) {
                                if (!firstT) out << ",";
                                int subId = m.sampledata.students[j].StrongSubject[tj];
                                out << "{\"id\":" << subId << ",\"name\":\"" << subs[subId - 1] << "\"}";
                                firstT = false;
                            }
                        }
                    }
                    out << "],\n";

                    // What user can teach them
                    out << "      \"learnMatches\": [";
                    bool firstL = true;
                    for (int lj = 0; lj < m.sampledata.students[j].weakCount; lj++) {
                        for (int lk = 0; lk < user.strongCount; lk++) {
                            if (m.sampledata.students[j].WeakSubject[lj] == user.StrongSubject[lk]) {
                                if (!firstL) out << ",";
                                int subId = m.sampledata.students[j].WeakSubject[lj];
                                out << "{\"id\":" << subId << ",\"name\":\"" << subs[subId - 1] << "\"}";
                                firstL = false;
                            }
                        }
                    }
                    out << "],\n";

                    // Common schedule
                    out << "      \"commonSchedule\": [";
                    bool firstS = true;
                    for (int sj = 0; sj < m.sampledata.students[j].availableDayCount; sj++) {
                        for (int sk = 0; sk < user.availableDayCount; sk++) {
                            if (m.sampledata.students[j].AvailableDays[sj] == user.availableDays[sk]) {
                                if (m.sampledata.students[j].availableFrom[sj] < user.availableTill[sk] &&
                                    user.availableFrom[sk] < m.sampledata.students[j].availableTill[sj]) {
                                    if (!firstS) out << ",";
                                    out << "{\"day\":\"" << user.availableDays[sk] << "\","
                                        << "\"yourTime\":\"" << user.availableFrom[sk] << ":00 - " << user.availableTill[sk] << ":00\","
                                        << "\"theirTime\":\"" << m.sampledata.students[j].availableFrom[sj] << ":00 - " << m.sampledata.students[j].availableTill[sj] << ":00\"}";
                                    firstS = false;
                                }
                            }
                        }
                    }
                    out << "],\n";

                    out << "      \"sameStudyMode\": " << (m.sampledata.students[j].studyMode == user.studyMode ? "true" : "false") << "\n";
                    out << "    }";
                    printed++;
                    break;
                }
            }
        }
    }
    out << "\n  ],\n";

    // Best match details
    if (m.counter > 0 && printed > 0) {
        // The top ranked mutual match is localIDs[0]
        int topUserId = localIDs[0];
        int maxIndex = 0;
        int maxScore = localScores[0];
        for (int j = 0; j < NUMBER_OF_SAMPLE_STUDENTS; j++) {
            if (m.sampledata.students[j].userID == topUserId) {
                maxIndex = j;
                break;
            }
        }
        const auto& bestStudent = m.sampledata.students[maxIndex];

        out << "  \"bestMatch\": {\n";
        out << "    \"available\": true,\n";
        out << "    \"matchScore\": " << maxScore << ",\n";
        out << "    \"student\": " << studentToJson(bestStudent) << ",\n";

        // Skill explanation
        out << "    \"skillsTheyCanTeach\": [";
        bool f1 = true;
        for (int i = 0; i < bestStudent.strongCount; i++) {
            for (int j = 0; j < user.weakCount; j++) {
                if (bestStudent.StrongSubject[i] == user.WeakSubject[j]) {
                    if (!f1) out << ",";
                    int subId = bestStudent.StrongSubject[i];
                    out << "{\"id\":" << subId << ",\"name\":\"" << subs[subId - 1] << "\",\"message\":\""
                        << escapeJson(bestStudent.name) << " can teach you " << subs[subId - 1] << "\"}";
                    f1 = false;
                }
            }
        }
        out << "],\n";

        out << "    \"skillsYouCanTeach\": [";
        bool f2 = true;
        for (int i = 0; i < bestStudent.weakCount; i++) {
            for (int j = 0; j < user.strongCount; j++) {
                if (bestStudent.WeakSubject[i] == user.StrongSubject[j]) {
                    if (!f2) out << ",";
                    int subId = bestStudent.WeakSubject[i];
                    out << "{\"id\":" << subId << ",\"name\":\"" << subs[subId - 1] << "\",\"message\":\"You can teach "
                        << subs[subId - 1] << " to " << escapeJson(bestStudent.name) << "\"}";
                    f2 = false;
                }
            }
        }
        out << "],\n";

        // Schedule compatibility
        out << "    \"scheduleCompatibility\": [";
        bool f3 = true;
        for (int i = 0; i < bestStudent.availableDayCount; i++) {
            for (int j = 0; j < user.availableDayCount; j++) {
                if (bestStudent.AvailableDays[i] == user.availableDays[j]) {
                    if (bestStudent.availableFrom[i] < user.availableTill[j] &&
                        user.availableFrom[j] < bestStudent.availableTill[i]) {
                        if (!f3) out << ",";
                        out << "{\"day\":\"" << user.availableDays[j] << "\","
                            << "\"yourTime\":\"" << user.availableFrom[j] << ":00 - " << user.availableTill[j] << ":00\","
                            << "\"theirTime\":\"" << bestStudent.availableFrom[i] << ":00 - " << bestStudent.availableTill[i] << ":00\"}";
                        f3 = false;
                    }
                }
            }
        }
        out << "],\n";

        out << "    \"sameStudyMode\": " << (bestStudent.studyMode == user.studyMode ? "true" : "false") << ",\n";
        out << "    \"studyModeMessage\": \"" << (bestStudent.studyMode == user.studyMode ? ("Same Study Mode: " + user.studyMode) : "Different Study Modes") << "\",\n";
        ostringstream reason;
        reason << "This student received the highest match score of " << maxScore << " based on complementary skills, schedule compatibility and study mode.";
        out << "    \"reason\": \"" << escapeJson(reason.str()) << "\"\n";
        out << "  },\n";
    } else {
        out << "  \"bestMatch\": {\"available\": false, \"message\": \"No matches found based on reciprocal skill matching rules.\"},\n";
    }

    // Complete candidate breakdown
    out << "  \"allCandidates\": [\n";
    for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++) {
        const auto& cand = m.sampledata.students[i];
        bool teachM = false;
        for (int j = 0; j < cand.strongCount; j++) {
            for (int k = 0; k < user.weakCount; k++) {
                if (cand.StrongSubject[j] == user.WeakSubject[k]) teachM = true;
            }
        }
        bool learnM = false;
        for (int j = 0; j < cand.weakCount; j++) {
            for (int k = 0; k < user.strongCount; k++) {
                if (cand.WeakSubject[j] == user.StrongSubject[k]) learnM = true;
            }
        }

        out << "    {\n";
        out << "      \"userID\": " << cand.userID << ",\n";
        out << "      \"name\": \"" << escapeJson(cand.name) << "\",\n";
        out << "      \"username\": \"" << escapeJson(cand.username) << "\",\n";
        out << "      \"rawScore\": " << m.sc_array[i] << ",\n";
        out << "      \"teachMatch\": " << (teachM ? "true" : "false") << ",\n";
        out << "      \"learnMatch\": " << (learnM ? "true" : "false") << ",\n";
        out << "      \"isMutualMatch\": " << (teachM && learnM ? "true" : "false") << ",\n";
        out << "      \"qualifyReason\": \""
            << (teachM && learnM ? "Mutual skill exchange qualified" : (!teachM && !learnM ? "No skill overlap in either direction" : (!teachM ? "Candidate cannot teach any of your learning goals" : "You cannot teach any of candidate's learning goals")))
            << "\"\n";
        out << "    }";
        if (i < NUMBER_OF_SAMPLE_STUDENTS - 1) out << ",";
        out << "\n";
    }
    out << "  ]\n";

    out << "}\n";
    cout << out.str();
}

int main(int argc, char* argv[]) {
    SampleData sampledata;

    if (argc < 2) {
        cout << "{\"error\":\"Missing command. Supported: --subjects, --list-students, --get-student, --match-student, --match-json, --verify-admin, --register\"}" << endl;
        return 1;
    }

    string command = argv[1];

    if (command == "--subjects") {
        cout << "[\n";
        for (int i = 0; i < 6; i++) {
            cout << "  {\"id\":" << (i + 1) << ",\"name\":\"" << subs[i] << "\"}";
            if (i < 5) cout << ",";
            cout << "\n";
        }
        cout << "]\n";
        return 0;
    }

    if (command == "--list-students") {
        vector<StudentDataType> registered = loadRegisteredStudents();
        cout << "[\n";
        // Sample students
        for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++) {
            cout << "  " << studentToJson(sampledata.students[i]);
            if (i < NUMBER_OF_SAMPLE_STUDENTS - 1 || !registered.empty()) cout << ",\n";
            else cout << "\n";
        }
        // Registered students
        for (size_t i = 0; i < registered.size(); i++) {
            cout << "  " << studentToJson(registered[i]);
            if (i < registered.size() - 1) cout << ",\n";
            else cout << "\n";
        }
        cout << "]\n";
        return 0;
    }

    if (command == "--get-student") {
        if (argc < 3) {
            cout << "{\"error\":\"Username required\"}" << endl;
            return 1;
        }
        string targetUser = toLowerStr(argv[2]);
        // Search in sample students
        for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++) {
            if (toLowerStr(sampledata.students[i].username) == targetUser) {
                cout << studentToJson(sampledata.students[i]) << endl;
                return 0;
            }
        }
        // Search in registered students
        vector<StudentDataType> registered = loadRegisteredStudents();
        for (size_t i = 0; i < registered.size(); i++) {
            if (toLowerStr(registered[i].username) == targetUser) {
                cout << studentToJson(registered[i]) << endl;
                return 0;
            }
        }
        cout << "{\"error\":\"Student not found\"}" << endl;
        return 1;
    }

    if (command == "--verify-admin") {
        if (argc < 4) {
            cout << "{\"success\":false,\"error\":\"Username and password required\"}" << endl;
            return 1;
        }
        string u = argv[2];
        string p = argv[3];
        if (toLowerStr(u) == "navneet" && p == "12345678") {
            cout << "{\"success\":true,\"message\":\"Admin login successful\"}" << endl;
            return 0;
        } else {
            cout << "{\"success\":false,\"error\":\"Invalid username or password. Access denied.\"}" << endl;
            return 1;
        }
    }

    if (command == "--match-student") {
        if (argc < 3) {
            cout << "{\"error\":\"Username required\"}" << endl;
            return 1;
        }
        string targetUser = toLowerStr(argv[2]);
        User u;
        bool found = false;

        for (int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++) {
            if (toLowerStr(sampledata.students[i].username) == targetUser) {
                const auto& s = sampledata.students[i];
                u.userID = s.userID;
                u.name = s.name;
                u.username = s.username;
                u.email = s.email;
                u.phone = s.phone;
                u.college = s.college;
                u.branch = s.branch;
                u.section = s.section;
                u.sem = s.sem;
                u.bio = s.bio;
                u.studyMode = s.studyMode;
                u.strongCount = s.strongCount;
                for (int k = 0; k < s.strongCount; k++) u.StrongSubject[k] = s.StrongSubject[k];
                u.weakCount = s.weakCount;
                for (int k = 0; k < s.weakCount; k++) u.WeakSubject[k] = s.WeakSubject[k];
                u.availableDayCount = s.availableDayCount;
                for (int k = 0; k < s.availableDayCount; k++) {
                    u.availableDays[k] = s.AvailableDays[k];
                    u.availableFrom[k] = s.availableFrom[k];
                    u.availableTill[k] = s.availableTill[k];
                }
                found = true;
                break;
            }
        }

        if (!found) {
            vector<StudentDataType> reg = loadRegisteredStudents();
            for (size_t i = 0; i < reg.size(); i++) {
                if (toLowerStr(reg[i].username) == targetUser) {
                    const auto& s = reg[i];
                    u.userID = s.userID;
                    u.name = s.name;
                    u.username = s.username;
                    u.email = s.email;
                    u.phone = s.phone;
                    u.college = s.college;
                    u.branch = s.branch;
                    u.section = s.section;
                    u.sem = s.sem;
                    u.bio = s.bio;
                    u.studyMode = s.studyMode;
                    u.strongCount = s.strongCount;
                    for (int k = 0; k < s.strongCount; k++) u.StrongSubject[k] = s.StrongSubject[k];
                    u.weakCount = s.weakCount;
                    for (int k = 0; k < s.weakCount; k++) u.WeakSubject[k] = s.WeakSubject[k];
                    u.availableDayCount = s.availableDayCount;
                    for (int k = 0; k < s.availableDayCount; k++) {
                        u.availableDays[k] = s.AvailableDays[k];
                        u.availableFrom[k] = s.availableFrom[k];
                        u.availableTill[k] = s.availableTill[k];
                    }
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            cout << "{\"error\":\"Student not found for matchmaking\"}" << endl;
            return 1;
        }

        executeAndPrintMatch(u);
        return 0;
    }

    if (command == "--match-json" || command == "--match-file") {
        string json;
        if (command == "--match-file" && argc >= 3) {
            json = readFile(argv[2]);
        } else if (argc >= 3) {
            json = argv[2];
        } else {
            // Read from stdin
            string line;
            while (getline(cin, line)) json += line + "\n";
        }

        if (json.empty()) {
            cout << "{\"error\":\"Empty payload for match-json\"}" << endl;
            return 1;
        }

        User u = parseUserFromJson(json);
        executeAndPrintMatch(u);
        return 0;
    }

    if (command == "--register") {
        string json;
        if (argc >= 3) {
            json = argv[2];
        } else {
            string line;
            while (getline(cin, line)) json += line + "\n";
        }

        if (json.empty()) {
            cout << "{\"success\":false,\"error\":\"Empty payload for register\"}" << endl;
            return 1;
        }

        User u = parseUserFromJson(json);

        // Validation against C++ logic
        if (u.userID <= 0) {
            cout << "{\"success\":false,\"error\":\"User ID must be a positive integer\"}" << endl;
            return 1;
        }
        if (u.username.empty()) {
            cout << "{\"success\":false,\"error\":\"Username is required\"}" << endl;
            return 1;
        }
        if (u.name.empty()) {
            cout << "{\"success\":false,\"error\":\"Name is required\"}" << endl;
            return 1;
        }
        if (u.strongCount < 1 || u.strongCount > 5) {
            cout << "{\"success\":false,\"error\":\"Strong subjects count must be between 1 and 5\"}" << endl;
            return 1;
        }
        if (u.weakCount < 1 || u.weakCount > 5) {
            cout << "{\"success\":false,\"error\":\"Weak subjects count must be between 1 and 5\"}" << endl;
            return 1;
        }
        if (u.availableDayCount < 1 || u.availableDayCount > 7) {
            cout << "{\"success\":false,\"error\":\"Available days must be between 1 and 7\"}" << endl;
            return 1;
        }

        saveRegisteredStudent(u);
        cout << "{\"success\":true,\"message\":\"Registration Successful\",\"student\":" << userToJson(u) << "}" << endl;
        return 0;
    }

    cout << "{\"error\":\"Unknown command\"}" << endl;
    return 1;
}
