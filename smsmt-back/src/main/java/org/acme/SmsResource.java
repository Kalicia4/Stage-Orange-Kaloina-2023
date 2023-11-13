package org.acme;

import body.SmsMasse;
import body.SmsRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import entity.Inscription;
import entity.Sms;
import entity.SousCompte;
import io.quarkus.security.UnauthorizedException;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import repository.MessageRepository;



import java.io.IOException;
import java.io.InvalidClassException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Path("/sms")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SmsResource {

    //envoie unitaire de sms
    @Inject
    ObjectMapper objectMapper;

    @POST
    @Transactional
    @Path("/unitaire/API")
    @RolesAllowed("user")
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendSms(SmsRequest smsRequest ) {

        LocalDateTime userDate = smsRequest.getDate();

        if(userDate == null){
            userDate = LocalDateTime.now();
        }

        LocalDateTime currentDate = LocalDateTime.now();

        String textValue = smsRequest.getText();
        Integer textLength = textValue.length();

        String phone = smsRequest.getDestinataire();
        Pattern pattern = Pattern.compile("0(32|33|34|37|38)\\d{7}");
        Matcher matcher = pattern.matcher(phone);


        if(smsRequest.getEmetteur() == ""){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of(
                            "code", "112",
                            "description", "Emetteur invalide"))
                    .build();
        }
        else if(smsRequest.getText() == ""){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of(
                            "code", "110",
                            "description", "Le message du SMS est vide ou invalide"))
                    .build();
        }
        else if (textLength > 200) {

            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of(
                            "code", "111",
                            "description", "Le message du SMS est trop long"))
                    .build();
        }
        else if (!matcher.matches()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of(
                            "code", "114",
                            "description", "numéro de mobile invalide"))
                    .build();
        }

        Inscription u = Inscription.find("telephone = ?1",smsRequest.emetteur).firstResult();
        if(u != null){

            Sms sms = new Sms();
            sms.emetteur = smsRequest.emetteur;
            sms.destination = smsRequest.destinataire;
            sms.text = smsRequest.text;
            sms.sous_compte = smsRequest.sous_compte;

            if (smsRequest.getSous_compte() == ""){

                if(userDate.isEqual(currentDate)){

                    sms.date = userDate;
                    sms.envoie = 1;
                    verificationDestinataire(sms.getDestination(), sms);

                    Response response = envoieRequete(sms.getEmetteur(), sms.getDestination(), sms.getText());
                    if(response.getStatus() == 200){
                        Sms.persist(sms);
                        if(sms.isPersistent()){
                            return Response.status(201)
                                    .entity(Map.of(
                                            "description", "your message have been sent",
                                            "code", 100))
                                    .build();
                        }
                    }

                }else {
                    sms.date = userDate;
                    sms.envoie = 0;
                    verificationDestinataire(sms.getDestination(), sms);

                    Sms.persist(sms);

                    if(sms.isPersistent()){
                        return Response.status(201)
                                .entity(Map.of(
                                        "description", "your message is programmed",
                                        "code", 101))
                                .build();

                    }
                }

            }
            SousCompte sousCompte = SousCompte.find("parent = ?1 and login = ?2", smsRequest.getEmetteur(), smsRequest.getSous_compte()).firstResult();
            if (sousCompte!=null) {

                Query query = entityManager.createNativeQuery("SELECT tel FROM sous_compte WHERE login = :login");
                query.setParameter("login", smsRequest.getSous_compte() );
                Object result = query.getSingleResult();
                String subaccount = (String) result;

                if(userDate.isEqual(currentDate)){

                    sms.date = userDate;
                    sms.envoie = 1;
                    verificationDestinataire(sms.getDestination(), sms);

                    Response response = envoieRequete(subaccount, sms.getDestination(), sms.getText());
                    if(response.getStatus() == 200){
                        Sms.persist(sms);
                        if(sms.isPersistent()){
                            return Response.status(201)
                                    .entity(Map.of(
                                            "description", "your message have been sent",
                                            "code", 100))
                                    .build();
                        }
                    }


                }else {
                    sms.date = userDate;
                    sms.envoie = 0;
                    verificationDestinataire(sms.getDestination(), sms);

                    Sms.persist(sms);

                    if(sms.isPersistent()){
                        return Response.status(201)
                                .entity(Map.of(
                                        "description", "your message is programmed",
                                        "code", 101))
                                .build();
                    }
                }

            }else{
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity(Map.of(
                                "description","sous-compte invalide"))
                        .build();
            }

        }else{
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("emetteur inexistant")
                    .build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(smsRequest).build();
    }

    //Début fonctions utilisées pour l'API

    public void verificationDestinataire(String phone, Sms sms){
        if (phone.startsWith("032") || phone.startsWith("037")) {
            sms.setOrange(1);
        }
        if (phone.startsWith("033")) {
            sms.setAirtel(1);
        }
        if (phone.startsWith("034") || phone.startsWith("038") ) {
            sms.setTelma(1);
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

    //Fin fonctions utilisées pour l'API

    @Inject
    EntityManager entityManager;


    //envoie sms en masse
    @POST
    @Transactional
    @Path("/enMasse/API")
    @RolesAllowed("user")
    public Response sendSmsMasse(SmsMasse smsMasse ) throws  InterruptedException {

        LocalDateTime userDate = smsMasse.getDate();

        if(userDate == null){
            userDate = LocalDateTime.now();
        }

        LocalDateTime currentDate = LocalDateTime.now();

        String textValue = smsMasse.getText();
        Integer textLength = textValue.length();

        List<String> phoneNumbers = smsMasse.getDestinataires();
        List<String> invalidNumbers = new ArrayList<>();
        Integer nombrenumEnvoi = phoneNumbers.size();

        int i = 0;

        Inscription u = Inscription.find("telephone = ?1",smsMasse.expediteur).firstResult();
        if(u != null){

            if(smsMasse.getExpediteur() == ""){
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of(
                                "code", "112",
                                "description", "Emetteur invalide"))
                        .build();
            }
            else if(smsMasse.getText() == ""){
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of(
                                "code", "110",
                                "description", "Le message du SMS est vide ou invalide"))
                        .build();
            }
            else if (textLength > 200) {

                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of(
                                "code", "111",
                                "description", "Le message du SMS est trop long"))
                        .build();
            }
            Pattern pattern = Pattern.compile("0(32|33|34|37|38)\\d{7}");

            for (String numero : phoneNumbers) {
                Matcher matcher = pattern.matcher(numero);

                if (!matcher.matches()) {
                    invalidNumbers.add(numero);
                }
            }
            for(String phone : invalidNumbers){
                phoneNumbers.remove(phone);
            }

            if (invalidNumbers.size() == nombrenumEnvoi) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of(
                                "code", "114",
                                "description", "Aucun numéro de mobile valide"))
                        .build();
            }

            if (smsMasse.getSous_compte() == ""){
                if(userDate.isEqual(currentDate)){

                    for(String dest : phoneNumbers) {
                        Sms sms = new Sms();
                        sms.emetteur = smsMasse.expediteur;
                        sms.sous_compte = smsMasse.sous_compte;
                        sms.text = smsMasse.text;
                        sms.date = userDate;
                        sms.envoie = 1;
                        sms.setDestination(dest);


                        verificationDestinataire(dest, sms);

                        Response response = envoieRequete(smsMasse.getExpediteur(), dest, smsMasse.text);
                        if(response.getStatus() == 200){
                            Sms.persist(sms);
                            if(sms.isPersistent()){
                                i++;

                            }
                        }
                    }

                    return Response.status(201)
                            .entity(Map.of(
                                    "phonenumbers", phoneNumbers,
                                    "nbSms", i,
                                    "invalidNumbers", invalidNumbers,
                                    "nbContacts", i,
                                    "description", "your message have been sent",
                                    "code", "100"))
                            .build();

                }

                else{

                    for(String dest : phoneNumbers) {
                        Sms sms = new Sms();
                        sms.emetteur = smsMasse.expediteur;
                        sms.sous_compte = smsMasse.sous_compte;
                        sms.text = smsMasse.text;
                        sms.date = userDate;
                        sms.envoie = 0;

                        sms.setDestination(dest);

                        verificationDestinataire(dest,sms);

                        Sms.persist(sms);
                        if(sms.isPersistent()) {
                            i++;
                            System.out.println(i);
                        }

                    }


                    return Response.status(201)
                            .entity(Map.of(
                                    "phonenumbers", phoneNumbers,
                                    "nbSms", i,
                                    "invalidNumbers", invalidNumbers,
                                    "nbContacts", i,
                                    "description", "your message is programmed",
                                    "code", 101))
                            .build();


                }
            }
            SousCompte sousCompte = SousCompte.find("login = ?1", smsMasse.getSous_compte()).firstResult();
            if (sousCompte!=null) {

                Query query = entityManager.createNativeQuery("SELECT tel FROM sous_compte WHERE login = :login");
                query.setParameter("login", smsMasse.getSous_compte() );
                Object result = query.getSingleResult();
                String subaccount = (String) result;

                if(userDate.isEqual(currentDate)){

                    for(String dest : phoneNumbers) {
                        Sms sms = new Sms();
                        sms.emetteur = smsMasse.expediteur;
                        sms.sous_compte = smsMasse.sous_compte;
                        sms.text = smsMasse.text;
                        sms.date = userDate;
                        sms.envoie = 1;
                        sms.setDestination(dest);

                        verificationDestinataire(dest,sms);

                        Response response = envoieRequete(subaccount, dest, smsMasse.text);
                        if(response.getStatus() == 200){
                            Sms.persist(sms);
                            i++;
                        }

                    }

                    if(i == phoneNumbers.size())
                        return Response.status(201)
                                .entity(Map.of(
                                        "phonenumbers", phoneNumbers,
                                        "nbSms", i,
                                        "invalidNumbers", invalidNumbers,
                                        "nbContacts", i,
                                        "description", "your message have been sent",
                                        "code", "100"))
                                .build();

                }
                else{

                    for(String dest : phoneNumbers) {
                        Sms sms = new Sms();
                        sms.emetteur = smsMasse.expediteur;
                        sms.sous_compte = smsMasse.sous_compte;
                        sms.text = smsMasse.text;
                        sms.date = userDate;
                        sms.envoie = 0;
                        sms.setDestination(dest);

                        verificationDestinataire(dest,sms);

                        Sms.persist(sms);
                        if(sms.isPersistent()) {
                            i++;
                        }

                    }

                    if(i == phoneNumbers.size() ){
                        return Response.status(201)
                                .entity(Map.of(
                                        "phonenumbers", phoneNumbers,
                                        "nbSms", i,
                                        "invalidNumbers", invalidNumbers,
                                        "nbContacts", i,
                                        "description", "your message is programmed",
                                        "code", 101))
                                .build();

                    }
                }
            }else {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity(Map.of(
                                "description","sous-compte invalide"))
                        .build();
            }
        }else{
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("emetteur inexistant")
                    .build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(smsMasse).build();
    }

    @Inject
    MessageRepository repository;

    @GET
    @Path("/envoie")
    public List<Sms> getEnvoiesEqualsOrderByDateDesc(@QueryParam("emeteur") String emeteur) {
            return repository.findEnvoiesEqualsOrderByDateDesc(emeteur);
    }

    @GET
    @Path("/programme")
    public List<Sms> getProgrammedEnvoiesOrderByDateDesc(@QueryParam("emeteur") String emeteur){
        return repository.findProgrammedEnvoiesOrderByDateDesc(emeteur);
    }







}



