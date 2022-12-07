DROP TABLE IF EXISTS followers_and_following;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	nickname VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	email varchar(255),
	totalMessages int,
	totalFollowers int,
	totalFollowing int,
	avatarPhoto varchar(255),
	headerPhoto varchar(255),
	location varchar(255),
	website varchar(255),
	birthday date
);

CREATE TABLE posts (
	post_id SERIAL PRIMARY KEY NOT NULL,
	user_id SERIAL REFERENCES users (id) NOT NULL,
	content varchar(255) NOT NULL,
	attachment varchar(255),
	likes int,
	reposts int,
	replies int,
	postDate date
);

CREATE TABLE followers_and_following (
	user_id SERIAL PRIMARY KEY REFERENCES users (id) NOT NULL,
	following_id SERIAL REFERENCES users (id) NOT NULL
);

INSERT INTO users (name, nickname, description, email)
VALUES 
('Nikita', 'icykit', 'Fullstack Developer', 'icykitdesign@gmail.com'),
('Ivan', 'itoldstopthecar', 'Car lover', 'itold@gmail.com');

INSERT INTO posts (user_id, content)
VALUES (1, 'I love Development'), (2, 'I love Cars'), (1, 'Is SQL easy?');

SELECT nickname, content 
FROM users 
INNER JOIN posts ON 
id = user_id;
