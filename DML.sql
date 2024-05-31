USE MASTER_TEST;

BEGIN;

    INSERT INTO users (user_id, nombre, email, contraseña) VALUES
    (1, 'Usuario1', 'usuario1@ramselvin.com', 'contraseña1'),
    (2, 'Usuario2', 'usuario2@ramselvin.com', 'contraseña2'),
    (3, 'Usuario3', 'usuario3@ramselvin.com', 'contraseña3');

    INSERT INTO authors (author_id, nombre) VALUES
    (1, 'Autor1'),
    (2, 'Autor2');

    INSERT INTO collaborators (collaborator_id, nombre) VALUES
    (1, 'Colaborador1'),
    (2, 'Colaborador2');

    INSERT INTO videos (video_id, titulo, descripcion, url, author_id) VALUES
    (1, 'Video1', 'Descripción del video 1', 'https://www.ramselvin.com/video1', 1),
    (2, 'Video2', 'Descripción del video 2', 'https://www.ramselvin.com/video2', 2);

    INSERT INTO comments (comment_id, contenido, user_id, video_id, fecha) VALUES
    (1, 'Comentario de prueba 1', 1, 1, NOW()),
    (2, 'Comentario de prueba 2', 2, 2, NOW());

    INSERT INTO reviews (review_id, puntuacion, comentario, user_id, video_id, fecha) VALUES
    (1, 5, 'Excelente video', 1, 1, NOW()),
    (2, 4, 'Buen video', 2, 2, NOW());

    INSERT INTO categories (category_id, category_name) VALUES
    (1, 'Categoría1'),
    (2, 'Categoría2');

    INSERT INTO tags (tag_id, tag_name) VALUES
    (1, 'Tag1'),
    (2, 'Tag2');

    INSERT INTO subscriptions (subscription_id, subscriber_id, channel_id) VALUES
    (1, 1, 2),
    (2, 2, 1);

    INSERT INTO video_likes (like_id, user_id, video_id, liked) VALUES
    (1, 1, 1, true),
    (2, 2, 2, true);

    INSERT INTO comment_likes (like_id, user_id, comment_id, liked) VALUES
    (1, 1, 1, true),
    (2, 2, 2, true);

    INSERT INTO viewing_history (history_id, user_id, video_id, fecha) VALUES
    (1, 1, 1, NOW()),
    (2, 2, 2, NOW());

    INSERT INTO audit_trail (action, table_name, row_id, user_id, timestamp) VALUES
    ('INSERT', 'users', 1, 1, NOW()),
    ('UPDATE', 'videos', 1, 1, NOW());

    INSERT INTO transactions (transaction_id, user_id, amount, description, timestamp) VALUES
    (1, 1, 100.00, 'Compra de producto', NOW()),
    (2, 2, 50.00, 'Pago de servicio', NOW());

    INSERT INTO reports (report_id, report_type, reported_id, user_id, reason, timestamp) VALUES
    (1, 'comment', 1, 2, 'Contenido inapropiado', NOW()),
    (2, 'video', 1, 1, 'Violación de derechos de autor', NOW());

ROLLBACK;

COMMIT;
