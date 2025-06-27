CREATE DATABASE IF NOT EXISTS bibliotheque
    DEFAULT CHARACTER SET = 'utf8mb4';
USE bibliotheque;

CREATE TABLE IF NOT EXISTS livres ( 
    title VARCHAR(255) NOT NULL, 
    author VARCHAR(255)NOT NULL, 
    isbn VARCHAR(255)NOT NULL,
    quantity INT NOT NULL, 
    PRIMARY KEY (isbn)
);

CREATE TABLE IF NOT EXISTS membres ( 
    id INT AUTO_INCREMENT, 
    nom VARCHAR(255) NOT NULL, 
    prenom VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    date_naissance DATE NOT NULL,
    date_inscription DATE NOT NULL,
    age INT NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    numéro_de_téléphone INT NOT NULL,
    genre VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE emprunts (
    membres_id INT NOT NULL,
    livres_isbn VARCHAR(255) NOT NULL, 
    date_emprunt DATE, 
    date_retour DATE, 
    CONSTRAINT fk_membres_id FOREIGN KEY (membres_id) REFERENCES membres(id),
    CONSTRAINT fk_livres_isbn FOREIGN KEY (livres_isbn) REFERENCES livres(isbn)
);

INSERT INTO livres (title, author, isbn, quantity) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 5),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', 3),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 15),
('1984', 'George Orwell', '9780451524935', 4),
('Pride and Prejudice', 'Jane Austen', '9780679783268', 6),
('The Diary of a Young', 'Anne Frank', '9780553296983', 9),
('The Book Thief', 'Markus Zusak', '9780375842207', 22),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 5),
('The Lord of the Rings', 'J.R.R. Tolkien', '9780618640157', 51),
('The Little Prince', 'Antoine de Saint-Exupéry', '9780156012195', 5),
('The Chronicles of Narnia', 'C.S. Lewis', '9780066238500', 3),
('The Hunger Games', 'Suzanne Collins', '9780439023481', 8),
('The Hero and the Fairy', 'Imaginary Flame', '9780000000000', 1);

USE bibliotheque;
SELECT * FROM livres;

INSERT INTO membres (nom, prenom, email, id, adresse, numéro_de_téléphone, genre, date_inscription, date_naissance, age) VALUES
('Doe', 'John', 'JohnD@gmail.com', 000457892, '12 Rue de la République, 69000 Lyon', 0748391605, 'M', '2025-01-01', '1990-03-22', 35),
('Doe', 'Jane', 'JDoesson@hotmail.fr', 000132457, '34 Avenue Victor Hugo, 75008 Paris', 0698765432, 'F', '2025-01-01', '1973-12-11', 52),
('Doe', 'Jack', 'JackSParrowDoe@gmail.com', 000987654, '56 Boulevard Saint-Germain, 75005 Paris', 0675123498, 'M', '2025-01-01', '2000-07-08', 25),
('Manisse', 'Olivia', 'LadyHoelive@outlook.fr', 000456123, '78 Rue de la Paix, 33000 Bordeaux', 0754312987, 'F', '2025-01-01', '1996-11-03', 29),
('Grave Vanguard', 'Nalvis', 'BigDaddyOpps@gmail.com', 000789321, '90 Avenue de la Libération, 13001 Marseille', 0689457321, 'M', '2025-01-01', '2009-04-19', 16),
('Bao Madi', 'Faïzdine', 'baofaizdine@gmail.com', 000321987, '22 Rue Gambetta, 31000 Toulouse', 0678943210, 'M', '2025-01-01', '2001-09-27', 24),
('Martin', 'Luc', 'LucMartin@orange.fr', 000654987, '5 Rue des Lilas, 75015 Paris', 0678452301, 'M', '2025-01-01', '1985-08-10', 40),
('Durand', 'Emma', 'EmmaDurand@yahoo.fr', 000876543, '8 Avenue de la République, 69003 Lyon', 0687541230, 'F', '2025-01-01', '1995-04-25', 30),
('Lefevre', 'Maxime', 'MaximeLefevre@gmail.com', 000234567, '15 Boulevard de Strasbourg, 33000 Bordeaux', 0678234567, 'M', '2025-01-01', '1998-10-30', 27),
('Moreau', 'Alice', 'AliceMoreau@gmail.com', 000345678, '42 Rue du Bac, 75007 Paris', 0783491234, 'F', '2025-01-01', '1997-08-14', 28),
('Bernard', 'Pierre', 'PierreBernard@outlook.fr', 000567890, '15 Rue de Rivoli, 75004 Paris', 0678451230, 'M', '2025-01-01', '1980-05-09', 45),
('Dubois', 'Sophie', 'SophieDubois@hotmail.fr', 000789654, '27 Avenue Jean Jaurès, 69007 Lyon', 0789123456, 'F', '2025-01-01', '1993-12-02', 32),
('Lemoine', 'Julien', 'JulienLemoine@gmail.com', 000654321, '89 Boulevard de la Liberté, 34000 Montpellier', 0765432189, 'M', '2025-01-01', '1987-03-15', 38),
('Roux', 'Camille', 'CamilleRoux@yahoo.fr', 000432198, '10 Rue Victor Hugo, 33000 Bordeaux', 0678901234, 'F', '2025-01-01', '1996-06-27', 29),
('Mercier', 'Antoine', 'AntoineMercier@gmail.com', 000567123, '3 Rue de la Gare, 13000 Marseille', 0789012345, 'M', '2025-01-01', '1984-09-10', 41),
('Fontaine', 'Elise', 'EliseFontaine@hotmail.fr', 000678912, '25 Avenue du Général de Gaulle, 44000 Nantes', 0678123456, 'F', '2025-01-01', '1989-04-18', 36),
('Garnier', 'Théo', 'TheoGarnier@live.fr', 000543210, '18 Rue de la Liberté, 31000 Toulouse', 0767890123, 'M', '2025-01-01', '2003-07-07', 22),
('Morel', 'Chloe', 'ChloeMorel@gmail.com', 000987123, '47 Rue Victor Hugo, 75009 Paris', 0785671234, 'F', '2025-01-01', '1992-11-03', 33),
('Faure', 'Lucas', 'LucasFaure@outlook.com', 000876912, '32 Boulevard de la Madeleine, 75001 Paris', 0671234567, 'M', '2025-01-01', '1998-02-20', 27);

SELECT * FROM membres;

ALTER TABLE emprunts MODIFY date_emprunt DATE;
    USE bibliotheque;
ALTER TABLE emprunts MODIFY date_retour DATE;
ALTER TABLE membres MODIFY numéro_de_téléphone VARCHAR(20);
ALTER TABLE membres RENAME COLUMN numéro_de_téléphone TO telephone;
ALTER TABLE livres ADD disponible BOOLEAN NOT NULL DEFAULT TRUE;
DELIMITER //
CREATE TRIGGER maj_disponibilite_livre
BEFORE UPDATE ON livres
FOR EACH ROW
BEGIN
    IF NEW.quantity > 0 THEN
        SET NEW.disponible = TRUE;
    ELSE
        SET NEW.disponible = FALSE;
    END IF;
END;
//
DELIMITER ;
DELIMITER //
CREATE TRIGGER decrementer_quantite_livre
AFTER INSERT ON emprunts
FOR EACH ROW
BEGIN
    UPDATE livres 
    SET quantity = quantity - 1 
    WHERE isbn = NEW.livres_isbn;
END;
//
DELIMITER ;
DELIMITER //
CREATE TRIGGER incrementer_quantite_livre
AFTER DELETE ON emprunts
FOR EACH ROW
BEGIN
    UPDATE livres 
    SET quantity = quantity + 1 
    WHERE isbn = OLD.livres_isbn;
END;
//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE renouveler_emprunt(IN emprunt_id INT)
BEGIN
    DECLARE deja_renouvele BOOLEAN;

    -- Vérifie si l'emprunt a déjà été renouvelé
    SELECT renouvele INTO deja_renouvele FROM emprunts WHERE membres_id = emprunt_id;

    IF deja_renouvele = FALSE THEN
        -- Met à jour la date de retour et marque l'emprunt comme renouvelé
        UPDATE emprunts
        SET date_retour = DATE_ADD(date_retour, INTERVAL 7 DAY),
            renouvele = TRUE
        WHERE membres_id = emprunt_id;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'L’emprunt a déjà été renouvelé une fois';
    END IF;
END;
//
DELIMITER ;
-- Test de la procédure stockée
USE bibliotheque;
CALL renouveler_emprunt(1);
ALTER TABLE livres MODIFY COLUMN disponible TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE livres DROP COLUMN IF EXISTS disponible;
ALTER TABLE livres ADD COLUMN disponible TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE membres MODIFY COLUMN telephone VARCHAR(20) NOT NULL;

USE bibliotheque;
DELIMITER $$
DROP PROCEDURE IF EXISTS modifier_livre $$
CREATE PROCEDURE modifier_livre(
    IN p_isbn VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_author VARCHAR(255),
    IN p_quantity INT,
    IN p_disponible TINYINT
)
BEGIN
    UPDATE livres
    SET title = p_title,
        author = p_author,
        quantity = p_quantity,
        disponible = p_disponible
    WHERE isbn = p_isbn;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS modifier_membre $$
CREATE PROCEDURE modifier_membre(
    IN p_id INT,
    IN p_nom VARCHAR(255),
    IN p_prenom VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_date_naissance DATE,
    IN p_date_inscription DATE,
    IN p_age INT,
    IN p_adresse VARCHAR(255),
    IN p_telephone VARCHAR(20),
    IN p_genre VARCHAR(255)
)
BEGIN
    UPDATE membres
    SET nom = p_nom,
        prenom = p_prenom,
        email = p_email,
        date_naissance = p_date_naissance,
        date_inscription = p_date_inscription,
        age = p_age,
        adresse = p_adresse,
        telephone = p_telephone,
        genre = p_genre
    WHERE id = p_id;
END$$
DELIMITER ;

