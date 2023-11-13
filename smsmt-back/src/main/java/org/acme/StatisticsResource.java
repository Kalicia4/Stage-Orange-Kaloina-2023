package org.acme;


import DTO.StatisticDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import repository.StatisticsService;

import java.util.List;
import java.util.Map;

@Path("statistics")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StatisticsResource {

    @Inject
    StatisticsService statisticsService;

    @GET
    @Path("periode/{emetteur}/{start}/{end}")
    public List<StatisticDTO> getStatParPeriod(@PathParam("emetteur") String emetteur, @PathParam("start") String start, @PathParam("end") String end  ){
        return statisticsService.getSMSDataByDateRange(emetteur,start, end) ;
    }

    @GET
    @Path("souscompte/{emetteur}")
    public List<Map<String, Long>> getStatSousCompte(@PathParam("emetteur") String emetteur){
        return statisticsService.getSousCompte(emetteur);
    }

    @GET
    @Path("/{emetteur}")

    public List<String> getSousCompte(@PathParam("emetteur") String emetteur ){

        return statisticsService.getSousComptesByParent(emetteur);
    }
}
