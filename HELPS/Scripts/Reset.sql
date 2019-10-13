delete
from "Advisors";
delete
from "EmailVariable";
delete
from "Emails";
delete
from "Messages";
delete
from "Rooms";
delete
from "Sessions";
delete
from "Students";
delete
from "Users";
delete
from "Workshops";
delete
from "Skills";

insert into "Advisors" ("Id", "Email", "FirstName", "LastName", "IsActive")
values (1, 'S.Smith@uts.edu.au', 'Steve', 'Smith', true),
       (2, 'J.Smith@uts.edu.au', 'Jane', 'Smith', true);

insert into "Emails" ("Id", "Title", "Content")
values (1, 'Confirmation Email',
        '<p>Dear [%student_givenname%] [%student_surname%],</p><p>Please note that your class at: [%campus%] has been <strong>confirmed</strong>.&nbsp;</p><p>Thanks</p>');

insert into "EmailVariable" ("Id", "Name", "Variable", "Example", "EmailId")
values (1, 'Student Given Name', '[%student_givenname%]', 'Steve', 1),
       (2, 'Student Surname', '[%student_surname%]', 'Smith', 1),
       (3, 'Campus', '[%campus%]', 'Ultimo', 1);

insert into "Messages" ("Id", "Title", "Content")
values (1, 'loginNotification', ''),
       (2, 'eventNotification', ''),
       (3, 'informationCollection',
        '<p>The collected information (after removing any of your personal details) may also be used to:</p><ul><li>analyse demographics of HELPS students and the use of HELPS programs in order to find better ways to assist you; and/or,&nbsp;&nbsp;</li><li>&nbsp;report to the University community on how HELPS programs are utilised&nbsp;&nbsp;&nbsp;</li></ul><p>&nbsp;Please be advised that any information you provide:&nbsp;&nbsp;</p><ul><li>&nbsp;will be kept in the system for the purposes outlined above; and&nbsp;&nbsp;</li><li>&nbsp;will not be disclosed unless required or permitted by law.&nbsp;&nbsp;</li></ul>'),
       (4, 'programs',
        '<p>&nbsp;</p><h2>Drop-in consultations&nbsp;</h2><p>&nbsp;At the initial stage of your assignment writing or preparation process, you are strongly encouraged to come and see HELPS. The best time to see us is when you first receive your assignment.&nbsp;</p><p>&nbsp;<strong>HELPS Advisors can help edit your assignment WITH you, not FOR you</strong> - helping you to edit for:&nbsp;&nbsp;</p><ul><li>&nbsp;Structure and argument – that your writing is logically organised with well-developed and well-supported arguments.&nbsp;</li><li>&nbsp;Style and expression – that your choice of vocabulary is appropriate, sentences are well constructed, ideas are clearly introduced, and paragraphs are fully developed.&nbsp;</li><li>&nbsp;Grammar – that your issues are identified and explained so you can learn from your mistakes and avoid making them in the future.&nbsp;&nbsp;</li></ul><p>&nbsp;Proofreading is the final step in the editing process, with the aim of producing an error-free assignment. It is <strong>your</strong> responsibility to check for mistakes in spelling, punctuation, typing and formatting in your assignment before you submit it to your lecturer.&nbsp;</p><p>&nbsp;We offer 15-minute drop-in advice sessions and 40-minute one-to-one consultations by referral to help you with your assignment writing and preparation.&nbsp;</p><h3>Drop-in consultations are held during:&nbsp;&nbsp;</h3><ul><li>&nbsp;</li></ul><h4>2019 Autumn session (from week 2 to week 12)&nbsp;</h4><ul><li>&nbsp;</li></ul><h4><em>Not offered on Public Holidays.</em>&nbsp;</h4><p>&nbsp;&nbsp;</p><ul><li>&nbsp;HELPS office (CB01.05.25)&nbsp;</li></ul><p>Monday to Thursday: 12noon - 6pm / Friday: 12noon - 5pm&nbsp;&nbsp;</p><ul><li>&nbsp;UTS Blake Library (Study Help Desk)&nbsp;&nbsp;</li></ul><p>Monday to Thursday: 2pm - 7pm / Saturday: 1pm - 4pm&nbsp;</p><ul><li>&nbsp;Pop-up drop-ins: Bld 10 foyer (Pod1)&nbsp;</li></ul><p>Monday to Thursday: 10am - 1pm&nbsp;</p><ul><li>&nbsp;Pop-up drop-ins: Bld 11 Level 5 (FEIT Learning Precinct CB11.05.300)&nbsp;</li></ul><p>Tuesday and Thursday: 1pm - 4pm&nbsp;&nbsp;&nbsp;</p><p>&nbsp;At the drop-in advice session we can, if you need it, book you in for a longer <a href=\"https://www.uts.edu.au/current-students/support/helps/assignment-writing-assistance/one-one-consultation-referral\" target=\"_self\">one-to-one consultation </a>closer to the due date for when you have your draft ready.&nbsp;</p><h2>Individual assistance by referral&nbsp;</h2><p>&nbsp;After you have attended a <a href=\"https://www.uts.edu.au/current-students/support/helps/assignment-writing-assistance\" target=\"_self\">drop-in advice </a>session; if a longer consultation is required you may be able to book in for a 40-minute one-to-one consultation.&nbsp;</p><p>&nbsp;Having a one-to-one consultation is an opportunity for an in-depth discussion in relation to your specific needs on an assessment.&nbsp;</p><p>A 40-minute one-to-one consultation may involve:&nbsp;</p><ul><li>&nbsp;discussing your draft to ensure that you have addressed the assessment criteria&nbsp;</li><li>&nbsp;addressing a number of grammar or referencing issues that require assistance&nbsp;</li><li>&nbsp;preparing for an oral presentation.&nbsp;&nbsp;</li></ul><h2>Daily workshops&nbsp;&nbsp;</h2><ul><li>&nbsp;<a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops/assignment-writing-series\" target=\"_self\">Improve Your Writing Series</a></li><li>&nbsp;<a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops/improve-your-speaking\" target=\"_self\">Improve Your Speaking Series</a></li><li>&nbsp;<a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops/improve-your-grammar\" target=\"_self\">Improve Your Grammar Series</a></li><li>&nbsp;<a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops/2018-19-summer-special-workshops\" target=\"_self\">Summer Special Workshops</a></li><li>&nbsp;<a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops/orientation-workshops\" target=\"_self\">Orientation Workshops</a>&nbsp;</li></ul><p>&nbsp;You will need to register for these workshops as places are limited. To <strong><em>register</em></strong>, click on the <strong>workshop registration tab </strong>and follow the instructions. If you wish your cancel your registration, please do so online or contact us via email. Failing to turn up for your registered workshops are not fair to those on the waiting lists. Repeat offenders may be barred from attending workshops for the rest of the semester.&nbsp;</p><h2>Writing Support sessions&nbsp;</h2><h3><strong>WriteNow! Writing support sessions @ the Library</strong>&nbsp;&nbsp;</h3><ul><li>&nbsp;The sessions run<strong> 1:00 pm to 5:00 pm every Friday from Week 2 to Week 12</strong>.&nbsp;</li><li>&nbsp;They are held in a training room at the UTS Library where we also provide desktop computers.&nbsp;</li><li>&nbsp;You will need to <a href=\"https://helps-booking.uts.edu.au/\" target=\"_self\">register </a>for these sessions as places are limited.&nbsp;&nbsp;</li></ul><h3><strong>WriteNow! Writing support sessions @ HELPS</strong>&nbsp;&nbsp;</h3><ul><li>&nbsp;The sessions run<strong> 1:00 pm to 4:00 pm Monday to Thursday from Week 2 to Week 12</strong>.&nbsp;</li><li>&nbsp;They are held in the HELPS office (CB01.05.25)&nbsp;</li><li>&nbsp;Please remember to bring your laptop as there are no desktop computers in this room.&nbsp;</li><li>&nbsp;Online registration is not required.&nbsp;&nbsp;</li></ul><h2>Intensive academic English program&nbsp;</h2><h2>Academic Writing Program&nbsp;</h2><p>&nbsp;<em>You can choose from a Day or Evening class</em>&nbsp;</p><ul><li>9 July to 13 July 2018 (daily)&nbsp;</li><li>Day class (13:00 - 16:00) <em>or </em>Evening class (18:00 - 20:00)&nbsp;&nbsp;</li></ul><h2>&nbsp;Academic Speaking Program&nbsp;</h2><p>&nbsp;<em>You can choose from either a Pronunciation or Seminar presentation class</em>.</p><h3>Pronunciation Correction&nbsp;&nbsp;</h3><ul><li>&nbsp;16 July to 20 July 2018 (daily)&nbsp;</li><li>13:00 - 16:00&nbsp;&nbsp;</li></ul><h3>Seminar Presentation&nbsp;&nbsp;</h3><ul><li>&nbsp;16 July to 20 July 2018 (daily)&nbsp;</li><li>&nbsp;Day class (14:00 - 16:00) <em>or </em>Evening class (18:00 - 20:00)&nbsp;&nbsp;</li></ul><h2>&nbsp;Communication for Employment Program&nbsp;&nbsp;</h2><ul><li>&nbsp;9 July to 13 July 2018 10:00 - 12:00 (daily)&nbsp;</li><li>&nbsp;16 July to 20 July 2018 10:00 - 12:00 (daily)&nbsp;&nbsp;</li></ul><p>Applications will be available in May and June 2018 at <a href=\"http://www.helps.uts.edu.au\" target=\"_blank\">www.helps.uts.edu.au</a>&nbsp;</p><h2>Self-help resources for essential academic skills&nbsp;</h2><p>click <a href=\"http://www.uts.edu.au/current-students/support/helps/self-help-resources\" target=\"_blank\">here </a>to acces the resources</p><p>&nbsp;</p>'),
       (5, 'FAQ',
        '<p>&nbsp;</p><h3><a href=\"http://localhost:3000/\" target=\"_self\">About the HELPS programs</a>!</h3><h6><a href=\"http://localhost:3000/\" target=\"_self\">Who can use HELPS?</a>&nbsp;</h6><ul><li>Any student enrolled in any faculty at UTS&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">Where is HELPS?</a>&nbsp;</h6><ul><li>HELPS is located on Building 1, Level 5 , room 25&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">How much does it cost?</a>&nbsp;</h6><ul><li>Services are free of tuition fees for non-credit workshops and individual consultations.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">Can you help me with my assignment?</a>&nbsp;</h6><ul><li>Yes. HELPS offers various workshops and individual consultations. For more information, check out our <a href=\"http://www.ssu.uts.edu.au/helps/index.html\" target=\"_self\">website</a>.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">Can you proofread and correct my assignment?</a>&nbsp;</h6><ul><li>No. Our role is not to correct grammar or other errors in an assignment. We can help you develop your own editing strategies. You should also use a computer spell-check, find a competent friend and a good dictionary.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">Can you help me with the content of my assignment?</a>&nbsp;</h6><ul><li>No. We can’t tell you what to say, we can only help you say it better and more clearly. While we’re happy to act as a sounding board for your ideas, content questions require the specialised disciplinary knowledge of lecturers and tutors in your faculty. You should take specific content questions directly to them.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">My lecturer says I need to improve my grammar. Can you help me?</a>&nbsp;</h6><ul><li>Yes. Please check our website for information on our <a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops\" target=\"_self\">workshops </a>and  <a href=\"https://www.uts.edu.au/current-students/support/helps/self-help-resources\" target=\"_self\">Learning resources</a>.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">Can you help me with my pronunciation?</a>&nbsp;</h6><ul><li>Yes. Please check our website for information on our <a href=\"https://www.uts.edu.au/current-students/support/helps/english-speaking-practice\" target=\"_self\">English speaking programs</a>, <a href=\"https://www.uts.edu.au/current-students/support/helps/daily-workshops\" target=\"_self\">workshops </a>and  <a href=\"https://www.uts.edu.au/current-students/support/helps/self-help-resources\" target=\"_self\">Learning resources</a>.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">Can I practise my seminar presentation with someone?</a>&nbsp;</h6><ul><li>Yes. You can attend our workshops or drop in for an individual consultation session.&nbsp;&nbsp;</li></ul><h3><a href=\"http://localhost:3000/\" target=\"_self\">About the Special Conditions in Exams</a>&nbsp;</h3><h6>&nbsp;<a href=\"http://localhost:3000/\" target=\"_self\">I am not a native English speaker and I feel that I need more time in exams. Can you help? </a>&nbsp;</h6><ul><li>Maybe. You might be eligible to apply for Special Conditions in Exams.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">I''m a second/third year student. Can I get Special Conditions in my exams?</a>&nbsp;</h6><ul><li>No. Only first year (1st/2nd semester) students are eligible to apply.&nbsp;</li></ul><h6><a href=\"http://localhost:3000/\" target=\"_self\">What is the deadline to apply for the Special Conditions?</a>&nbsp;</h6><ul><li>The application closes on the Census date. Click on<a href=\"https://www.uts.edu.au/current-students/support/helps/special-conditions-exams-students-non-english-speaking-backgrounds\" target=\"_self\"> Special Conditions in Exams</a> for more information.&nbsp;&nbsp;</li></ul><h6>If you have a question which has not been answered above, please email us: HELPS@uts.edu.au&nbsp;</h6>');

insert into "Rooms" ("Id", "Title")
values (1, 'CB01.02.403'),
       (2, 'CB11.08.101');

insert into "Students" ("Id", "Name", "RegisteredDate", "PrefFirstName", "Faculty", "Course",
                        "Email", "HomePhone", "MobileNumber", "BestContactNumber", "DOB", "Gender",
                        "Degree", "Year", "Status", "FirstLanguage", "CountryOfOrigin",
                        "EducationalBackground", "HasCompletedCAF", "IsSpecialNeeds", "Other")
values (1, 'Steve Smith', current_date, 'Steve', 'Engineering', 'Software', 'S.Smith@uts.edu.au',
        0400123456, 43445555, 0400123456, current_date,
        'Male', 'Engineering', 3, true, 'English', 'Australia', 'TAFE', true, false, ''),
       (2, 'Amy Doe', current_date, 'Amy', 'Engineering', 'Software', 'A.Doe@uts.edu.au',
        0400123456, 43445555, 0400123456, current_date,
        'Male', 'Engineering', 3, true, 'English', 'Australia', 'None', true, false, '');

insert into "Users" ("Id", "Username", "Password", "isAdmin", "Token")
values (1, 'Steve', 'password', false, null),
       (3, 'Campbell', 'password', true, null);

insert into "Skills" ("Id", "Title")
values (1, 'Essay Writing');

ALTER SEQUENCE "Advisors_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Emails_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Messages_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Rooms_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Sessions_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Skills_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Students_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Users_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "Workshops_Id_seq" RESTART WITH 10;
ALTER SEQUENCE "EmailVariable_Id_seq" RESTART WITH 10;