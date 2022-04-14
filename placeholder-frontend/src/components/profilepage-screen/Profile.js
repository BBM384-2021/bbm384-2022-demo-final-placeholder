import React from 'react'
import "./Profile.css"
import cover from "./assets/cover.jpg";
import profilePic from "./assets/1.png";


import vectorPencil from "./assets/pencil.png";
import vectorCamera from "./assets/camera.png";
import vectorGithub from "./assets/github.png";
import vectorLinkedin from "./assets/linkedin.png";
import vectorMore from "./assets/menu-dots.png";
import vectorAdd from "./assets/user-add.png";
import vectorDocument from "./assets/document-signed.png";
import vectorSmile from "./assets/smile.png";


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
                            <button> <img src={vectorGithub} className="githubImage" alt=""/> </button>
                            <button> <img src={vectorLinkedin} className="githubImage" alt=""/> </button>
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

                </div>
            </div>
        </div>
    )
}