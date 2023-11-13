package body;

import java.time.LocalDateTime;

public class Message {

    private final String recipient;
    private final String content;
    private final LocalDateTime scheduleTime;

    public Message(String recipient, String content, LocalDateTime scheduleTime) {
        this.recipient = recipient;
        this.content = content;
        this.scheduleTime = scheduleTime;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getScheduleTime() {
        return scheduleTime;
    }
}


