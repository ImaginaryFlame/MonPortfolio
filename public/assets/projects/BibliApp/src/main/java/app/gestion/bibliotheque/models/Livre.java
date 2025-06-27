/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package app.gestion.bibliotheque.models;

public class Livre {
    private String title;
    private String author;
    private String isbn;
    private int quantity;
    private boolean disponible;

    // Constructeurs
    public Livre() {
    }

    public Livre(String title, String author, String isbn, int quantity, boolean disponible) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.quantity = quantity;
        this.disponible = disponible;
    }

    // Getters et setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
}
