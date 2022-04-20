package Placeholder.backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="post_tag")
public class PostTag {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="tag_id")
    private int tag_id;

    @Column(name="post_id")
    private int post_id;

    public PostTag(int id, int tag_id, int post_id) {
        this.id = id;
        this.tag_id = tag_id;
        this.post_id = post_id;
    }

    public PostTag(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTag_id() {
        return tag_id;
    }

    public void setTag_id(int tag_id) {
        this.tag_id = tag_id;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    @Override
    public String toString() {
        return "PostTag{" +
                "id=" + id +
                ", tag_id=" + tag_id +
                ", post_id=" + post_id +
                '}';
    }
}
