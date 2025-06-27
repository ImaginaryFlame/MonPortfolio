package app.gestion.bibliotheque.dao;

import app.gestion.bibliotheque.models.Membre;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MembreDAO {

    // Ajouter un membre
    public void ajouterMembre(Membre membre) throws SQLException {
        String sql = "INSERT INTO membres (nom, prenom, email, date_naissance, date_inscription, age, adresse, telephone, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, membre.getNom());
            stmt.setString(2, membre.getPrenom());
            stmt.setString(3, membre.getEmail());
            stmt.setDate(4, new java.sql.Date(membre.getDateNaissance().getTime()));
            stmt.setDate(5, new java.sql.Date(membre.getDateInscription().getTime()));
            stmt.setInt(6, membre.getAge());
            stmt.setString(7, membre.getAdresse());
            stmt.setString(8, membre.getTelephone());
            stmt.setString(9, membre.getGenre());
            stmt.executeUpdate();
        }
    }

    // Récupérer un membre par ID
    public Membre getMembreById(int id) throws SQLException {
        String sql = "SELECT * FROM membres WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Membre(
                        rs.getInt("id"),
                        rs.getString("nom"),
                        rs.getString("prenom"),
                        rs.getString("email"),
                        rs.getDate("date_naissance"),
                        rs.getDate("date_inscription"),
                        rs.getInt("age"),
                        rs.getString("adresse"),
                        rs.getString("telephone"),
                        rs.getString("genre")
                    );
                }
            }
        }
        return null;
    }

    // Récupérer tous les membres
    public List<Membre> getAllMembres() throws SQLException {
        List<Membre> membres = new ArrayList<>();
        String sql = "SELECT * FROM membres";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                membres.add(new Membre(
                    rs.getInt("id"),
                    rs.getString("nom"),
                    rs.getString("prenom"),
                    rs.getString("email"),
                    rs.getDate("date_naissance"),
                    rs.getDate("date_inscription"),
                    rs.getInt("age"),
                    rs.getString("adresse"),
                    rs.getString("telephone"),
                    rs.getString("genre")
                ));
            }
        }
        return membres;
    }

    // Supprimer un membre
    public void supprimerMembre(int id) throws SQLException {
        String sql = "DELETE FROM membres WHERE id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
