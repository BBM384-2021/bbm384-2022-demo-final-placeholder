import React, { useEffect, useState } from "react";
import "./eventSideBar.css";
import EventCard from "../commons/EventCard";
import {getMainEventFeed } from "../../services/EventService";

export default function EventSideBar({user}) {

  const [contents, setContents] = useState([]);

  console.log(user);
  useEffect(() => {
    getMainEventFeed(user.id, setContents);
  }, [user.id]);



  return (
    <div className="eventSidebar">
      <div className="eventWrapper">
        <ul className="eventList">
          <li className="eventListItem">
            <div className="eventIcon" />
            <span className="eventListItemText">Event Feed</span>
          </li>
        </ul>
        {contents.length > 0 &&
            contents.map((content) => {
              return (
                  <div key={content.event.id}>
                    <EventCard
                        className="cardContainer"
                        content={content}
                        contentType={"event"}
                        id={content.event.id}
                        user={user}
                    />
                  </div>
              );
            })}
        <button className="eventButton">
          Show More</button>
      </div>
    </div>
  );
}
