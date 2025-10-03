-- Baza za kviz aplikaciju
CREATE DATABASE IF NOT EXISTS kviz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kviz;

-- Tabela korisnici
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  subscription TINYINT(1) NOT NULL DEFAULT 0,
  api_token VARCHAR(64) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Predmeti / kategorije
CREATE TABLE subjects (
  subject_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pitanja
CREATE TABLE questions (
  question_id INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT NOT NULL,
  question_text TEXT NOT NULL,
  explanation TEXT DEFAULT NULL,
  created_by INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Odgovori za pitanja
CREATE TABLE answers (
  answer_id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

-- Rezultati (istorija odgovora)
CREATE TABLE results (
  result_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  question_id INT NOT NULL,
  selected_answer_id INT DEFAULT NULL,
  correct TINYINT(1) DEFAULT 0,
  taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
  FOREIGN KEY (selected_answer_id) REFERENCES answers(answer_id) ON DELETE SET NULL
);

-- Indeksi (po potrebi)
CREATE INDEX idx_questions_subject ON questions(subject_id);
CREATE INDEX idx_answers_question ON answers(question_id);
