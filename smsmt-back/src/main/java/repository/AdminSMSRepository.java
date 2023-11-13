package repository;

import DTO.AdminStatisticDTO;
import DTO.AdminSubAccountStatDTO;
import DTO.StatisticDTO;
import entity.Inscription;
import entity.Sms;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.*;

@ApplicationScoped
public class AdminSMSRepository implements PanacheRepositoryBase<Sms, Long>{

    @Transactional
    public List<Sms> findEnvoiesEqualsOrderByDateDesc() {

        MessageRepository message = new MessageRepository();
        return message.find("envoie = ?1 ORDER BY date DESC", 1).list();
    }

    @Transactional
    public List<Sms> findProgrammedEnvoiesOrderByDateDesc() {

        MessageRepository message = new MessageRepository();
        return message.find("envoie = ?1 ORDER BY date DESC", 0).list();
    }

    @Inject
    EntityManager entityManager;

    @Transactional
    public List<AdminStatisticDTO> getAllSMS(String startDate, String endDate){
        String query = "SELECT DATE(date) AS date, COUNT(*) AS message_count, SUM(orange) AS orange_count, SUM(telma) AS telma_count, SUM(airtel) AS airtel_count" +
                " FROM SMS " +
                "WHERE envoie = 1 AND date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(date)";

        List<Object[]> results = entityManager.createNativeQuery(query)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        List<AdminStatisticDTO> resultList = new ArrayList<>();

        for (Object[] result : results) {
            AdminStatisticDTO adminStatisticDTO = new AdminStatisticDTO() ;
            adminStatisticDTO.setDate((Date) result[0]);
            adminStatisticDTO.setMessageCount((Long) result[1]);
            adminStatisticDTO.setOrange(convertToInteger(result[2]));
            adminStatisticDTO.setTelma(convertToInteger(result[3]));
            adminStatisticDTO.setAirtel(convertToInteger(result[4]));

            resultList.add(adminStatisticDTO);
        }

        return resultList;
    }

    public Integer convertToInteger( Object obj ) {
        if (obj != null) {
            Integer intValue = Integer.valueOf(obj.toString());

            return intValue;

        } else {
            return 0;
        }

    }


    public List<String> listAllUtilisateurs() {
        return entityManager.createQuery("SELECT utilisateur FROM Inscription", String.class)
                .getResultList();
    }

    @Transactional
    public List<AdminStatisticDTO> getAllSMSPerAccount(String emetteur,String startDate, String endDate){
        String query = "SELECT DATE(date) AS date, COUNT(*) AS message_count, SUM(orange) AS orange_count, SUM(telma) AS telma_count, SUM(airtel) AS airtel_count" +
                " FROM SMS " +
                "WHERE envoie = 1 AND  emetteur = :emetteur AND date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(date)";

        List<Object[]> results = entityManager.createNativeQuery(query)
                .setParameter("emetteur", emetteur)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        List<AdminStatisticDTO> resultList = new ArrayList<>();

        for (Object[] result : results) {
            AdminStatisticDTO adminStatisticDTO = new AdminStatisticDTO() ;
            adminStatisticDTO.setDate((Date) result[0]);
            adminStatisticDTO.setMessageCount((Long) result[1]);
            adminStatisticDTO.setOrange(convertToInteger(result[2]));
            adminStatisticDTO.setTelma(convertToInteger(result[3]));
            adminStatisticDTO.setAirtel(convertToInteger(result[4]));

            resultList.add(adminStatisticDTO);
        }

        return resultList;
    }

    public List<String> listSubAccount(String parent) {
        String query = "SELECT login FROM SousCompte WHERE parent = ?1";
        return entityManager.createQuery(query)
                .setParameter(1, parent)
                .getResultList();
    }

    @Transactional
    public List<AdminSubAccountStatDTO> getAllSMSPerSubAccount(String sous_compte, String startDate, String endDate){
        String query = "SELECT DATE(date) AS date, COUNT(*) AS message_count, SUM(orange) AS orange_count, SUM(telma) AS telma_count, SUM(airtel) AS airtel_count" +
                " FROM SMS " +
                "WHERE envoie = 1 AND sous_compte = :sous_compte AND date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(date)";

        List<Object[]> results = entityManager.createNativeQuery(query)
                .setParameter("sous_compte", sous_compte)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        List<AdminSubAccountStatDTO> resultList = new ArrayList<>();

        for (Object[] result : results) {
            AdminSubAccountStatDTO adminSubAccountStatDTO = new AdminSubAccountStatDTO() ;
            adminSubAccountStatDTO.setDate((Date) result[0]);
            adminSubAccountStatDTO.setMessageCount((Long) result[1]);
            adminSubAccountStatDTO.setOrange(convertToInteger(result[2]));
            adminSubAccountStatDTO.setTelma(convertToInteger(result[3]));
            adminSubAccountStatDTO.setAirtel(convertToInteger(result[4]));

            resultList.add(adminSubAccountStatDTO);
        }

        return resultList;
    }
}
