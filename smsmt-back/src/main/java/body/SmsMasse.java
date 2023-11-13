package body;

import jakarta.persistence.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


public class SmsMasse {

    public String expediteur;
    public String sous_compte;
    public List<String> destinataires;
    public String text;
    public String campaignName;
    public LocalDateTime date;

    // les getters et les setters pour les champs
    public String getExpediteur() {
        return expediteur;
    }

    public List<String> getDestinataires() {
        return destinataires;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getSous_compte() {
        return sous_compte;
    }



}
