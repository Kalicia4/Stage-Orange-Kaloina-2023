package entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "sms")
public class Sms extends PanacheEntity {

    public String emetteur;
    public String destination;
    public Integer orange = 0;
    public Integer telma = 0;
    public Integer airtel = 0;
    public String text;
    public String sous_compte;
    public LocalDateTime date;
    public Integer envoie;

    public String getEmetteur() {
        return emetteur;
    }
    public String getDestination() {
        return destination;
    }
    public String getText() {
        return text;
    }
    public LocalDateTime getDate() {
        return date;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setOrange(Integer orange) {
        this.orange = orange;
    }

    public void setTelma(Integer telma) {
        this.telma = telma;
    }

    public void setAirtel(Integer airtel) {
        this.airtel = airtel;
    }


}
