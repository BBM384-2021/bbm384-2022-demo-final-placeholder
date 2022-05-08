package Placeholder.backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="message")
public class Message {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="sender_id")
    private int sender_id;

    @Column(name="receiver_id")
    private int receiver_id;

    @Column(name="body")
    private String body;

    @Column(name="date")
    private String date;

    public Message(){}

    public Message(int id, int sender_id, int receiver_id, String body, String date) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.body = body;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getsender_id() {
        return sender_id;
    }

    public void setsender_id(int sender_id) {
        this.sender_id = sender_id;
    }

    public int getreceiver_id() {
        return receiver_id;
    }

    public void setreceiver_id(int receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender_id=" + sender_id +
                ", receiver_id=" + receiver_id +
                ", body='" + body + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
