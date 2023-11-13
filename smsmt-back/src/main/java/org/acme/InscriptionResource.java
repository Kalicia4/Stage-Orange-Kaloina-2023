package org.acme;

import entity.Inscription;
import entity.SousCompte;
import entity.User;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.mindrot.jbcrypt.BCrypt;


import java.util.List;


@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InscriptionResource {

    @GET
    public Response getAll(){
        List<Inscription> inscription = Inscription.listAll();
        return Response.ok(inscription).build();
    }

    @POST
    @Transactional
    public Response create(Inscription inscription){

        Inscription u = Inscription.find("utilisateur = ?1 or telephone = ?2", inscription.utilisateur, inscription.telephone).firstResult();


        if(u == null){

            String mdp = inscription.motdepasse;
            inscription.motdepasse = BCrypt.hashpw(mdp, BCrypt.gensalt());
            Inscription.persist(inscription);

            User.add(inscription.utilisateur, mdp, "user");

            return Response.ok(inscription).build();

        }else {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Erreur de contrainte d'unicité : une valeur en double a été détectée.")
                    .build();
        }
    }
}

