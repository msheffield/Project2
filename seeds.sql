-- Account data
INSERT INTO Accounts(role, username,password,email,createdAt,updatedAt) 
VALUES(1, "jane123", "1234567890", "jane@gmail.com", now(), now());
INSERT INTO Accounts(role, username,password,email,createdAt,updatedAt) 
VALUES(2, "bob456", "1234567890", "bob@gmail.com", now(), now());
INSERT INTO Accounts(role, username,password,email,createdAt,updatedAt) 
VALUES(2, "lily123", "1234567890", "lily@gmail.com", now(), now());
INSERT INTO Accounts(role, username,password,email,createdAt,updatedAt) 
VALUES(2, "tom123", "1234567890", "tom@gmail.com", now(), now());
INSERT INTO Accounts(role, username,password,email,createdAt,updatedAt) 
VALUES(2, "john123", "1234567890", "john@gmail.com", now(), now());

-- Tutor data
INSERT INTO Tutors(firstName, lastName, phoneNumber, location, skillLevel, description, grade, photo, createdAt, updatedAt, AccountId) 
VALUES("Bob", "Smith", "2061111111", "Seattle", 3, "I love teaching math", 3, "https://image.cnbcfm.com/api/v1/image/101353308-151371271.jpg?v=1569002271&w=1400&h=950", now(), now(), 2);

INSERT INTO Tutors(firstName, lastName, phoneNumber, location, skillLevel, description, grade, photo, createdAt, updatedAt, AccountId) 
VALUES("Lily", "Brown", "2061143111", "Kirkland", 7, "I like music", 4, "https://fivmagazine.com/wp-content/uploads/2018/10/portrait-frau-mann-fotografie-grundlagen-portraitfotografie.jpg", now(), now(), 3);

INSERT INTO Tutors(firstName, lastName, phoneNumber, location, skillLevel, description, grade, photo, createdAt, updatedAt, AccountId) 
VALUES("Tom", "Wood", "2061111145", "Renton", 2, "I have nothing to say", 2, "https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg", now(), now(), 4);

INSERT INTO Tutors(firstName, lastName, phoneNumber, location, skillLevel, description, grade, photo, createdAt, updatedAt, AccountId) 
VALUES("John", "Ellen", "2061231111", "Seattle", 9, "I have nothing to say", 1, "https://www.biography.com/.image/t_share/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg", now(), now(), 5);

-- Map tutor to subject
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(1, 1, now(), now());
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(1, 2, now(), now());
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(2, 6, now(), now());
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(2, 3, now(), now());
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(3, 5, now(), now());
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(4, 7, now(), now());
INSERT INTO TutorSubjects(tutorId, subjectId, createdAt, updatedAt) VALUES(4, 4, now(), now());