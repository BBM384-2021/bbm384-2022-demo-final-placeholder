import React from "react";
import Box from "@mui/material/Box";
import "./eventSideBar.css";

export default function EventSideBar() {
  const events = [
    { id: 12, title: "Lecture Link", user: "Tuana Cetinkaya" },
    { id: 13, title: "Exam", user: "Selma Kahya" },
    { id: 14, title: "CS Dinner", user: "Ilkim Iclal Aydogan" },
    { id: 15, title: "Lecture Link 2", user: "Tuana Cetinkaya" },
  ];

  return (
    <div className="eventSidebar">
      <div className="eventWrapper">
        <ul className="eventList">
          {events.map((u) => (
            <li className="eventListItem" key={u.id}>
              <h3>{u.title}</h3>
              <span className="eventListItemText"> shared by {u.user}</span>
            </li>
          ))}
          <li className="eventListItem">
            <div className="eventIcon" />
            <span className="eventListItemText">Feed</span>
          </li>
        </ul>
        <button className="eventButton">Show More</button>
      </div>
    </div>
  );
}
