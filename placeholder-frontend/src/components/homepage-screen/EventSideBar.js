import React from "react";
import "./eventSideBar.css";
import EventCard from "../commons/EventCard";

export default function EventSideBar() {

  return (
    <div className="eventSidebar">
      <div className="eventWrapper">
        <ul className="eventList">
          <li className="eventListItem">
            <div className="eventIcon" />
            <span className="eventListItemText">Event Feed</span>
          </li>
        </ul>
        <EventCard>
        </EventCard>
        <button className="eventButton">
          Show More</button>
      </div>
    </div>
  );
}
