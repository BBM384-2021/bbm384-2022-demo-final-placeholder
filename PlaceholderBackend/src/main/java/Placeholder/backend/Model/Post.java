package Placeholder.backend.Model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="post")
public class Post {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="post_body")
    private String post_body;

    @Column(name="post_share_date")
    private String post_share_date;

    @Column(name="post_visual_data_path")
    private String post_visual_data_path;


    public Post(int id, int user_id, String post_body, String post_share_date, String post_visual_data_path) {
        this.id = id;
        this.user_id = user_id;
        this.post_body = post_body;
        this.post_share_date = post_share_date;
        this.post_visual_data_path = post_visual_data_path;
    }

    public Post(){}

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

    public String getPost_body() {
        return post_body;
    }

    public void setPost_body(String post_body) {
        this.post_body = post_body;
    }

    public String getPost_share_date() {
        return post_share_date;
    }

    public void setPost_share_date(String post_share_date) {
        this.post_share_date = post_share_date;
    }

    public String getPost_visual_data_path() {
        return post_visual_data_path;
    }

    public void setPost_visual_data_path(String post_visual_data_path) {
        this.post_visual_data_path = post_visual_data_path;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", post_body='" + post_body + '\'' +
                ", post_share_date='" + post_share_date + '\'' +
                ", post_visual_data_path='" + post_visual_data_path + '\'' +
                '}';
    }
}
