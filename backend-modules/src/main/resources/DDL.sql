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


--- PROD

CREATE SCHEMA mi_vecino

CREATE TABLE mi_vecino."user" (
	id serial NOT NULL,
	user_id varchar(50) NOT NULL,
	username varchar(100) NOT NULL,
	full_name varchar(200) NOT NULL,
	email varchar(200) NOT NULL,
	"password" varchar(200) NOT NULL,
	gender varchar(10) NULL,
	birth_date timestamp NOT NULL,
	join_date timestamp NOT NULL,
	"role" varchar(20) NOT NULL,
	authorities jsonb NULL,
	profile_image_url varchar(250) NULL,
	last_login_date timestamp NULL,
	last_login_date_display timestamp NULL,
	is_active bool NULL,
	is_not_locked bool NULL,
	favorite_emprendimientos jsonb NULL,
	emprendimientos_categories jsonb NULL
);

CREATE SEQUENCE hibernate_sequence START 1;


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
	active boolean not null,
	latitude Decimal(8,6),
	longitude Decimal(9,6)
)

create table mi_vecino.review (
	id serial primary key,
	emprendimiento_id int not null,
	username varchar(100) not null,
	score float not null,
	comment varchar(250),
	images_url jsonb
)

ALTER TABLE mi_vecino."user"
  ADD favorite_emprendimientos jsonb;


ALTER TABLE mi_vecino."user"
  add emprendimientos_categories jsonb;

ALTER TABLE mi_vecino."user" ALTER COLUMN gender TYPE VARCHAR(10);

CREATE TABLE user_authorities (
	user_id int8 NOT NULL,
	authorities varchar(255) NULL
);

CREATE TABLE public.user_roles (
	user_id int8 NOT NULL,
	roles varchar(255) NULL
);

