delete
from "Advisors";
delete
from "Emails";
delete
from "EmailVariable";
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

insert into "Advisors" ("Id", "Email", "FirstName", "LastName", "IsActive")
values (0, 'S.Smith@uts.edu.au', 'Steve', 'Smith', true),
       (1, 'J.Smith@uts.edu.au', 'Jane', 'Smith', true);

insert into "Emails" ("Id", "Title", "Content")
values (0, 'Booking notification', '');

insert into "EmailVariable" ("Id", "Variable", "Example", "EmailId")
values (0, '[%student_name%]', 'Steve Smith', 0),
       (1, '[%advisor_name%]', 'Steve Smith', 0),
       (2, '[%room%]', 'CB01.01.100', 0);

insert into "Messages" ("Id", "Title", "Content")
values (1, 'loginNotification', ''),
       (2, 'eventNotification', ''),
       (3, 'informationCollection', ''),
       (4, 'programs', ''),
       (5, 'FAQ', '');

insert into "Rooms" ("Id", "Title")
values (0, 'CB01.02.403'),
       (1, 'CB11.08.101');

-- insert into "Sessions" ("Id", "Starttime", "Duration", "RoomId", "AdvisorId", "AdvisorName",
--                         "StudentId", "Type")
-- values ();

insert into "Students" ("Id", "Name", "RegisteredDate", "PrefFirstName", "Faculty", "Course",
                        "Email", "HomePhone", "MobileNumber", "BestContactNumber", "DOB", "Gender",
                        "Degree", "Year", "Status", "FirstLanguage", "CountryOfOrigin",
                        "EducationalBackground", "HasCompletedCAF", "IsSpecialNeeds", "Other")
values (0,'Steve Smith', current_date, 'Steve', 'Engineering', 'Software', 'S.Smith@uts.edu.au',
        0400123456, 43445555, 0400123456, current_date,
        'Male', 'Engineering', 3, true, 'English', 'Australia', 'TAFE', true, false, ''),
       (1,'Amy Doe', current_date, 'Amy', 'Engineering', 'Software', 'A.Doe@uts.edu.au',
        0400123456, 43445555, 0400123456, current_date,
        'Male', 'Engineering', 3, true, 'English', 'Australia', 'None', true, false, '');

insert into "Users" ("Id", "Username", "Password", "isAdmin", "Token")
values (0, 'Steve', 'password', false, null),
       (2, 'Campbell', 'password', true, null);

-- insert into "Workshops" ("Id", "Title", "Time", "Duration", "RoomId", "TargetGroup", "Description",
--                          "AvailablePlaces", "AdvisorId", "StudentIds")
-- values ();