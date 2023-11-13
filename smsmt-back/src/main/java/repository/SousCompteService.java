package repository;

import body.SousCompteUpdate;
import entity.SousCompte;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class SousCompteService implements PanacheRepositoryBase<SousCompte, Long> {

    @Transactional
    public List<SousCompte> findSousCompte(String parent) {

        SousCompte sousCompte = new SousCompte();
        return sousCompte.find("parent = ?1", parent).list();
    }

    @Inject
    EntityManager entityManager;

    @Transactional
    public void updateSousCompte(Long id, SousCompteUpdate sousCompteUpdate) {
        SousCompte sousCompte = entityManager.find(SousCompte.class, id);
        if(sousCompte != null){
            sousCompte.setLogin( sousCompteUpdate.getLogin());
            sousCompte.setNom(sousCompteUpdate.getNom());
            sousCompte.setTel(sousCompteUpdate.getTel());
            sousCompte.setMdp(sousCompteUpdate.getMdp());

            entityManager.persist(sousCompte);
        }

    }

}
