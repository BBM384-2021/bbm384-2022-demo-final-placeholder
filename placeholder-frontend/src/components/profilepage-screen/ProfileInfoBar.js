import React, { useEffect, useState } from "react";
import { IconButton, Button } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  People,
  PersonAdd,
  PersonRemove,
  Edit,
} from "@mui/icons-material";
import EditProfileModal from "./EditProfileModal";

export default function ProfileInfoBar({
  user,
  profileOwned,
  isEdited,
  setEdited,
}) {
  const linkedInUrl = user.linkedIn_url;
  const githubUrl = user.github_url;
  const [connections, setConnections] = useState([]);
  const [isConnected, setConnected] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //   TODO: get connections service
    // if our session user is in the list, we set the isConnected to true
  }, [user]);

  const showConnectionsScreen = () => {
    //   !TODO
  };
  const handleAddConnection = () => {
    //   !TODO
  };
  const handleRemoveConnection = () => {
    //   !TODO
  };
  const handleEditProfile = () => {
    setOpen(true);
  };

  const openLink = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="profileDetails">
      <div className="profileDetailLeft">
        <h3>{user.full_name}</h3>
        <div className="profileInfoContainer">
          {linkedInUrl && (
            <IconButton
              className="iconButtonContainer"
              color="primary"
              aria-label="open linkedin"
              component="span"
              onClick={() => {
                openLink(linkedInUrl);
              }}
            >
              <LinkedIn style={{ color: "#767676" }} fontSize="large" />
            </IconButton>
          )}
          {githubUrl && (
            <IconButton
              className="iconButtonContainer"
              color="primary"
              aria-label="open gitgub"
              component="span"
              onClick={() => {
                openLink(githubUrl);
              }}
            >
              <GitHub style={{ color: "#767676" }} fontSize="large" />
            </IconButton>
          )}
          <Button
            className="connections"
            onClick={showConnectionsScreen}
            startIcon={<People style={{ color: "#767676" }} fontSize="large" />}
          >
            <span>{connections.length}</span> <p>Connections</p>
          </Button>
        </div>
      </div>
      <div className="profileDetailRight">
        {profileOwned ? (
          <>
            <IconButton
              className="hoverButton"
              color="primary"
              aria-label="edit profile"
              component="span"
              onClick={handleEditProfile}
            >
              <span>Edit Profile</span>

              <Edit style={{ color: "#767676" }} fontSize="large" />
            </IconButton>
          </>
        ) : (
          <>
            {isConnected ? (
              <>
                <IconButton
                  className="hoverButton"
                  color="primary"
                  aria-label="add friend"
                  component="span"
                  onClick={handleRemoveConnection}
                >
                  <span>Remove Connection</span>

                  <PersonRemove style={{ color: "#FF1F2D" }} fontSize="large" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  className="hoverButton"
                  color="primary"
                  aria-label="add friend"
                  component="span"
                  onClick={handleAddConnection}
                >
                  <span>Add Connection</span>

                  <PersonAdd style={{ color: "#767676" }} fontSize="large" />
                </IconButton>
              </>
            )}
          </>
        )}
      </div>
      <EditProfileModal
        open={open}
        setOpen={setOpen}
        user={user}
        setEdited={setEdited}
      ></EditProfileModal>
    </div>
  );
}
// <div >
//         <div className="">
//           <div className="profileDetailRow">
//             <div>
//               <h3>{user.full_name}</h3>
//               <h4>54 connections</h4>
//               {linkedInUrl && <></>}
//               <a href="https://github.com/mavibirdesmi">
//                 {" "}
//                 {/* <img src={vectorGithub} className="githubImage" alt="" />{" "} */}
//               </a>
//               <a href="https://www.linkedin.com/in/desmin-alpaslan/">
//                 {" "}
//                 {/* <img src={vectorLinkedin} className="githubImage" alt="" />{" "} */}
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="profileDetailRight">
//           <a> {/* <img src={vectorAdd} className="more" alt="" />{" "} */}</a>
//           <a id="modalBtn" className="modalButton">
//             {" "}
//             {/* <img src={vectorPencil} className="githubImage" alt="" />{" "} */}
//           </a>
//           <a> {/* <img src={vectorMore} className="more" alt="" />{" "} */}</a>

//           <div id="simpleModal" className="modal">
//             <div className="modalContent">
//               <span className="closeBtn">&times;</span>
//               <h2>Edit profile</h2>
//               <form>
//                 <label>Name</label>
//                 <input type="text" placeholder="Name..." />
//                 <label>Surname</label>
//                 <input type="text" placeholder="Surname..." />
//                 <label>Github</label>
//                 <input type="text" placeholder="Github..." />
//                 <label>Linkedin</label>
//                 <input type="text" placeholder="Linkedin..." />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
