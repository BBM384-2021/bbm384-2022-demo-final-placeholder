package Placeholder.backend.Model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="attend")
public class Attend {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="event_id")
    private int event_id;

    public  Attend(){}

    public Attend(int id, int user_id, int event_id) {
        this.id = id;
        this.user_id = user_id;
        this.event_id = event_id;
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

    public int getEvent_id() {
        return event_id;
    }

    public void setEvent_id(int event_id) {
        this.event_id = event_id;
    }

    @Override
    public String toString() {
        return "Attend{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", event_id=" + event_id +
                '}';
    }
}
