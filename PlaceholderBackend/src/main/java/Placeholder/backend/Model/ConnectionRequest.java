package Placeholder.backend.Model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="connection_request")
public class ConnectionRequest {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="sender_id")
    private int sender_id;

    @Column(name="receiver_id")
    private int receiver_id;

    public ConnectionRequest(){}

    public ConnectionRequest(int id, int sender_id, int receiver_id) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSender_id() {
        return sender_id;
    }

    public void setSender_id(int sender_id) {
        this.sender_id = sender_id;
    }

    public int getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(int receiver_id) {
        this.receiver_id = receiver_id;
    }

    @Override
    public String toString() {
        return "ConnectionRequest{" +
                "id=" + id +
                ", sender_id=" + sender_id +
                ", receiver_id=" + receiver_id +
                '}';
    }
}
