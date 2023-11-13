package org.acme;

import DTO.AdminStatisticDTO;
import DTO.AdminSubAccountStatDTO;
import DTO.StatisticDTO;
import entity.Inscription;
import entity.Sms;
import entity.SousCompte;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import repository.AdminInscriptionRepository;
import repository.AdminSMSRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Path("/admin")
public class Admin {

    @Inject
    AdminInscriptionRepository inscriptionRepository;

    @GET
    @Path("/inscrits")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<Inscription> selectInscriptionDetails() {
        return inscriptionRepository.listAll();

    }

    @Inject
    EntityManager em;

    @DELETE
    @Path("delete/{id}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public Response deleteAccount(@PathParam("id") Long id) {
        Inscription inscription = em.find(Inscription.class, id);
        if (inscription != null) {
            inscription.delete(); // Appel à la méthode de suppression de l'entité
            return Response.status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @Inject
    AdminSMSRepository repository;

    @GET
    @Path("/envoi")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<Sms> getEnvoiesEqualsOrderByDateDesc() {
        return repository.findEnvoiesEqualsOrderByDateDesc();
    }

    @GET
    @Path("/programme")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<Sms> getProgrammedEnvoiesOrderByDateDesc(){
        return repository.findProgrammedEnvoiesOrderByDateDesc();
    }

    @GET
    @Path("periode/{start}/{end}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<AdminStatisticDTO> getStat(@PathParam("start") String start, @PathParam("end") String end  ){
        return repository.getAllSMS(start,end);
    }

    @GET
    @Path("account")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<String> getUser(){
        return repository.listAllUtilisateurs();
    }

    @GET
    @Path("subAccount/{parent}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public  List<String> getSubAccount(@PathParam("parent") String parent){
        return repository.listSubAccount(parent);
    }

    @GET
    @Path("/{utilisateur}")
    @Transactional
    @Produces(MediaType.TEXT_PLAIN)
    public String getTelephoneByUtilisateur(@PathParam("utilisateur") String utilisateur) {
        Object telephone = em.createQuery("SELECT telephone FROM Inscription WHERE utilisateur = :utilisateur")
                .setParameter("utilisateur", utilisateur)
                .getSingleResult();
        return telephone.toString();
    }

    @GET
    @Path("{emetteur}/{start}/{end}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<AdminStatisticDTO> getStatPerPeriod(@PathParam("emetteur") String emetteur, @PathParam("start") String start, @PathParam("end") String end  ){
        return repository.getAllSMSPerAccount(emetteur, start, end) ;
    }

    @GET
    @Path("sous_compte/{sous_compte}/{start}/{end}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public List<AdminSubAccountStatDTO> getStatPerSubAccount(@PathParam("sous_compte") String sous_compte, @PathParam("start") String start, @PathParam("end") String end  ){
        return repository.getAllSMSPerSubAccount(sous_compte, start,end);
    }

}
