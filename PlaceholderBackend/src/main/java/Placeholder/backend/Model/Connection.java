package Placeholder.backend.Model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="connection")
public class Connection {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user1_id")
    private int user1_id;

    @Column(name="user2_id")
    private int user2_id;

    public Connection(){};

    public Connection(int id, int user1_id, int user2_id) {
        this.id = id;
        this.user1_id = user1_id;
        this.user2_id = user2_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser1_id() {
        return user1_id;
    }

    public void setUser1_id(int user1_id) {
        this.user1_id = user1_id;
    }

    public int getUser2_id() {
        return user2_id;
    }

    public void setUser2_id(int user2_id) {
        this.user2_id = user2_id;
    }

    @Override
    public String toString() {
        return "Connection{" +
                "id=" + id +
                ", user1_id='" + user1_id + '\'' +
                ", user2_id='" + user2_id + '\'' +
                '}';
    }
}
