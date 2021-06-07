CREATE SCHEMA IF NOT EXISTS db DEFAULT CHARACTER SET utf8 ;
USE `db` ;

CREATE TABLE IF NOT EXISTS `users` (
  id_user INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  FirstName VARCHAR(255) not NULL,
  SecondName VARCHAR(255) ,
  Sex tinyint(1) not NULL,
  birth_date date not null,
  lang tinyint(1) not NULL default 1,
  Photo VARCHAR(255),
  subscribe_date datetime,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS addresses (
   id_address int not null auto_increment,
   longitude varchar(100) not null,
   latitude varchar(100) not null,
   wilaya varchar(100) not null,
   commune varchar(100) not null,
   `text` varchar(500) default null,
   PRIMARY KEY (id_address)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS specialities (
  id_speciality INT NOT NULL AUTO_INCREMENT,
  name_ar VARCHAR(100) not null,
  name_fr VARCHAR(100) not null,
  PRIMARY KEY (id_speciality)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doctors` (
   id_doctor INT NOT NULL,
   id_speciality int not null,
   id_address int not null,
   phone varchar(20) not null,
   session_duration int not null,
   PRIMARY KEY (`id_doctor`),
  foreign key (id_doctor) references `users`(id_user),
  foreign key (id_address) references addresses(id_address),
  foreign key (id_speciality) references specialities(id_speciality)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS work_days(
    day_number int not null,
    id_doctor int not null,
    start_time time not null,
    end_time time not null,
    start_time_s2 time,
    end_time_s2 time,
    primary key(id_doctor, day_number),
    foreign key(id_doctor) references doctors(id_doctor)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS rdvs(
    id_doctor int not null,
    id_user int not null,
    date_rdv date not null,
    start_time time not null,
    primary key(id_doctor, id_user, date_rdv),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_user) references users(id_user)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS favorites(
    id_doctor int not null,
    id_user int not null,
    primary key(id_doctor, id_user),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_user) references users(id_user)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS reviews(
    id_doctor int not null,
    id_user int not null,
    review int not null,
    primary key(id_doctor, id_user),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_user) references users(id_user)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS messages(
	id_message int not null auto_increment,
    id_doctor int not null,
    id_user int not null,
    primary key(id_message),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_user) references users(id_user)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS chats(
    id_doctor int not null,
    id_user int not null,
    doctor_last_seen_message int default null,
    user_last_seen_message int default null,
    primary key(id_doctor, id_user),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_user) references users(id_user)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS gallery(
    id_doctor int not null,
    image_src varchar(300) not null,
    foreign key(id_doctor) references doctors(id_doctor)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
