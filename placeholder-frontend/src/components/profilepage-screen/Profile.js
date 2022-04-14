import React from 'react'
import "./Profile.css"
import cover from "./assets/cover.jpg";
import profilePic from "./assets/1.png";


import vectorPencil from "./assets/pencil.png";
import vectorCamera from "./assets/camera.png";
import vectorGithub from "./assets/github.png";
import vectorLinkedin from "./assets/linkedin.png";


export default function Profile() {

    return (
        <div className="profileContainer">
            <img src={cover} className="coverImage"/>
            <div className="profileDetails">
                <div className="profileDetailLeft">
                    <div className="profileDetailRow">
                        <img src={profilePic} alt="" className="profileImage"/>
                        <div>
                            <h3>Desmin Alpaslan</h3>
                        </div>
                    </div>
                </div>
                <div className="profileDetailRight">
                    <button>
                        img src={vectorGithub}
                    </button>
                    <button>
                        img src={vectorLinkedin}
                    </button>
                    <button>
                        Edit profile
                        img src={vectorPencil}
                    </button>
                </div>
            </div>
        </div>
    )
}