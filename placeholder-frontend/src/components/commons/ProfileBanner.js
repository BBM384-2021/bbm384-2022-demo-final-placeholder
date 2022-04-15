import React from 'react'
import profilePic from '../profilepage-screen/assets/1.png'

export default function ProfileBanner( {withoutName, withStatus, isChatBanner, user, onClick }) {
  return (
    <div style={{display:'flex', alignSelf:'flex-start', justifyContent:'space-between',
     flexDirection:'row', flexWrap: 'wrap'}}>
        <button onClick={onClick(user)}>
            <div className="userProfile" style={{ minWidth: "390px"}}>
                <img src={profilePic} alt="" style={{ width: "50px"}}/>
                <div>
                {!withoutName &&
                    <p>{user.full_name}</p>
                }
                {withStatus &&   
                    <span>April 15 2022, 13:40 pm</span>
                }
                </div>
            </div>
        </button>
    </div>
  )
}