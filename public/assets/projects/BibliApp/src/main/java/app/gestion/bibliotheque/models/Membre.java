/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package app.gestion.bibliotheque.models;

import java.util.Date;

public class Membre {
    private int id;
    private String nom;
    private String prenom;
    private String email;
    private Date dateNaissance;
    private Date dateInscription;
    private int age;
    private String adresse;
    private String telephone;
    private String genre;

    // Constructeurs
    public Membre() {
    }

    public Membre(int id, String nom, String prenom, String email, Date dateNaissance,
                  Date dateInscription, int age, String adresse, String telephone, String genre) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.dateNaissance = dateNaissance;
        this.dateInscription = dateInscription;
        this.age = age;
        this.adresse = adresse;
        this.telephone = telephone;
        this.genre = genre;
    }

    // Getters et setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Date getDateNaissance() { return dateNaissance; }
    public void setDateNaissance(Date dateNaissance) { this.dateNaissance = dateNaissance; }

    public Date getDateInscription() { return dateInscription; }
    public void setDateInscription(Date dateInscription) { this.dateInscription = dateInscription; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
}
