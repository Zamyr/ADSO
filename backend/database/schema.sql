CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_username ON profiles(username);
CREATE INDEX idx_email ON profiles(email);

INSERT INTO profiles (username, email, bio) VALUES
  ('johndoe', 'john@example.com', 'Software engineer passionate about web development'),
  ('janedoe', 'jane@example.com', 'Product designer with 5 years of experience'),
  ('techguru', 'tech@example.com', 'Full-stack developer and open source contributor'),
  ('datawhiz', 'data@example.com', 'Data scientist specializing in machine learning');
