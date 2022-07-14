CREATE TABLE mi_vecino.user (
	id serial PRIMARY KEY,
	user_id VARCHAR(50) not null,
	username VARCHAR(100) not null,
	full_name VARCHAR(200) not null,
	email VARCHAR(200) not null,
	password VARCHAR(200) not null,
	gender VARCHAR(1),
	birth_date TIMESTAMP not null,
	join_date TIMESTAMP not null,
	role VARCHAR(20) not null,
	authorities jsonb,
	profile_image_url VARCHAR(250),
	last_login_date TIMESTAMP,
	last_login_date_display TIMESTAMP,
	is_active boolean,
	is_not_loked boolean,
);

create table mi_vecino.emprendimiento (
	id serial primary key,
	username VARCHAR(100) not null,
	name VARCHAR(120) not null,
	description VARCHAR(250) not null,
	type VARCHAR(50) not null,
	join_date TIMESTAMP not null,
	image_url VARCHAR(250),
	telephones jsonb,
	categories jsonb,
	active boolean not null
)

create table mi_vecino.day (
	id int primary key,
	name varchar(10) not null
)

create table mi_vecino.schedule (
	id varchar(20) primary key,
	emprendimiento_id int not null,
	day_id int not null,
	opening_hour TIME not null,
	closing_hour TIME not null,
	CONSTRAINT fk_emprendimiento
      FOREIGN KEY(emprendimiento_id)
	  REFERENCES mi_vecino.emprendimiento(id),
	CONSTRAINT fk_day
      FOREIGN KEY(day_id)
	  REFERENCES mi_vecino.day(id)
)

create table mi_vecino.review (
	id serial primary key,
	emprendimiento_id int not null,
	username varchar(100) not null,
	score int not null,
	comment varchar(250),
	images_url jsonb,
	CONSTRAINT fk_emprendimiento
      FOREIGN KEY(emprendimiento_id)
	  REFERENCES mi_vecino.emprendimiento(id)
)

ALTER TABLE mi_vecino."user" ALTER COLUMN gender TYPE VARCHAR(10);