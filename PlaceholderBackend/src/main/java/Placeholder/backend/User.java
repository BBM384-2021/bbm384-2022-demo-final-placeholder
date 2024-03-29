package Placeholder.backend;

import javax.persistence.*;

@Entity
@Table(name="user")
public class User {


    @Id
    @Column(name="id")
    private int id;

    @Column(name="full_name")
    private String full_name;

    @Column(name="user_type")
    private String user_type;

    @Column(name="cs_mail")
    private String cs_mail;

    @Column(name="user_password")
    private String user_password;

    @Column(name="phone")
    private String phone;

    @Column(name="company")
    private String company;

    @Column(name="link")
    private String link;

    @Column(name="alt_mail")
    private String alt_mail;

    @Column(name="profile_pic_path")
    private String profile_pic_path;

    @Transient()
    private boolean is_connected;

    public User(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User(int id, String full_name, String user_type, String cs_mail, String user_password,
                String phone, String company, String link, String alt_mail, String profile_pic_path) {
        this.id = id;
        this.full_name = full_name;
        this.user_type = user_type;
        this.cs_mail = cs_mail;
        this.user_password = user_password;
        this.phone = phone;
        this.company = company;
        this.link = link;
        this.alt_mail = alt_mail;
        this.profile_pic_path = profile_pic_path;
        this.is_connected = false;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public boolean isIs_connected() {
        return is_connected;
    }

    public void setIs_connected(boolean is_connected) {
        this.is_connected = is_connected;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }


    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public String getCs_mail() {
        return cs_mail;
    }

    public void setCs_mail(String cs_mail) {
        this.cs_mail = cs_mail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getAlt_mail() {
        return alt_mail;
    }

    public void setAlt_mail(String alt_mail) {
        this.alt_mail = alt_mail;
    }

    public String getProfile_pic_path() {
        return profile_pic_path;
    }

    public void setProfile_pic_path(String profile_pic_path) {
        this.profile_pic_path = profile_pic_path;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", full_name='" + full_name + '\'' +
                ", user_type='" + user_type + '\'' +
                ", cs_mail='" + cs_mail + '\'' +
                ", user_password='"+ user_password +'\''+
                ", phone='" + phone + '\'' +
                ", company='" + company + '\'' +
                ", link='" + link + '\'' +
                ", alt_mail='" + alt_mail + '\'' +
                ", profile_pic_path='" + profile_pic_path + '\'' +
                '}';
    }
}
