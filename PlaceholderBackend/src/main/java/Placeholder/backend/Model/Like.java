package Placeholder.backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Likes")
public class Like {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="post_id")
    private int post_id;

    public Like(){}

    public Like(int id, int user_id, int post_id) {
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getuser_id() {
        return user_id;
    }

    public void setuser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    @Override
    public String toString() {
        return "Like{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", post_id=" + post_id +
                '}';
    }
}
