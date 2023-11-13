package entity;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "inscription")
public class Inscription extends PanacheEntity {

    public String nom;
    public String prenom;
    public String nom_soc;
    public String mail;
    public String telephone;
    public String utilisateur;
    public String motdepasse;
    public String etat;


}
