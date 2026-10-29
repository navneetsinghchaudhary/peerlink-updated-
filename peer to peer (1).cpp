#include <iostream>
#include <cctype>
#include <algorithm>
#include <string>
using namespace std;
const int NUMBER_OF_SAMPLE_STUDENTS = 12;
const string subs[30] = {"DSA","OOPs","Video Editing","UI Design","Database","Web Development"};

// admin = _navneet_singh
//DSA             1
//OOPs            2
//Video Editing   3
//UI Design       4
//Database        5
//Web Development 6

// Existing data
class StudentDataType{
public:
    int userID;
    string name;
    string username;
    string email;
    string phone;
    string college;
    string branch;
    string section;
    int sem;
    string bio;
    int StrongSubject[10];
    int WeakSubject[10];
    int availableDayCount;
    string AvailableDays[7];
    int availableFrom[7];
    int availableTill[7];
    int strongCount;
    int weakCount;
    string studyMode;
};
class SampleData {
public:
    StudentDataType students[80];

    SampleData() {

        students[0].userID = 101;
        students[0].name = "Mitarth Pathak";
        students[0].username = "_mitarth";
        students[0].email = "mpathak6207@gmail.com";
        students[0].phone = "9587507407";
        students[0].college = "Arya College of Engineering";
        students[0].branch = "CSE";
        students[0].section = "A";
        students[0].sem = 3;
        students[0].studyMode = "Online";
        students[0].bio = "Loves competitive programming.";
        students[0].StrongSubject[0] = 1;   // DSA
        students[0].StrongSubject[1] = 2;   // OOPs
        students[0].strongCount = 2;
        students[0].WeakSubject[0] = 3;    // Video Editing
        students[0].WeakSubject[1] = 6;    // Web Development
        students[0].weakCount = 2;
        students[0].availableDayCount = 3;
        students[0].AvailableDays[0] = "Monday";
        students[0].availableFrom[0] = 18;
        students[0].availableTill[0] = 20;
        students[0].AvailableDays[1] = "Wednesday";
        students[0].availableFrom[1] = 18;
        students[0].availableTill[1] = 20;
        students[0].AvailableDays[2] = "Friday";
        students[0].availableFrom[2] = 18;
        students[0].availableTill[2] = 20;










        students[1].userID = 102;
        students[1].name = "Navneet Singh";
        students[1].username = "_navneet_singh";
        students[1].email = "navneetsingh@gmail.com";
        students[1].phone = "8394950344";
        students[1].college = "Arya College of Engineering";
        students[1].branch = "CSE";
        students[1].section = "B";
        students[1].sem = 3;
        students[1].studyMode = "Offline";
        students[1].bio = "Interested in game development.";
        students[1].StrongSubject[0] = 3;   // Video Editing
        students[1].StrongSubject[1] = 4;   // UI Design
        students[1].strongCount = 2;
        students[1].WeakSubject[0] = 2;    // OOPs
        students[1].WeakSubject[1] = 5;    // Database
        students[1].weakCount = 2;
        students[1].availableDayCount = 3;
        students[1].AvailableDays[0] = "Tuesday";
        students[1].availableFrom[0] = 17;
        students[1].availableTill[0] = 20;
        students[1].AvailableDays[1] = "Thursday";
        students[1].availableFrom[1] = 17;
        students[1].availableTill[1] = 20;
        students[1].AvailableDays[2] = "Saturday";
        students[1].availableFrom[2] = 18;
        students[1].availableTill[2] = 21;





        students[2].userID = 103;
        students[2].name = "Nooren Qureshi";
        students[2].username = "nooren_03";
        students[2].email = "nooren.qureshi@gmail.com";
        students[2].phone = "9202124284";
        students[2].college = "Arya College of Engineering";
        students[2].branch = "CSE";
        students[2].section = "C";
        students[2].sem = 3;
        students[2].studyMode = "Online";
        students[2].bio = "Preparing for coding contests.";
        students[2].StrongSubject[0] = 5;   // Database
        students[2].StrongSubject[1] = 6;   // Web Development
        students[2].strongCount = 2;
        students[2].WeakSubject[0] = 1;    // DSA
        students[2].WeakSubject[1] = 4;    // UI Design
        students[2].weakCount = 2;
        students[2].availableDayCount = 3;
        students[2].AvailableDays[0] = "Monday";
        students[2].availableFrom[0] = 19;
        students[2].availableTill[0] = 21;
        students[2].AvailableDays[1] = "Tuesday";
        students[2].availableFrom[1] = 19;
        students[2].availableTill[1] = 21;
        students[2].AvailableDays[2] = "Friday";
        students[2].availableFrom[2] = 19;
        students[2].availableTill[2] = 21;






        students[3].userID = 104;
        students[3].name = "Pallavi Jain";
        students[3].username = "pallavi_11";
        students[3].email = "pallavi.jain@gmail.com";
        students[3].phone = "9001504008";
        students[3].college = "Arya College of Engineering";
        students[3].branch = "CSE";
        students[3].section = "A";
        students[3].sem = 3;
        students[3].studyMode = "Offline";
        students[3].bio = "Preparing for DSA.";
        students[3].StrongSubject[0] = 1;   // DSA
        students[3].StrongSubject[1] = 4;   // UI Design
        students[3].strongCount = 2;
        students[3].WeakSubject[0] = 2;    // OOPs
        students[3].WeakSubject[1] = 6;    // Web Development
        students[3].weakCount = 2;
        students[3].availableDayCount = 3;
        students[3].AvailableDays[0] = "Monday";
        students[3].availableFrom[0] = 19;
        students[3].availableTill[0] = 21;
        students[3].AvailableDays[1] = "Wednesday";
        students[3].availableFrom[1] = 18;
        students[3].availableTill[1] = 21;
        students[3].AvailableDays[2] = "Friday";
        students[3].availableFrom[2] = 19;
        students[3].availableTill[2] = 21;







        students[4].userID = 105;
        students[4].name = "Naina Sharma";
        students[4].username = "itz_nain01";
        students[4].email = "sharma.nain@gmail.com";
        students[4].phone = "9561504008";
        students[4].college = "Arya College of Engineering";
        students[4].branch = "CSE";
        students[4].section = "A";
        students[4].sem = 3;
        students[4].studyMode = "Online";
        students[4].bio = "Interested in software development.";
        students[4].StrongSubject[0] = 2;   // OOPs
        students[4].StrongSubject[1] = 5;   // Database
        students[4].strongCount = 2;
        students[4].WeakSubject[0] = 3;    // Video Editing
        students[4].WeakSubject[1] = 4;    // UI Design
        students[4].weakCount = 2;
        students[4].availableDayCount = 3;
        students[4].AvailableDays[0] = "Friday";
        students[4].availableFrom[0] = 14;
        students[4].availableTill[0] = 17;
        students[4].AvailableDays[1] = "Saturday";
        students[4].availableFrom[1] = 18;
        students[4].availableTill[1] = 21;
        students[4].AvailableDays[2] = "Sunday";
        students[4].availableFrom[2] = 14;
        students[4].availableTill[2] = 20;



        students[5].userID = 106;
        students[5].name = "Monika Sharma";
        students[5].username = "_monika_41";
        students[5].email = "monika.456@gmail.com";
        students[5].phone = "950405608";
        students[5].college = "Arya College of Engineering";
        students[5].branch = "CSE";
        students[5].section = "A";
        students[5].sem = 3;
        students[5].studyMode = "Online";
        students[5].bio = "Preparing for OOPs and mathematics.";
        students[5].StrongSubject[0] = 3;   // Video Editing
        students[5].StrongSubject[1] = 6;   // Web Development
        students[5].strongCount = 2;
        students[5].WeakSubject[0] = 1;    // DSA
        students[5].WeakSubject[1] = 2;    // OOPs
        students[5].weakCount = 2;
        students[5].availableDayCount = 3;
        students[5].AvailableDays[0] = "Wednesday";
        students[5].availableFrom[0] = 13;
        students[5].availableTill[0] = 20;
        students[5].AvailableDays[1] = "Thursday";
        students[5].availableFrom[1] = 18;
        students[5].availableTill[1] = 21;
        students[5].AvailableDays[2] = "Friday";
        students[5].availableFrom[2] = 17;
        students[5].availableTill[2] = 20;




        students[6].userID = 107;
        students[6].name = "Mohit Yadav";
        students[6].username = "_mohit.yadav";
        students[6].email = "mohit9956@gmail.com";
        students[6].phone = "9877980088";
        students[6].college = "Arya College of Engineering";
        students[6].branch = "CSE";
        students[6].section = "B";
        students[6].sem = 3;
        students[6].studyMode = "Offline";
        students[6].bio = "Interested in networking and technology.";
        students[6].StrongSubject[0] = 4;   // UI Design
        students[6].StrongSubject[1] = 5;   // Database
        students[6].strongCount = 2;
        students[6].WeakSubject[0] = 3;    // Video Editing
        students[6].WeakSubject[1] = 6;    // Web Development
        students[6].weakCount = 2;
        students[6].availableDayCount = 3;
        students[6].AvailableDays[0] = "Friday";
        students[6].availableFrom[0] = 19;
        students[6].availableTill[0] = 21;
        students[6].AvailableDays[1] = "Thursday";
        students[6].availableFrom[1] = 13;
        students[6].availableTill[1] = 21;
        students[6].AvailableDays[2] = "Wednesday";
        students[6].availableFrom[2] = 17;
        students[6].availableTill[2] = 23;




        students[7].userID = 108;
        students[7].name = "Nitish Kumar Sharma";
        students[7].username = "_nitish_41";
        students[7].email = "nitish.6@gmail.com";
        students[7].phone = "9505605658";
        students[7].college = "Arya College of Engineering";
        students[7].branch = "CSE";
        students[7].section = "D";
        students[7].sem = 3;
        students[7].studyMode = "Offline";
        students[7].bio = "Preparing for mathematics and TC.";
        students[7].StrongSubject[0] = 1;   // DSA
        students[7].StrongSubject[1] = 6;   // Web Development
        students[7].strongCount = 2;
        students[7].WeakSubject[0] = 2;    // OOPs
        students[7].WeakSubject[1] = 5;    // Database
        students[7].weakCount = 2;
        students[7].availableDayCount = 3;
        students[7].AvailableDays[0] = "Thursday";
        students[7].availableFrom[0] = 19;
        students[7].availableTill[0] = 21;
        students[7].AvailableDays[1] = "Wednesday";
        students[7].availableFrom[1] = 13;
        students[7].availableTill[1] = 19;
        students[7].AvailableDays[2] = "Friday";
        students[7].availableFrom[2] = 16;
        students[7].availableTill[2] = 20;

        // Additional sample users
        students[8].userID = 109;
        students[8].name = "Aarav Mehta";
        students[8].username = "aarav_09";
        students[8].email = "aarav.mehta@example.com";
        students[8].phone = "9000000109";
        students[8].college = "Arya College of Engineering";
        students[8].branch = "CSE";
        students[8].section = "A";
        students[8].sem = 3;
        students[8].studyMode = "Online";
        students[8].bio = "Interested in web development and databases.";
        students[8].StrongSubject[0] = 6;   // Web Development
        students[8].StrongSubject[1] = 5;   // Database
        students[8].strongCount = 2;
        students[8].WeakSubject[0] = 1;    // DSA
        students[8].WeakSubject[1] = 2;    // OOPs
        students[8].weakCount = 2;
        students[8].availableDayCount = 3;
        students[8].AvailableDays[0] = "Monday";
        students[8].availableFrom[0] = 18;
        students[8].availableTill[0] = 21;
        students[8].AvailableDays[1] = "Wednesday";
        students[8].availableFrom[1] = 18;
        students[8].availableTill[1] = 21;
        students[8].AvailableDays[2] = "Friday";
        students[8].availableFrom[2] = 18;
        students[8].availableTill[2] = 21;

        students[9].userID = 110;
        students[9].name = "Diya Sharma";
        students[9].username = "diya_10";
        students[9].email = "diya.sharma@example.com";
        students[9].phone = "9000000110";
        students[9].college = "Arya College of Engineering";
        students[9].branch = "CSE";
        students[9].section = "B";
        students[9].sem = 3;
        students[9].studyMode = "Offline";
        students[9].bio = "Practising DSA and object-oriented programming.";
        students[9].StrongSubject[0] = 1;   // DSA
        students[9].StrongSubject[1] = 2;   // OOPs
        students[9].strongCount = 2;
        students[9].WeakSubject[0] = 5;    // Database
        students[9].WeakSubject[1] = 6;    // Web Development
        students[9].weakCount = 2;
        students[9].availableDayCount = 3;
        students[9].AvailableDays[0] = "Tuesday";
        students[9].availableFrom[0] = 17;
        students[9].availableTill[0] = 20;
        students[9].AvailableDays[1] = "Thursday";
        students[9].availableFrom[1] = 17;
        students[9].availableTill[1] = 20;
        students[9].AvailableDays[2] = "Saturday";
        students[9].availableFrom[2] = 17;
        students[9].availableTill[2] = 20;

        students[10].userID = 111;
        students[10].name = "Kabir Joshi";
        students[10].username = "kabir_11";
        students[10].email = "kabir.joshi@example.com";
        students[10].phone = "9000000111";
        students[10].college = "Arya College of Engineering";
        students[10].branch = "CSE";
        students[10].section = "C";
        students[10].sem = 3;
        students[10].studyMode = "Online";
        students[10].bio = "Learning UI design and video editing.";
        students[10].StrongSubject[0] = 4;   // UI Design
        students[10].StrongSubject[1] = 3;   // Video Editing
        students[10].strongCount = 2;
        students[10].WeakSubject[0] = 5;    // Database
        students[10].WeakSubject[1] = 6;    // Web Development
        students[10].weakCount = 2;
        students[10].availableDayCount = 3;
        students[10].AvailableDays[0] = "Monday";
        students[10].availableFrom[0] = 18;
        students[10].availableTill[0] = 21;
        students[10].AvailableDays[1] = "Tuesday";
        students[10].availableFrom[1] = 18;
        students[10].availableTill[1] = 21;
        students[10].AvailableDays[2] = "Thursday";
        students[10].availableFrom[2] = 18;
        students[10].availableTill[2] = 21;

        students[11].userID = 112;
        students[11].name = "Ishita Verma";
        students[11].username = "ishita_12";
        students[11].email = "ishita.verma@example.com";
        students[11].phone = "9000000112";
        students[11].college = "Arya College of Engineering";
        students[11].branch = "CSE";
        students[11].section = "D";
        students[11].sem = 3;
        students[11].studyMode = "Offline";
        students[11].bio = "Building projects and improving programming skills.";
        students[11].StrongSubject[0] = 5;   // Database
        students[11].StrongSubject[1] = 6;   // Web Development
        students[11].strongCount = 2;
        students[11].WeakSubject[0] = 3;    // Video Editing
        students[11].WeakSubject[1] = 4;    // UI Design
        students[11].weakCount = 2;
        students[11].availableDayCount = 3;
        students[11].AvailableDays[0] = "Wednesday";
        students[11].availableFrom[0] = 17;
        students[11].availableTill[0] = 20;
        students[11].AvailableDays[1] = "Thursday";
        students[11].availableFrom[1] = 17;
        students[11].availableTill[1] = 20;
        students[11].AvailableDays[2] = "Saturday";
        students[11].availableFrom[2] = 18;
        students[11].availableTill[2] = 21;
    }

    void showData(string username){
        for(int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++){
            if(students[i].username == username){
                cout<<"\n\n==========User Profile==========";
                cout<<"\nUser Id : "<<students[i].userID<<endl;
                cout<<"Name : "<<students[i].name<<endl;
                cout<<"User Name : "<<students[i].username<<endl;
                cout<<"\nEmail Id : "<<students[i].email<<endl;
                cout<<"Phone Number : "<<students[i].phone<<endl;
                cout<<"\nCollege Name : "<<students[i].college<<endl;
                cout<<"Branch: "<<students[i].branch<<endl;
                cout<<"Section : "<<students[i].section<<endl;
                cout<<"Semester : "<<students[i].sem<<endl;
                cout<<"\nSkills you teach : "<<endl;
                for(int j = 0; j < students[i].strongCount; j++){
                    cout<<students[i].StrongSubject[j];
                    if(j != students[i].strongCount - 1){
                        cout<<" , ";
                    }
                }
                cout<<"\nSkills wants to learn : "<<endl;
                for(int j = 0; j < students[i].weakCount; j++){
                    cout<<students[i].WeakSubject[j];
                    if(j != students[i].weakCount - 1){
                        cout<<" , ";
                    }
                }
                cout<<"\nAvailable Schedule : "<<endl;
                for(int j = 0; j < students[i].availableDayCount; j++){
                    cout<<students[i].AvailableDays[j]
                        <<" : "
                        <<students[i].availableFrom[j]
                        <<" - "
                        <<students[i].availableTill[j]
                        <<endl;
                }
                cout<<"\n=================================="<<endl;
            }
        }
    }
};


// User registration
class User{
public:
    int userID;
    string name;
    string username;
    string email;
    string phone;
    string college;
    string branch;
    string section;
    int sem;
    string bio;
    int StrongSubject[10];
    int WeakSubject[10];
    int availableDayCount;
    string availableDays[7];
    int availableFrom[7];
    int availableTill[7];
    int strongCount;
    int weakCount;
    string studyMode;

public:
	SampleData sd;
    void registerUser();
    void displayUser();
    int getInteger();
};

int User :: getInteger(){
 	int value;
    while (true)
    {
        try
        {
            cin >> value;
            if (cin.fail())
            {
                cin.clear();
                cin.ignore(1000, '\n');
                throw "Invalid input!";
            }

            return value;
        }
        catch (const char* error)
        {
            cout << error << " please enter an integer: ";
        }
    }	
}

void User :: registerUser(){
    cout<<"\n=========User Registration==========\n";
    cout<<"User Id(in INTEGER) : ";
    userID=getInteger();
    
    cout<<"\nUsername : ";
    cin>>username;
    cout<<"\nName : ";
    cin.ignore();
	getline(cin, name);
    cout << "\nBio : ";
    cin.ignore();
    getline(cin, bio);
    cout<<"\nMobile No. : ";
    cin>>phone;
    cin.ignore();
    cout<<"\nBranch : ";
    getline(cin,branch);
    cout<<"\nSection : ";
    cin>>section;
    cout<<"\nSemester : ";
    sem = getInteger();
    cout << "\nSubjects are:"<<endl;
    cout << "Press 1 for DSA\nPress 2 for OOPs\nPress 3 for Video Editing\nPress 4 for UI Design\nPress 5 for Database\nPress 6 for Web Development\n"<<endl;
    cout << "\n\nTotal Number of Strong Subjects (Max 5): ";
    cin >> strongCount;
    while(strongCount < 1 || strongCount > 5)
    {
        cout << "Please enter a value between 1 and 5: ";
        strongCount = getInteger();
    }
    cin.ignore();
    for(int i = 0; i < strongCount; i++)
    {
        cout << "Strong Subject " << i+1 << " : ";
        cin>>StrongSubject[i];
    }
    cout << "\nTotal Number of Weak Subjects (Max 5): ";
    cin >> weakCount;
    while(weakCount < 1 || weakCount > 5)
    {
        cout << "Please enter a value between 1 and 5: ";
        weakCount = getInteger();
    }
    cin.ignore();
    for(int i = 0; i < weakCount; i++)
    {
        cout << "Weak Subject " << i+1 << " : ";
        cin >> WeakSubject[i];
    }
    cout << "\nHow many days are you available (Max 7): ";
    cin >> availableDayCount;
    while(availableDayCount < 1 || availableDayCount > 7)
    {
        cout << "Please enter a value between 1 and 7: ";
        availableDayCount = getInteger();
    }
    cin.ignore();
    for(int i = 0; i < availableDayCount; i++)
    {
        cout << "\nAvailable Day (Example: Monday, Tuesday, etc.)" << i+1 << " : ";
        getline(cin, availableDays[i]);
        transform(availableDays[i].begin(), availableDays[i].end(), availableDays[i].begin(), ::tolower);
        if(!availableDays[i].empty()){
            availableDays[i][0] = static_cast<char>(toupper(static_cast<unsigned char>(availableDays[i][0])));
        }
        cout << "Available From (24-hour): ";
        cin >> availableFrom[i];
        cout << "Available Till (24-hour): ";
        cin >> availableTill[i];
        cin.ignore();
    }
    cout << "\nStudy Mode (Online/Offline): ";
    cin >> studyMode;
    transform(studyMode.begin(), studyMode.end(), studyMode.begin(), ::tolower);
    if(!studyMode.empty()){
        studyMode[0] = static_cast<char>(toupper(static_cast<unsigned char>(studyMode[0])));
    }
    
    

    sd.students[8].userID = userID;
    sd.students[8].name = name;
    sd.students[8].username = username;
    sd.students[8].email = email;
    sd.students[8].phone = phone;
    sd.students[8].college = college;
    sd.students[8].branch = branch;
    sd.students[8].section = section;
    sd.students[8].sem = sem;
    sd.students[8].bio = bio;

    sd.students[8].strongCount = strongCount;
    sd.students[8].weakCount = weakCount;

    for(int i = 0; i < strongCount; i++)
    {
        sd.students[8].StrongSubject[i] = StrongSubject[i];
    }

    for(int i = 0; i < weakCount; i++)
    {
        sd.students[8].WeakSubject[i] = WeakSubject[i];
    }

    sd.students[8].availableDayCount = availableDayCount;

    for(int i = 0; i < availableDayCount; i++)
    {
        sd.students[8].AvailableDays[i] = availableDays[i];
        sd.students[8].availableFrom[i] = availableFrom[i];
        sd.students[8].availableTill[i] = availableTill[i];
    }

    sd.students[8].studyMode = studyMode;
    cout << "\n========== Registration Successful ==========\n\n";
}
void User :: displayUser(){
    cout<<"\n\n==========User Profile==========";
    cout<<"\nUser Id : "<<userID<<endl;
    cout<<"\nUsername : "<<username<<endl;
    cout<<"\nName : "<<name<<endl;
    cout << "Bio : " << bio << endl;
    cout<<"\nPhone Number : "<<phone<<endl;
    cout<<"Branch: "<<branch<<endl;
    cout<<"Section : "<<section<<endl;
    cout<<"Semester : "<<sem<<endl;
    cout << "\nStrong Subjects : ";
    for(int i = 0; i < strongCount; i++)
    {
        cout << StrongSubject[i];
        if(i != strongCount - 1)
        {
            cout << " , ";
        }
    }
    cout << "\nWeak Subjects : ";
    for(int i = 0; i < weakCount; i++)
    {
        cout << WeakSubject[i];
        if(i != weakCount - 1)
        {
            cout << " , ";
        }
    }
    cout << "\n\nAvailable Schedule :\n";
    for(int i = 0; i < availableDayCount; i++){
        cout << availableDays[i]
             << " : "
             << availableFrom[i]
             << " - "
             << availableTill[i]
             << endl;
    }
    cout << "Study Mode : " << studyMode << endl;
}


//the matchmaking(MAGIC WORK)
class match{
	public:
		SampleData sampledata;
		int sc_array[50],userIDs[50];
		int counter=0;
		int maxScore=0,maxIndex=0,temp =0;
		int tempScores[NUMBER_OF_SAMPLE_STUDENTS];
    	int tempIDs[NUMBER_OF_SAMPLE_STUDENTS];
    	int teachMatch,learnMatch;
	void matchmaking(User &user){
		counter = 0;
		maxScore = 0;
		maxIndex = 0;
		temp = 0;
		for(int i = 0; i < 5; i++) {
			userIDs[i] = 0;
			sc_array[i] = 0;//0,1,2,3,4
		}
		
		for (int i=0;i<NUMBER_OF_SAMPLE_STUDENTS;i++){
			int c=0;
			teachMatch=0;
			learnMatch=0;
			//for checking strong with weak
			for(int j = 0; j < sampledata.students[i].strongCount; j++){
			    for(int k = 0; k < user.weakCount; k++){
			        if(sampledata.students[i].StrongSubject[j] == user.WeakSubject[k]){
			            c++;
			            teachMatch = 1;
			        }
			    }
			}
			//for checking weak with strong
			for(int j = 0; j < sampledata.students[i].weakCount; j++){
			    for(int k = 0; k < user.strongCount; k++){
			        if(sampledata.students[i].WeakSubject[j] == user.StrongSubject[k]){
			            c++;
			            learnMatch = 1;
			        }
			    }
			}
			//for comparing the available days
			for(int j = 0; j < sampledata.students[i].availableDayCount; j++){
    			for(int k = 0; k < user.availableDayCount; k++){
	    		    if(sampledata.students[i].AvailableDays[j] == user.availableDays[k]){
			            // comparing time
	    		        if(sampledata.students[i].availableFrom[j] < user.availableTill[k] && user.availableFrom[k] < sampledata.students[i].availableTill[j]){
	           			    c++;
	            		}
	        		}
	    		}
			}
			//for comparing the studyMode
			if(sampledata.students[i].studyMode == user.studyMode){
			    c++;
			}
			sc_array[i]=c;
			
			//matched users ke userID ka data
			if (teachMatch&&learnMatch){
				userIDs[i] = sampledata.students[i].userID;
				counter++;
			}
		}
		for(int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS; i++){
		    tempScores[i] = sc_array[i];
		    tempIDs[i] = userIDs[i];
		}
	}
		//now printing the best match
		void showMatches(){
			if (counter>0){
			cout << "congratulations!!!! \nMatches Found: "<<counter<<endl;
 		   
 		   

	    for(int i = 0; i < NUMBER_OF_SAMPLE_STUDENTS - 1; i++){
	
	        for(int j = i + 1;j < NUMBER_OF_SAMPLE_STUDENTS;j++){
	
	            if(tempScores[j] > tempScores[i]){
	
	                int temp = tempScores[i];
	                tempScores[i] = tempScores[j];
	                tempScores[j] = temp;
	
	                temp = tempIDs[i];
	                tempIDs[i] = tempIDs[j];
	                tempIDs[j] = temp;
	            }
	        }
	    }
    // PRINT ONLY TOP 5
        int printed = 0;

        cout << "\n========== TOP MATCHES ==========\n";

        for(int i = 0;i < NUMBER_OF_SAMPLE_STUDENTS && printed < 5;i++){

            // Only actual matched users
            if(tempIDs[i] != 0 && tempScores[i] > 0){

                // Find student using User ID
                for(int j = 0;j < NUMBER_OF_SAMPLE_STUDENTS;j++){

                    if(sampledata.students[j].userID == tempIDs[i]){

                        cout << "\n-------------------------------------------\n";
                        cout << "Rank : " << printed + 1 << endl;
                        cout << "Name : " << sampledata.students[j].name << endl;
                        cout << "Branch : " << sampledata.students[j].branch << endl;
                        cout << "Phone : " << sampledata.students[j].phone << endl;
                        cout << "Email : " << sampledata.students[j].email << endl;
                        cout << "Match Score : " << tempScores[i] << endl;

                        printed++;
                        break;
                    }
                }
                cout << "\n-------------------------------------------\n";

            }
        }
			for (int i=0;i<NUMBER_OF_SAMPLE_STUDENTS;i++){
				if (sc_array[i]>temp){
					maxScore = sc_array[i];
					maxIndex = i;
					temp = sc_array[i];
				}
			}
		
		}
		else {
			cout << "Sorry!! No matches found.....\n\n"<<endl;
		}
		}
		//isse matched deatils print hongi
		void showMatchedDetails(User &user){
		    if(counter == 0){
		        cout << "\nNo best match details available.\n";
		        return;
		    }
		
		    cout << "\n===========================================\n";
		    cout << "          WHY THIS IS THE BEST MATCH\n";
		    cout << "===========================================\n";
		
		    cout << "\nBest Match: "
		         << sampledata.students[maxIndex].name << endl;
		
		    cout << "Match Score: " << maxScore << endl;
			
			cout << "The strong Subjects are: ";
			for (int ii=0;ii<sampledata.students[maxIndex].strongCount;ii++){
				cout << subs[sampledata.students[maxIndex].StrongSubject[ii]-1] << " ";
			}
			cout << endl;
			cout << "The weak Subjects are: ";
			for (int ii=0;ii<sampledata.students[maxIndex].weakCount;ii++){
				cout << subs[sampledata.students[maxIndex].WeakSubject[ii]-1] << " ";
			}
			cout << endl;
		    // 1. Skill matching details
		    cout << "\n--- SKILL COMPATIBILITY ---\n";
		
		    bool skillFound = false;
		
		    // Best match's strong subject == user's weak subject
		    for(int i = 0; i < sampledata.students[maxIndex].strongCount; i++){
		        for(int j = 0; j < user.weakCount; j++){
		
		            if(sampledata.students[maxIndex].StrongSubject[i]
		               == user.WeakSubject[j]){
						string s;
						int subject = sampledata.students[maxIndex].StrongSubject[i];
						s = subs[subject - 1];
		                cout << "  "
		                     << sampledata.students[maxIndex].name
		                     << " can teach you "
		                     << s
		                     << endl;
		
		                skillFound = true;
		            }
		        }
		    }
		
		    // Best match's weak subject == user's strong subject
		    for(int i = 0; i < sampledata.students[maxIndex].weakCount; i++){
		        for(int j = 0; j < user.strongCount; j++){
		
		            if(sampledata.students[maxIndex].WeakSubject[i]
		               == user.StrongSubject[j]){
						string s;
						int subject = sampledata.students[maxIndex].WeakSubject[i];
						s = subs[subject - 1];
		                cout << "  You can teach "
		                     << s
		                     << " to "
		                     << sampledata.students[maxIndex].name
		                     << endl;
		
		                skillFound = true;
		            }
		        }
		    }
		
		    if(!skillFound){
		        cout << "No skill compatibility found.\n";
		    }
		
		
		    // 2. Schedule matching details
		    cout << "\n--- SCHEDULE COMPATIBILITY ---\n";
		
		    bool scheduleFound = false;
		
		    for(int i = 0; i < sampledata.students[maxIndex].availableDayCount; i++){
		        for(int j = 0; j < user.availableDayCount; j++){
		
		            if(sampledata.students[maxIndex].AvailableDays[i]
		               == user.availableDays[j]){
		
		                if(sampledata.students[maxIndex].availableFrom[i]
		                   < user.availableTill[j]
		                   &&
		                   user.availableFrom[j]
		                   < sampledata.students[maxIndex].availableTill[i]){
		
		                    cout << "  Common Day: "
		                         << user.availableDays[j] << endl;
		
		                    cout << "  Your Time: "
		                         << user.availableFrom[j]
		                         << " - "
		                         << user.availableTill[j]
		                         << endl;
		
		                    cout << "  Their Time: "
		                         << sampledata.students[maxIndex].availableFrom[i]
		                         << " - "
		                         << sampledata.students[maxIndex].availableTill[i]
		                         << endl;
		
		                    scheduleFound = true;
		                }
		            }
		        }
		    }
		
		    if(!scheduleFound){
		        cout << "No common schedule found.\n";
		    }
		
		
		    // 3. Study mode
		    cout << "\n--- STUDY MODE ---\n";
		
		    if(sampledata.students[maxIndex].studyMode == user.studyMode){
		
		        cout << " Same Study Mode: "
		             << user.studyMode << endl;
		
		    }
		    else{
		
		        cout << " Different Study Modes\n";
		    }
		
		
		    // Final reason
		    cout << "\n===========================================\n";
		    cout << "REASON FOR BEST MATCH:\n";
		
		    cout << "This student received the highest match score of "
		         << maxScore
		         << " based on complementary skills, "
		            "schedule compatibility and study mode.\n";
		
		    cout << "===========================================\n";
		}
		
};

int main(){

    User user;
    SampleData sampledata;
	match m;

    cout << "====================================================================="<<endl;
    cout << "                               PEER-TO-PEER                             "<<endl;
    cout << "                    (Peer-to-Peer Skill-Based Study Partner Matching)             "<<endl;
    cout << "=====================================================================\n\n\n"<<endl;

    while(true){
        int ch;
        string username;
		cout << "==========================================="<<endl;
		cout << "                 MAIN-MENU                 "<<endl;
		cout << "==========================================="<<endl;
        cout << "1. User Registeration"<<endl;
        cout << "2. Display data of Existing Users"<<endl;
        cout << "3. Exit"<<endl;
        cout << "Choice :";
        ch = user.getInteger();
        if(ch == 1){
			while (true){								
				    cout << "==========================================="<<endl;
				    cout << "                 USER-PANEL                "<<endl;
				    cout << "==========================================="<<endl;
					int ch1;
			        cout << "\t1. Registeration"<<endl;
			        cout << "\t2. Log-Out"<<endl;
			        cout << "Choice :";
			        ch1 = user.getInteger();
			        if(ch1==1){
			        	user.registerUser();
			        		while (true){								
							    cout << "==========================================="<<endl;
							    cout << "                 USER-MENU                 "<<endl;
							    cout << "==========================================="<<endl;
								int ch11;
						        cout << "\t1. FIND THE MATCH" <<endl;
						        cout << "\t2. Your Profile"<<endl;
						        cout << "\t3. Exit"<<endl;
						        cout << "Choice :";
						        ch11 = user.getInteger();
								if(ch11==1){
									m.matchmaking(user);
									m.showMatches();
									m.showMatchedDetails(user);
								}
								else if(ch11==2){
						        	user.displayUser();
								}
								else if(ch11==3){
			     				   	cout << "Logging out ...\n\n";
            						break;
								}
								else{
									cout << "Please enter from the given options..\n\n\n"<<endl;
								}
								}
					}
					else if(ch1==2){
			        	cout << "Logging out ...\n\n";
            			break;
					}
					else{
						cout << "Please enter from the given options..\n\n\n"<<endl;
					}
			}
        }
        else if(ch == 2){
            cout << "Enter the existing user's username to view data:"<<endl;
            cin >> username;
            transform(username.begin(), username.end(), username.begin(), ::tolower);
            sampledata.showData(username);
        }
        else if(ch == 3){
            cout << "Exiting ...";
            break;
        }
        else {
            cout << "Please enter from the given options..\n\n\n"<<endl;
        }
    }
}
