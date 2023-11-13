package org.acme;

import data.EmailData;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@Path("/mail")
public class EmailResource {

    @Inject Mailer mailer;


    @POST
    @Blocking
    public void sendEmail(EmailData emailData) {

        mailer.send(
                Mail.withText(emailData.getRecipient(),
                        emailData.getSubject(),
                        emailData.getContent()
                )
        );

    }

}
