package Placeholder.backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="comment")
public class Comment {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="post_id")
    private int post_id;

    @Column(name="body")
    private String body;

    @Column(name="share_date")
    private String share_date;

    public Comment(){}

    public Comment(int id, int user_id, int post_id, String body, String share_date) {
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
        this.body = body;
        this.share_date = share_date;
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

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getShare_date() {
        return share_date;
    }

    public void setShare_date(String share_date) {
        this.share_date = share_date;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", post_id=" + post_id +
                ", body='" + body + '\'' +
                ", share_date='" + share_date + '\'' +
                '}';
    }
}
