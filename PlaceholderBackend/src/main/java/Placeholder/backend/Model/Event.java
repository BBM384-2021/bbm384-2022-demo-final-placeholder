package Placeholder.backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="event")
public class Event {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="event_body")
    private String event_body;

    @Column(name="event_share_date")
    private String event_share_date;

    @Column(name="event_visual_data_path")
    private String event_visual_data_path;

    @Column(name="event_location")
    private String event_location;

    public Event(){}

    public Event(int id, int user_id, String event_body, String event_share_date, String event_visual_data_path, String event_location) {
        this.id = id;
        this.user_id = user_id;
        this.event_body = event_body;
        this.event_share_date = event_share_date;
        this.event_visual_data_path = event_visual_data_path;
        this.event_location = event_location;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getEvent_body() {
        return event_body;
    }

    public void setEvent_body(String event_body) {
        this.event_body = event_body;
    }

    public String getEvent_share_date() {
        return event_share_date;
    }

    public void setEvent_share_date(String event_share_date) {
        this.event_share_date = event_share_date;
    }

    public String getEvent_visual_data_path() {
        return event_visual_data_path;
    }

    public void setEvent_visual_data_path(String event_visual_data_path) {
        this.event_visual_data_path = event_visual_data_path;
    }

    public String getEvent_location() {
        return event_location;
    }

    public void setEvent_location(String event_location) {
        this.event_location = event_location;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", event_body='" + event_body + '\'' +
                ", event_share_date='" + event_share_date + '\'' +
                ", event_visual_data_path='" + event_visual_data_path + '\'' +
                ", event_location='" + event_location + '\'' +
                '}';
    }
}
