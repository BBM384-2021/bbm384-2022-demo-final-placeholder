import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/event";

export function getMainEventFeed(user_id, setParticipatingEvents,setNonParticipatingEvents, setEventsOwned) {
    axios
        .get(baseURL + "/getMainFeed", {
            params: {
                current_user_id: user_id,
            },
        })
        .then((response) => {
            console.log(response);
            if (response.data.code === 200) {

                setNonParticipatingEvents(response.data.nonParticipatingEvents);
                setParticipatingEvents(response.data.participatingEvents);
                setEventsOwned(response.data.eventsOwned);
            }
        })
        .catch((error) => console.log(error));
}

export function participateEvent (user_id, event_id){
    return axios.post (baseURL + "/participateEvent", {
        "user_id" : user_id,
        "event_id" : event_id,
    });
}

export function cancelParticipation (user_id, event_id){
    return axios.delete (baseURL + "/cancelParticipation", {
        data: {
            "user_id" : user_id,
            "event_id" : event_id,
        }
    });
}

export function updateEvent( id, event_body, event_location, start_date, end_date ) {
    return axios.patch(baseURL + "/updateEvent", {
        "id" : id,
        "event_body" : event_body,
        "event_location" : event_location,
        "start_date" : start_date,
        "end_date" : end_date,
    });
}

export function deleteEvent ( id ) {
    return axios.delete(baseURL + "/deleteEvent", {
        data : {
            "id" : id
        }
    })
}

export function addEvent (user_id, event_body, event_share_date, event_location, start_date, end_date){
    return axios.post (baseURL + "/addEvent", {
            "user_id" : user_id,
            "event_body" : event_body,
            "event_share_date" : event_share_date,
            "event_location" : event_location,
            "start_date" : start_date,
            "end_date" : end_date,

    });
}

export function getAllEventsOfUser(user_id) {
    return axios.get(baseURL + "/getAllEventsOfAUser", {
        params: {
            user_id: user_id,
        },
    });
}
