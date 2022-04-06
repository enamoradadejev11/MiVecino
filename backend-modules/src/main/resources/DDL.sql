CREATE TABLE mi_vecino.user (
	id serial PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(200) UNIQUE NOT NULL,
	password VARCHAR(20) NOT NULL,
	join_date TIMESTAMP NOT NULL,
	roles jsonb NOT NULL,
	authorities jsonb,
	profile_image_url VARCHAR(250),
	last_login_date TIMESTAMP
);