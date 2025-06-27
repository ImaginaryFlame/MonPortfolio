package app.gestion.bibliotheque.dao;

import app.gestion.bibliotheque.models.Livre;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LivreDAO {

    // Récupérer tous les livres
    public List<Livre> getAllLivres() throws SQLException {
        List<Livre> livres = new ArrayList<>();
        String sql = "SELECT * FROM livres";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                livres.add(mapResultSetToLivre(rs));
            }
        }
        return livres;
    }

    // Ajouter un livre
    public void ajouterLivre(Livre livre) throws SQLException {
        String sql = "INSERT INTO livres (title, author, isbn, quantity, disponible) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, livre.getTitle());
            stmt.setString(2, livre.getAuthor());
            stmt.setString(3, livre.getIsbn());
            stmt.setInt(4, livre.getQuantity());
            stmt.setBoolean(5, livre.isDisponible());
            stmt.executeUpdate();
        }
    }

    // Mettre à jour un livre
    public void updateLivre(Livre livre) throws SQLException {
        String sql = "UPDATE livres SET title=?, author=?, quantity=?, disponible=? WHERE isbn=?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, livre.getTitle());
            stmt.setString(2, livre.getAuthor());
            stmt.setInt(3, livre.getQuantity());
            stmt.setBoolean(4, livre.isDisponible());
            stmt.setString(5, livre.getIsbn());
            stmt.executeUpdate();
        }
    }

    // Supprimer un livre
    public void deleteLivre(String isbn) throws SQLException {
        String sql = "DELETE FROM livres WHERE isbn=?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, isbn);
            stmt.executeUpdate();
        }
    }

    // Récupérer un livre par ISBN
    public Livre getLivreByIsbn(String isbn) throws SQLException {
        String sql = "SELECT * FROM livres WHERE isbn=?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, isbn);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToLivre(rs);
            }
        }
        return null; // Livre non trouvé
    }

    // Mapper un ResultSet à un objet Livre
    private Livre mapResultSetToLivre(ResultSet rs) throws SQLException {
        Livre livre = new Livre();
        livre.setTitle(rs.getString("title"));
        livre.setAuthor(rs.getString("author"));
        livre.setIsbn(rs.getString("isbn"));
        livre.setQuantity(rs.getInt("quantity"));
        livre.setDisponible(rs.getBoolean("disponible"));
        return livre;
    }
}
