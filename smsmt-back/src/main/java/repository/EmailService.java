package repository;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class EmailService {

    @Inject
    Mailer mailer;

    public boolean sendEmail(String recipient, String subject, String content) {
        try {
            mailer.send(Mail.withText(recipient, subject, content));
            return true; // Renvoie vrai si l'e-mail est envoyé avec succès
        } catch (Exception e) {
            e.printStackTrace(); // Affiche l'erreur dans la console pour le suivi
            return false; // Renvoie faux si l'envoi de l'e-mail échoue
        }
    }
}
