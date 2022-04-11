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