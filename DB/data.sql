use db;

insert into users
	(email, password, phone, firstname, lastname, sex, birth_date, lang, photo, subscribe_date, type) VALUES
    ('aymen', '123', '0784483160', 'Aymen', 'ghemam', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 1),
    ('youcef', '123', '0784483160', 'Youcef', 'hamaidi', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 1),
    ('younes', '123', '0784483160', 'younes', 'bourennane', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 1),
    ('toufik', '123', '0784483160', 'toufik', 'ali bey', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 2);

insert into patients(id_patient) values (4);
    
insert into addresses(longitude, latitude, wilaya, commune) values
    ('50', '50', 'alger', 'bab ezzouar');
    
insert into specialities(speciality_name) values
    ('generaliste'),
    ('dentiste');
    
insert into doctors(id_doctor, id_speciality, id_address, work_phone, session_duration, isApprouved, description) values
	(1, 1, 1, '0555555555', 30, 1, 'this is the description...'),
    (2, 2, 1, '0555555555', 45, 1, 'this is the description...'),
    (3, 2, 1, '0555555555', 45, 1, 'this is the description...');
    
insert into work_days(day_number, id_doctor, start_time, nbr_sessions) values
	(1, 1, '08:00:00', 8),
    (2, 1, '08:00:00', 8),
    (3, 1, '08:00:00', 8),
    (4, 1, '08:00:00', 8),
    
    (1, 2, '08:00:00', 4),
    (2, 2, '08:00:00', 4),
    (3, 2, '08:00:00', 4),
    (4, 2, '08:00:00', 4),
    
    (1, 3, '08:00:00', 4),
    (2, 3, '08:00:00', 4),
    (3, 3, '08:00:00', 4),
    (4, 3, '08:00:00', 4);
    
    
    
insert into rdvs(id_doctor, id_patient, time_rdv, state) values
    (1, 4, '2021-06-20 13:00:00', 0);
    
insert into physical_rdvs(id_doctor, time_rdv) values
    (1, '2021-06-20 15:00:00');
    




    

