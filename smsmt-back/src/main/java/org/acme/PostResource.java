package org.acme;

import io.quarkus.scheduler.Scheduled;
import jakarta.ejb.TransactionAttribute;
import jakarta.ejb.TransactionAttributeType;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;


@Path("/post")
public class PostResource {

    @Inject
    EntityManager entityManager;


    @Scheduled(every = "10s") // Schedule execution every 10 seconds, adjust as needed
    @Transactional
    public void updateRequest() {
        try {
            String query = "SELECT emetteur, sms.sous_compte, sms.text, destination, sms.date, sms.id " +
                    "FROM SMS " +
                    "WHERE envoie = 0";
            List<Object[]> results = entityManager.createNativeQuery(query)
                    .getResultList();

            LocalDateTime now = LocalDateTime.now();
            int count = 0;

            // Display the retrieved data in the console
            for (Object[] result : results) {
                Date date = (Date) result[4];
                LocalDateTime dateConverted = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());

                if (!dateConverted.isAfter(now)) {
                    count++;
                    System.out.println("Emetteur: " + result[0]);
                    System.out.println("Sous Compte: " + result[1]);
                    System.out.println("Texte: " + result[2]);
                    System.out.println("Destination: " + result[3]);
                    System.out.println("Date: " + result[4]);
                    System.out.println("----------------------");

                    Response response;

                    if (result[1].equals("")){
                      response = envoieRequete((String) result[0], (String) result[3], (String) result[2]);

                    }else {
                        Query querySousCompte = entityManager.createNativeQuery("SELECT tel FROM sous_compte WHERE login = :login");
                        querySousCompte.setParameter("login", result[1] );
                        Object resultSousCompte = querySousCompte.getSingleResult();
                        String subaccount = (String) resultSousCompte;

                        response = envoieRequete(subaccount, (String) result[3], (String) result[2]);
                        System.out.println(subaccount);

                    }

                    if(response.getStatus() == 200){
                        long id = (long) result[5];
                        String updateQuery = "UPDATE SMS SET envoie = 1 WHERE id = :id";
                        entityManager.createNativeQuery(updateQuery).setParameter("id", id).executeUpdate();
                    }
                }
            }

            System.out.println("Nombre de dates inferior ou equal à la date actuelle : " + count);

        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace for debugging
        }
    }

    public Response envoieRequete(String from, String to, String text){
        try {

            // Remplacez les espaces par des signes plus (+) dans la chaîne de texte
            String textOK = text.replace(" ", "+");

            // Créez un client HTTP
            HttpClient httpClient = HttpClient.newHttpClient();

            // Créez la demande HTTP
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://httpbin.org/post"))
                    .GET()
                    .build();


            // Envoyez la demande HTTP et récupérez la réponse
            HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            return Response.status(200).build();


        } catch(Exception e ){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }

    }

}

