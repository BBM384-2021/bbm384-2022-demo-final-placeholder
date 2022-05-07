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

import {
  checkConnection,
  createConnection,
  removeConnection,
} from "../../services/ConnectionService";

import EditProfileModal from "./EditProfileModal";
import { getUsersConnected } from "../../services/UserService";
import ConnectionsModal from "./ConnectionsModal";

export default function ProfileInfoBar({
  user,
  sessionUser,
  profileOwned,
  isEdited,
  setEdited,
}) {
  const linkedInUrl = user.linkedIn_url;
  const githubUrl = user.github_url;
  const [connections, setConnections] = useState([]);

  const [isConnected, setConnected] = useState(false);
  //open modal for profile edit:
  const [open, setOpen] = useState(false);

  //open modal for connections screen:
  const [connectionsOpen, setConnectionsOpen] = useState(false);

  useEffect(() => {
    setEdited(true);
  }, [isConnected]);

  useEffect(() => {
    //   TODO: get connections service
    // if our session user is in the list, we set the isConnected to true
    if (!profileOwned) {
      checkConnection(user.id, sessionUser.id)
        .then((response) => {
          if (response.data.code === 200) {
            setConnected(response.data.connected);
          } else {
            alert("Something Went Wrong! Please Try Again.");
          }
        })
        .catch((e) => {
          console.alert(e);
        });
    }
    getUsersConnected(user.id)
      .then((response) => {
        if (response.data.code === 200) {
          setConnections(response.data.connectedUsers);
          console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, profileOwned, sessionUser.id]);

  const showConnectionsScreen = () => {
    setConnectionsOpen(true);
  };
  const handleAddConnection = () => {
    createConnection(user.id, sessionUser.id)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setConnected(true);
        } else {
          alert("Something Went Wrong! Please Try Again.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleRemoveConnection = () => {
    removeConnection(user.id, sessionUser.id)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setConnected(false);
        } else {
          alert("Something Went Wrong! Please Try Again.");
        }
      })
      .catch((e) => {
        console.log("remove error", e);
      });
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
      {open && (
        <EditProfileModal
          open={open}
          setOpen={setOpen}
          user={user}
          setEdited={setEdited}
        ></EditProfileModal>
      )}
      {connectionsOpen && (
        <ConnectionsModal
          open={connectionsOpen}
          setOpen={setConnectionsOpen}
          connections={connections}
          userName={user.full_name}
        ></ConnectionsModal>
      )}
    </div>
  );
}
