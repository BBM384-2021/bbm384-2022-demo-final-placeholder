import React, { useEffect, useState } from "react";
import "./eventSideBar.css";
import EventCard from "../commons/EventCard";
import {getMainEventFeed } from "../../services/EventService";

export default function EventSideBar({user}) {

  const [participatingEvents, setParticipatingEvents] = useState([]);
  const [nonParticipatingEvents, setNonParticipatingEvents] = useState([]);
  const [eventsOwned, setEventsOwned] = useState([]);


  useEffect(() => {
    getMainEventFeed(user.id, setParticipatingEvents,setNonParticipatingEvents, setEventsOwned);
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
        {participatingEvents.length > 0 &&
            participatingEvents.map((content) => {
              return (
                  <div key={content.event.id}>
                    <EventCard
                        className="cardContainer"
                        content={content}
                        contentType={"going"}
                        id={content.event.id}
                        user={user}
                        isEventOver={(new Date(content.event.end_date) - new Date()) < 0 }
                    />
                  </div>
              );
            })}
        {nonParticipatingEvents.length > 0 &&
            nonParticipatingEvents.map((content) => {
              return (
                  <div key={content.event.id}>
                    <EventCard
                        className="cardContainer"
                        content={content}
                        contentType={"attend"}
                        id={content.event.id}
                        user={user}
                        isEventOver={(new Date(content.event.end_date) - new Date()) < 0 }

                    />
                  </div>
              );
            })}
        {eventsOwned.length > 0 &&
            eventsOwned.map((content) => {
              return (
                  <div key={content.event.id}>
                    <EventCard
                        className="cardContainer"
                        content={content}
                        contentType={"going"}
                        id={content.event.id}
                        user={user}
                        isEventOver={(new Date(content.event.end_date) - new Date()) < 0 }
                    />
                  </div>
              );
            })}
      </div>
    </div>
  );
}
