

CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  account_type INT
);


-- CREATE TABLE resumes (
--   id INT PRIMARY KEY,
--   content VARCHAR(255),
--   user_id INT,
--   date_added DATETIME,
--   name VARCHAR(255),
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );


