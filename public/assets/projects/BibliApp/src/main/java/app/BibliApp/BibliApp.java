package app.BibliApp;

import app.gestion.bibliotheque.dao.EmpruntDAO;
import app.gestion.bibliotheque.dao.LivreDAO;
import app.gestion.bibliotheque.dao.MembreDAO;
import app.gestion.bibliotheque.models.Emprunt;
import app.gestion.bibliotheque.models.Livre;
import app.gestion.bibliotheque.models.Membre;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class BibliApp {
    public static void main(String[] args) {
        MembreDAO membreDAO = new MembreDAO();
        LivreDAO livreDAO = new LivreDAO();
        EmpruntDAO empruntDAO = new EmpruntDAO();
        Scanner scanner = new Scanner(System.in);
        int choix;
        
        do {
            System.out.println("\n===== Menu Bibliothèque =====");
            System.out.println("1. Inscrire un nouveau membre");
            System.out.println("2. Lister tous les livres");
            System.out.println("3. Emprunter un livre");
            System.out.println("4. Renouveler un emprunt");
            System.out.println("0. Quitter");
            System.out.print("Votre choix : ");
            
            choix = Integer.parseInt(scanner.nextLine());
            switch (choix) {
                case 1:
                    inscrireNouveauMembre(membreDAO, scanner);
                    break;
                case 2:
                    afficherLivres(livreDAO);
                    break;
                case 3:
                    emprunterLivre(empruntDAO, membreDAO, livreDAO, scanner);
                    break;
                case 4:
                    renouvelerEmprunt(empruntDAO, scanner);
                    break;
                case 0:
                    System.out.println("Au revoir !");
                    break;
                default:
                    System.out.println("Choix invalide.");
                    break;
            }
        } while (choix != 0);
        scanner.close();
    }
    
    private static void inscrireNouveauMembre(MembreDAO membreDAO, Scanner scanner) {
        try {
            System.out.print("Nom : ");
            String nom = scanner.nextLine();
            System.out.print("Prénom : ");
            String prenom = scanner.nextLine();
            System.out.print("Email : ");
            String email = scanner.nextLine();

            Membre membre = new Membre();
            membre.setNom(nom);
            membre.setPrenom(prenom);
            membre.setEmail(email);
            // Vous pouvez ajouter d'autres champs nécessaires selon la définition de Membre

            membreDAO.ajouterMembre(membre);
            System.out.println("Membre inscrit avec succès !");
        } catch (SQLException e) {
            System.out.println("Erreur lors de l'inscription : " + e.getMessage());
        }
    }
    
    private static void afficherLivres(LivreDAO livreDAO) {
        try {
            List<Livre> livres = livreDAO.getAllLivres();
            System.out.println("=== Liste des livres ===");
            for (Livre l : livres) {
                System.out.println("Titre : " + l.getTitle() + ", Auteur : " + l.getAuthor() + ", ISBN : " + l.getIsbn());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    private static void emprunterLivre(EmpruntDAO empruntDAO, MembreDAO membreDAO, LivreDAO livreDAO, Scanner scanner) {
        try {
            System.out.print("ID du membre : ");
            int membreId = Integer.parseInt(scanner.nextLine());
            
            System.out.print("ISBN du livre : ");
            String isbn = scanner.nextLine();
            
            Date dateEmprunt = new Date();
            Emprunt emprunt = new Emprunt();
            emprunt.setMembresId(membreId);
            emprunt.setLivresIsbn(isbn);
            emprunt.setDateEmprunt(dateEmprunt);
            emprunt.setRenouvele(false);
            
            empruntDAO.creerEmprunt(emprunt);
            System.out.println("Livre emprunté avec succès !");
        } catch (SQLException e) {
            System.out.println("Erreur lors de l'emprunt : " + e.getMessage());
        }
    }
    
    private static void renouvelerEmprunt(EmpruntDAO empruntDAO, Scanner scanner) {
        try {
            System.out.print("ID de l'emprunt : ");
            int empruntId = Integer.parseInt(scanner.nextLine());
            empruntDAO.renouvelerEmprunt(empruntId);
            System.out.println("Emprunt renouvelé !");
        } catch (SQLException e) {
            System.out.println("Erreur : " + e.getMessage());
        }
    }
}
