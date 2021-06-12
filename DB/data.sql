use db;

insert into users
	(email, password, phone, firstname, secondname, sex, birth_date, lang, photo, subscribe_date, type) VALUES
    ('aymen', '123', '0784483160', 'aymen', 'aymen', 1, now(), 1, '', now(), 1),
    ('toufik', '123', '0784483160', 'toufik', 'toufik', 1, now(), 1, '', now(), 2);

--     
-- insert into addresses(longitude, latitude, address) values
--     ('50', '50', 'bab ezzouar alger');
--     
-- insert into specialities(nom) values
--     ('generaliste'),
--     ('dentiste');
--     
-- insert into doctors(id_doctor, id_speciality, id_address, phone, session_duration) values
-- 	(2, 1, 1, '0555555555', 45);
--     
-- insert into work_days(day_number, id_doctor, start_time, end_time) values
-- 	(1, 2, '08:00:00', '12:00:00'),
--     (2, 2, '08:00:00', '12:00:00'),
--     (3, 2, '08:00:00', '12:00:00'),
--     (4, 2, '08:00:00', '12:00:00');
--     
--     
-- insert into rdvs(id_doctor, id_user, date_rdv, start_time) values
-- 	(2, 1, '2021/06/06', '08:00:00');


--     

