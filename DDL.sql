-- Creación de la base de datos si no existe
CREATE DATABASE IF NOT EXISTS MASTER_TEST;

-- Utilizar la base de datos MASTER_TEST
USE MASTER_TEST;

-- Inicio de la transacción
BEGIN;

    CREATE TABLE users (
        user_id INT PRIMARY KEY,
        nombre VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        contraseña VARCHAR(255)
    );

    CREATE TABLE authors (
        author_id INT PRIMARY KEY,
        nombre VARCHAR(255)
    );

    CREATE TABLE collaborators (
        collaborator_id INT PRIMARY KEY,
        nombre VARCHAR(255)
    );

    CREATE TABLE videos (
        video_id INT PRIMARY KEY,
        titulo VARCHAR(255),
        descripcion TEXT,
        url VARCHAR(255),
        author_id INT,
        FOREIGN KEY (author_id) REFERENCES authors(author_id)
    );

    CREATE TABLE comments (
        comment_id INT PRIMARY KEY,
        contenido TEXT,
        user_id INT,
        video_id INT,
        fecha TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (video_id) REFERENCES videos(video_id)
    );

    CREATE TABLE reviews (
        review_id INT PRIMARY KEY,
        puntuacion INT,
        comentario TEXT,
        user_id INT,
        video_id INT,
        fecha TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (video_id) REFERENCES videos(video_id)
    );

    CREATE TABLE categories (
        category_id INT PRIMARY KEY,
        category_name VARCHAR(255) UNIQUE
    );

    CREATE TABLE tags (
        tag_id INT PRIMARY KEY,
        tag_name VARCHAR(255) UNIQUE
    );


    CREATE TABLE subscriptions (
        subscription_id INT PRIMARY KEY,
        subscriber_id INT,
        channel_id INT,
        FOREIGN KEY (subscriber_id) REFERENCES users(user_id),
        FOREIGN KEY (channel_id) REFERENCES users(user_id)
    );

    CREATE TABLE video_likes (
        like_id INT PRIMARY KEY,
        user_id INT,
        video_id INT,
        liked BOOLEAN,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (video_id) REFERENCES videos(video_id)
    );

    CREATE TABLE comment_likes (
        like_id INT PRIMARY KEY,
        user_id INT,
        comment_id INT,
        liked BOOLEAN,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
    );

    CREATE TABLE viewing_history (
        history_id INT PRIMARY KEY,
        user_id INT,
        video_id INT,
        fecha TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (video_id) REFERENCES videos(video_id)
    );

    CREATE TABLE audit_trail (
        audit_id INT PRIMARY KEY AUTO_INCREMENT,
        action VARCHAR(255),
        table_name VARCHAR(255),
        row_id INT,
        user_id INT,
        timestamp TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    CREATE TABLE transactions (
        transaction_id INT PRIMARY KEY,
        user_id INT,
        amount DECIMAL(10, 2),
        description TEXT,
        timestamp TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    CREATE TABLE reports (
        report_id INT PRIMARY KEY,
        report_type ENUM('comment', 'video'),
        reported_id INT,
        user_id INT,
        reason TEXT,
        timestamp TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

-- Rollback transacción
ROLLBACK;

-- Commit  transacción
COMMIT;
