package repository;

import entity.Inscription;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AdminInscriptionRepository implements PanacheRepository<Inscription> {

}
