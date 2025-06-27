/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package app.gestion.bibliotheque.models;

import java.util.Date;

public class Emprunt {
    private int membresId;
    private String livresIsbn;
    private Date dateEmprunt;
    private Date dateRetour;
    private boolean renouvele;

    // Constructeurs
    public Emprunt() {
    }

    public Emprunt(int membresId, String livresIsbn, Date dateEmprunt, Date dateRetour, boolean renouvele) {
        this.membresId = membresId;
        this.livresIsbn = livresIsbn;
        this.dateEmprunt = dateEmprunt;
        this.dateRetour = dateRetour;
        this.renouvele = renouvele;
    }

    // Getters et setters
    public int getMembresId() { return membresId; }
    public void setMembresId(int membresId) { this.membresId = membresId; }

    public String getLivresIsbn() { return livresIsbn; }
    public void setLivresIsbn(String livresIsbn) { this.livresIsbn = livresIsbn; }

    public Date getDateEmprunt() { return dateEmprunt; }
    public void setDateEmprunt(Date dateEmprunt) { this.dateEmprunt = dateEmprunt; }

    public Date getDateRetour() { return dateRetour; }
    public void setDateRetour(Date dateRetour) { this.dateRetour = dateRetour; }

    public boolean isRenouvele() { return renouvele; }
    public void setRenouvele(boolean renouvele) { this.renouvele = renouvele; }
}

