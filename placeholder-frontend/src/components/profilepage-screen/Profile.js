import React from 'react'
import "./Profile.css"

import cover from "./assets/cover.png";
import profilePic from "./assets/1.png";


import vectorPencil from "./assets/pencil.png";
import vectorCamera from "./assets/camera.png";
import vectorGithub from "./assets/github.png";
import vectorLinkedin from "./assets/linkedin.png";
import vectorMore from "./assets/menu-dots.png";
import vectorAdd from "./assets/user-add.png";
import vectorDocument from "./assets/document-signed.png";
import vectorSmile from "./assets/smile.png";
import vectorHeart from "./assets/heart.png";
import vectorComment from "./assets/comment-alt.png";
import vectorShare from "./assets/refresh.png";
import vectorExpand from "./assets/expand.png";
import vectorPostPic from "./assets/1post.png";
import vectorFeed from "./assets/home.png";


export default function Profile() {

    return (
        <div className="profileContainer">
            <img src={cover} className="coverImage" alt=""/>

            <div className="profileDetails">
                <div className="profileDetailLeft">
                    <div className="profileDetailRow">
                        <img src={profilePic} alt="" className="profileImage"/>
                        <div>
                            <h3>Desmin Alpaslan</h3>
                            <h4>54 connections</h4>
                            <a href="https://github.com/mavibirdesmi"> <img src={vectorGithub} className="githubImage" alt=""/> </a>
                            <a href="https://www.linkedin.com/in/desmin-alpaslan/"> <img src={vectorLinkedin} className="githubImage" alt=""/> </a>
                        </div>
                    </div>
                </div>
                <div className="profileDetailRight">
                    <a> <img src={vectorAdd} className="more" alt=""/> </a>
                    <a> <img src={vectorPencil} className="githubImage" alt=""/> </a>
                    <a> <img src={vectorMore} className="more" alt=""/> </a>
                </div>
            </div>

            <div className="profileInfo">

                <div className="infoColumn">

                </div>

                <div className="feedColumn">

                    <div className="postContainer">
                        <a className="profileFeed"><img src={vectorFeed}/>⠀Profile Feed</a>
                        <div className="userProfile">
                            <img src={vectorPostPic} alt=""/>
                            <div>
                                <p>Desmin Alpaslan posted</p>
                                <span>April 15 2022, 13:40 pm</span>
                            </div>
                        </div>
                        <p className="postText"> ⠀⠀Ders deneme bir iki üç!⠀
                            <a href="#">https://zoom.us/j/612312612987123</a></p>
                        <div className="postRow">
                            <div className="activityIcons">
                                <div><img src={vectorHeart}/>21</div>
                                <div><img src={vectorComment}/>3</div>
                                <div><img src={vectorShare}/>6</div>
                                <button> <img src={vectorExpand}/></button>
                            </div>
                        </div>
                    </div>

                    <div className="postContainer">
                        <div className="userProfile">
                            <img src={vectorPostPic} alt=""/>
                            <div>
                                <p>Desmin Alpaslan posted</p>
                                <span>April 15 2022, 13:40 pm</span>
                            </div>
                        </div>
                        <p className="postText"> ⠀⠀Harika, müthiş, inanılmaz!⠀
                            <a href="#">https://zoom.us/j/612312612987123</a></p>
                        <div className="postRow">
                            <div className="activityIcons">
                                <div><img src={vectorHeart}/>21</div>
                                <div><img src={vectorComment}/>3</div>
                                <div><img src={vectorShare}/>6</div>
                                <button> <img src={vectorExpand}/></button>
                            </div>
                        </div>
                    </div>

                    <div className="postContainer">
                        <div className="userProfile">
                            <img src={vectorPostPic} alt=""/>
                            <div>
                                <p>Desmin Alpaslan posted</p>
                                <span>April 15 2022, 13:40 pm</span>
                            </div>
                        </div>
                        <p className="postText"> ⠀⠀Harika, müthiş, inanılmaz!⠀
                            <a href="#">https://zoom.us/j/612312612987123</a></p>
                        <div className="postRow">
                            <div className="activityIcons">
                                <div><img src={vectorHeart}/>21</div>
                                <div><img src={vectorComment}/>3</div>
                                <div><img src={vectorShare}/>6</div>
                                <button> <img src={vectorExpand}/></button>
                            </div>
                        </div>
                    </div>

                    <div className="postProfileIcon">
                        <img/> <i className="bruh"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}