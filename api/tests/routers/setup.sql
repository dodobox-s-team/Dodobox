-- Note: you should not use id 1 to prevent primary key unique violation

-- devices --
INSERT INTO devices VALUES (11, null, 'prise salon', 'esp32', 0, '192.168.1.9', true);

-- groups --
INSERT INTO groups VALUES (11, 'salon');
INSERT INTO devices VALUES (12, 11, 'Lampe', '', 1, '192.168.1.5', true);

-- timetables --
INSERT INTO timetables VALUES (11, 'off', timestamp '1999-01-08 04:05:06', interval '5 minutes', interval '1 week');
