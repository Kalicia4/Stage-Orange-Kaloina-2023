package body;

import jakarta.persistence.*;

import java.time.LocalDateTime;


public class SmsRequest {



    public String emetteur;
    public String destinataire;
    public String sous_compte;
    public String text;
    public LocalDateTime date;

    // les getters et les setters pour les champs


    public String getEmetteur() {
        return emetteur;
    }

    public void setEmetteur(String emetteur) {
        this.emetteur = emetteur;
    }

    public String getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(String destinataire) {
        this.destinataire = destinataire;
    }

    public String getSous_compte() {
        return sous_compte;
    }

    public void setSous_compte(String sous_compte) {
        this.sous_compte = sous_compte;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
