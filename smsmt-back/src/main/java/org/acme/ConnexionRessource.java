package org.acme;

import entity.Connexion;
import entity.Inscription;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConnexionRessource {

    @POST
    public boolean login(Connexion connexion) {

        Inscription user = Inscription.find("utilisateur = ?1 and etat = 'active'", connexion.getUtilisateur()).firstResult();

        if (user!=null) {
            return BCrypt.checkpw(connexion.getMotdepasse(), user.motdepasse);
        } else {
            return false;
        }
    }

    @GET
    @Path("/{utilisateur}")
    public Response getUserAuthenticated(@PathParam("utilisateur") String utilisateur){
        Inscription u = Inscription.find("utilisateur", utilisateur).firstResult();

        if(u != null){
            return Response.ok(u).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    @PUT
    @Path("/{id}/active")
    public Response activateEntite(@PathParam("id")Long id){
        Inscription entite = Inscription.findById(id);

        if (entite == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entite.etat = "active";
        entite.persist();
        return Response.ok(entite).build();
    }

    @Transactional
    @PUT
    @Path("/{id}/desactive")
    public Response desactivateEntite(@PathParam("id")Long id){
        Inscription entite = Inscription.findById(id);

        if (entite == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entite.etat = "inactive";
        entite.persist();
        return Response.ok(entite).build();
    }



}
