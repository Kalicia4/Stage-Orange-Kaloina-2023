package repository;

import DTO.StatisticDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.*;

@ApplicationScoped
public class StatisticsService {

    @Inject
    EntityManager entityManager;

    public List<StatisticDTO> getSMSDataByDateRange( String emetteur,String startDate, String endDate) {
        String query = "SELECT DATE(date) AS date, COUNT(*) AS message_count, SUM(orange) AS orange_count, SUM(telma) AS telma_count, SUM(airtel) AS airtel_count " +
                "FROM SMS " +
                "WHERE envoie = 1 AND emetteur = :emetteur AND date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(date)";
        List<Object[]> results = entityManager.createNativeQuery(query)
                .setParameter("emetteur", emetteur )
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        List<StatisticDTO>smsDataList = new ArrayList<>();

        for (Object[] result : results) {
            StatisticDTO statisticDTO = new StatisticDTO() ;
            statisticDTO.setDate((Date) result[0]);
            statisticDTO.setMessageCount((Long) result[1]);
            statisticDTO.setOrange(convertToInteger(result[2]));
            statisticDTO.setTelma(convertToInteger(result[3]));
            statisticDTO.setAirtel(convertToInteger(result[4]));
            smsDataList.add(statisticDTO);
        }
        return smsDataList;
    }

    public Integer convertToInteger( Object obj ) {
        if (obj != null) {
            Integer intValue = Integer.valueOf(obj.toString());

            return intValue;
            
        } else {
            return 0;
        }

    }


    @Transactional
    public List<Map<String, Long>> getSousCompte(String emetteur) {
        String query = "SELECT sms.sous_compte AS sousCompte, COUNT(sms.sous_compte) AS nbr " +
                "FROM SMS sms " +
                "WHERE sms.emetteur = :emetteur " +
                "GROUP BY sms.sous_compte";

        List<Object[]> results = entityManager.createNativeQuery(query)
                .setParameter("emetteur", emetteur)
                .getResultList();

        List<Map<String, Long>> resultList = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Long> map = new HashMap<>();
            String sousCompte = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            map.put(sousCompte, count);
            resultList.add(map);
        }

        return resultList;
    }

    @Transactional
    public List<String> getSousComptesByParent(String parent) {
        String query = "SELECT login " +
                "FROM sous_compte " +
                "WHERE parent = :parent";

        List<String> sousComptes = entityManager.createNativeQuery(query)
                .setParameter("parent", parent)
                .getResultList();

        return sousComptes;
    }

}
