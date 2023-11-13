package DTO;

import java.util.Date;

public class AdminStatisticDTO {
    private Date date;
    private Long messageCount;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(Long messageCount) {
        this.messageCount = messageCount;
    }

    private Integer orange;
    private Integer telma;
    private Integer airtel;

    public Integer getOrange() {
        return orange;
    }

    public void setOrange(Integer orange) {
        this.orange = orange;
    }

    public Integer getTelma() {
        return telma;
    }

    public void setTelma(Integer telma) {
        this.telma = telma;
    }

    public void setAirtel(Integer airtel) {
        this.airtel = airtel;
    }
    public Integer getAirtel() {
        return airtel;
    }
}
