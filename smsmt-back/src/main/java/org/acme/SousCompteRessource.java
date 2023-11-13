package org.acme;

import body.SousCompteUpdate;
import entity.SousCompte;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import repository.SousCompteService;

import java.util.List;


@Path("sousCompte")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SousCompteRessource {

    @Path("create")
    @POST
    @Transactional
    public Response create(SousCompte sousCompte){

        SousCompte login = SousCompte.find("login = ?1 or tel = ?2", sousCompte.getLogin(), sousCompte.getTel()).firstResult();

        if(login == null){

            sousCompte.persist(sousCompte);

            if(sousCompte.isPersistent()){
                return Response.status(Response.Status.CREATED).build();
            }
            else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

        }
        else {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Erreur de contrainte d'unicité : une valeur en double a été détectée.")
                    .build();

        }
    }

    @Inject
    SousCompteService sousCompteService;

    @GET
    @Path("view/{parent}")
    public List<SousCompte> getSubAccount(@PathParam("parent") String parent){
      return sousCompteService.findSousCompte(parent);
    }

    @Inject
    EntityManager em;

    @DELETE
    @Path("delete/{id}")
    @Transactional
    public Response deleteItem(@PathParam("id") Integer id) {
        SousCompte sousCompte = em.find(SousCompte.class, id);
        if (sousCompte != null) {
            sousCompte.delete(em); // Appel à la méthode de suppression de l'entité
            return Response.status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @PUT
    @Path("update/{id}")
    @Transactional
    public  Response updateItem(@PathParam("id") Long id, SousCompteUpdate sousCompteUpdate){

        SousCompte u = SousCompte.find("login = ?1", sousCompteUpdate.getLogin()).firstResult();

        if(u == null){
            sousCompteService.updateSousCompte(id,sousCompteUpdate);
            return Response.status(Response.Status.CREATED).build();
        }
        else {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Erreur de contrainte d'unicité : une valeur en double a été détectée.")
                    .build();

        }
    }

}
