package repository;
import entity.Sms;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;


@ApplicationScoped
public class MessageRepository implements PanacheRepositoryBase<Sms, Long> {

    @Transactional
    public List<Sms> findEnvoiesEqualsOrderByDateDesc(String emetteur) {

        MessageRepository message = new MessageRepository();
        return message.find("envoie = ?1 AND emetteur = ?2 ORDER BY date DESC", 1, emetteur).list();
    }

    @Transactional
    public List<Sms> findProgrammedEnvoiesOrderByDateDesc(String emetteur) {

        MessageRepository message = new MessageRepository();
        return message.find("envoie = ?1 AND emetteur = ?2 ORDER BY date DESC", 0, emetteur).list();
    }

}


