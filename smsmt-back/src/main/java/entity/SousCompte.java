package entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Entity
@Table(name = "sous_compte")
public class SousCompte extends PanacheEntity {


    public String parent;
    public String login;
    public String mdp;
    public String nom;
    public String tel;

    public void setLogin(String login) {
        this.login = login;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getParent() {
        return parent;
    }

    public String getLogin() {
        return login;
    }

    public String getMdp() {
        return mdp;
    }

    public String getNom() {
        return nom;
    }

    public String getTel() {
        return tel;
    }

    @Transactional
    public void delete(EntityManager em) {
        em.remove(this);
    }


}
