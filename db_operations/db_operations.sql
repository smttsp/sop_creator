
CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "email" varchar(255),
  "password" varchar(255),
  "account_type" int
);

CREATE TABLE "resumes" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "gcp_uri" varchar(255),
  "content" varchar(255),
  "date_added" timestamp,
  "name" varchar(255),
  "hash" varchar(64),
);

CREATE TABLE "job_description" (
  "id" int PRIMARY KEY,
  "gcp_uri" varchar(255),
  "link" varchar(255),
  "content" varchar(255),
  "date_added" timestamp,
  "name" varchar(255),
  "hash" varchar(64),
);


CREATE TABLE "chats" (
  "session_id" int PRIMARY KEY,
  "user_id" int,
  "resume_id" int,
  "jd_id" int,
  "sender" varchar(16), -- # user or assistant
  "timestamp" timestamp,
  "name" varchar(255),
  "message" varchar (8096)
);

CREATE TABLE "cover_letters" (
  "id" int PRIMARY KEY,
  "chat_id" int,
  "content" varchar(255),
  "date" timestamp
);

ALTER TABLE "resumes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "chats" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "chats" ADD FOREIGN KEY ("resume_id") REFERENCES "resumes" ("id");
ALTER TABLE "chats" ADD FOREIGN KEY ("jd_id") REFERENCES "job_description" ("id");

ALTER TABLE "cover_letters" ADD FOREIGN KEY ("chat_id") REFERENCES "chats" ("session_id");
