package app.BibliApp;

import app.gestion.bibliotheque.dao.EmpruntDAO;
import app.gestion.bibliotheque.dao.LivreDAO;
import app.gestion.bibliotheque.dao.MembreDAO;
import app.gestion.bibliotheque.models.Emprunt;
import app.gestion.bibliotheque.models.Livre;
import app.gestion.bibliotheque.models.Membre;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.List;

public class BibliAppGUI extends JFrame {
    private MembreDAO membreDAO;
    private LivreDAO livreDAO;
    private EmpruntDAO empruntDAO;

    public BibliAppGUI() {
        membreDAO = new MembreDAO();
        livreDAO = new LivreDAO();
        empruntDAO = new EmpruntDAO();

        setTitle("Bibliothèque");
        setSize(400, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        JButton btnInscrire = new JButton("Inscrire un membre");
        JButton btnListerLivres = new JButton("Lister tous les livres");
        JButton btnEmprunter = new JButton("Emprunter un livre");
        JButton btnRenouveler = new JButton("Renouveler un emprunt");

        add(btnInscrire);
        add(btnListerLivres);
        add(btnEmprunter);
        add(btnRenouveler);

        btnInscrire.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                inscrireNouveauMembre();
            }
        });

        btnListerLivres.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                afficherLivres();
            }
        });

        btnEmprunter.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                emprunterLivre();
            }
        });

        btnRenouveler.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                renouvelerEmprunt();
            }
        });
    }

    private void inscrireNouveauMembre() {
        JTextField nomField = new JTextField(15);
        JTextField prenomField = new JTextField(15);
        JTextField emailField = new JTextField(15);

        JPanel panel = new JPanel();
        panel.add(new JLabel("Nom:"));
        panel.add(nomField);
        panel.add(new JLabel("Prénom:"));
        panel.add(prenomField);
        panel.add(new JLabel("Email:"));
        panel.add(emailField);

        int result = JOptionPane.showConfirmDialog(null, panel, "Inscription d'un nouveau membre", JOptionPane.OK_CANCEL_OPTION);
        if (result == JOptionPane.OK_OPTION) {
            try {
                Membre membre = new Membre();
                membre.setNom(nomField.getText());
                membre.setPrenom(prenomField.getText());
                membre.setEmail(emailField.getText());
                membreDAO.ajouterMembre(membre);
                JOptionPane.showMessageDialog(this, "Membre inscrit avec succès !");
            } catch (SQLException e) {
                JOptionPane.showMessageDialog(this, "Erreur lors de l'inscription : " + e.getMessage());
            }
        }
    }

    private void afficherLivres() {
        try {
            List<Livre> livres = livreDAO.getAllLivres();
            StringBuilder sb = new StringBuilder("=== Liste des livres ===\n");
            for (Livre l : livres) {
                sb.append("Titre : ").append(l.getTitle()).append(", Auteur : ").append(l.getAuthor()).append(", ISBN : ").append(l.getIsbn()).append("\n");
            }
            JOptionPane.showMessageDialog(this, sb.toString());
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Erreur lors de la récupération des livres : " + e.getMessage());
        }
    }

    private void emprunterLivre() {
        JTextField membreIdField = new JTextField(15);
        JTextField isbnField = new JTextField(15);

        JPanel panel = new JPanel();
        panel.add(new JLabel("ID du membre:"));
        panel.add(membreIdField);
        panel.add(new JLabel("ISBN du livre:"));
        panel.add(isbnField);

        int result = JOptionPane.showConfirmDialog(null, panel, "Emprunter un livre", JOptionPane.OK_CANCEL_OPTION);
        if (result == JOptionPane.OK_OPTION) {
            try {
                int membreId = Integer.parseInt(membreIdField.getText());
                String isbn = isbnField.getText();
                Emprunt emprunt = new Emprunt();
                emprunt.setMembresId(membreId);
                emprunt.setLivresIsbn(isbn);
                emprunt.setDateEmprunt(new java.util.Date());
                emprunt.setRenouvele(false);
                empruntDAO.creerEmprunt(emprunt);
                JOptionPane.showMessageDialog(this, "Livre emprunté avec succès !");
            } catch (SQLException e) {
                JOptionPane.showMessageDialog(this, "Erreur lors de l'emprunt : " + e.getMessage());
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(this, "ID du membre invalide.");
            }
        }
    }

    private void renouvelerEmprunt() {
        JTextField empruntIdField = new JTextField(15);

        JPanel panel = new JPanel();
        panel.add(new JLabel("ID de l'emprunt:"));
        panel.add(empruntIdField);

        int result = JOptionPane.showConfirmDialog(null, panel, "Renouveler un emprunt", JOptionPane.OK_CANCEL_OPTION);
        if (result == JOptionPane.OK_OPTION) {
            try {
                int empruntId = Integer.parseInt(empruntIdField.getText());
                empruntDAO.renouvelerEmprunt(empruntId);
                JOptionPane.showMessageDialog(this, "Emprunt renouvelé !");
            } catch (SQLException e) {
                JOptionPane.showMessageDialog(this, "Erreur lors du renouvellement : " + e.getMessage());
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(this, "ID de l'emprunt invalide.");
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            BibliAppGUI app = new BibliAppGUI();
            app.setVisible(true);
        });
    }
}