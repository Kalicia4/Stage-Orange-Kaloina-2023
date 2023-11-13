package org.acme;

import entity.Inscription;
import entity.User;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import io.quarkus.runtime.StartupEvent;


@Singleton
public class Startup {

    @Transactional
    public void loadUsers(@Observes StartupEvent evt) {

        //User.add("admin", "admin", "admin");
       // User.add("user", "user", "user");
       // User.add("usertest", "mdp", "user");
    }
}
