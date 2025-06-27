package app.gestion.bibliotheque.dao;

import app.gestion.bibliotheque.models.Emprunt;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmpruntDAO {

    // Créer un nouvel emprunt
    public void creerEmprunt(Emprunt emprunt) throws SQLException {
        String sql = "INSERT INTO emprunts (membres_id, livres_isbn, date_emprunt, date_retour, renouvele) "
                   + "VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, emprunt.getMembresId());
            stmt.setString(2, emprunt.getLivresIsbn());
            stmt.setDate(3, emprunt.getDateEmprunt() == null ? null : new java.sql.Date(emprunt.getDateEmprunt().getTime()));
            stmt.setDate(4, emprunt.getDateRetour() == null ? null : new java.sql.Date(emprunt.getDateRetour().getTime()));
            stmt.setBoolean(5, emprunt.isRenouvele());
            stmt.executeUpdate();
        }
    }

    // Liste tous les emprunts
    public List<Emprunt> getAllEmprunts() throws SQLException {
        List<Emprunt> emprunts = new ArrayList<>();
        String sql = "SELECT * FROM emprunts";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                emprunts.add(mapResultSetToEmprunt(rs));
            }
        }
        return emprunts;
    }

    // Récupérer un emprunt par ID
    public Emprunt getEmpruntById(int empruntId) throws SQLException {
        String sql = "SELECT * FROM emprunts WHERE id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, empruntId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return mapResultSetToEmprunt(rs);
            }
        }
        return null;
    }

    // Supprimer un emprunt
    public void supprimerEmprunt(int membreId, String isbn) throws SQLException {
        String sql = "DELETE FROM emprunts WHERE membres_id=? AND livres_isbn=?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, membreId);
            stmt.setString(2, isbn);
            stmt.executeUpdate();
        }
    }

    // Méthode pour renouveler un emprunt en Java (utilisant la procédure stockée)
    public void renouvelerEmprunt(int empruntId) throws SQLException {
        String call = "{CALL renouveler_emprunt(?)}";

        try (Connection conn = DBConnection.getConnection();
             CallableStatement cstmt = conn.prepareCall(call)) {
            cstmt.setInt(1, empruntId);
            cstmt.execute();
        }
    }

    // Mapper un ResultSet à un objet Emprunt
    private Emprunt mapResultSetToEmprunt(ResultSet rs) throws SQLException {
        Emprunt emprunt = new Emprunt();
        emprunt.setMembresId(rs.getInt("membres_id"));
        emprunt.setLivresIsbn(rs.getString("livres_isbn"));
        emprunt.setDateEmprunt(rs.getDate("date_emprunt"));
        emprunt.setDateRetour(rs.getDate("date_retour"));
        emprunt.setRenouvele(rs.getBoolean("renouvele"));
        return emprunt;
    }
}
