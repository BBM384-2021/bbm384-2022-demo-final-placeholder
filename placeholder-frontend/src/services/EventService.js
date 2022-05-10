import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/event";

export function getMainEventFeed(user_id, setEvents) {
    axios
        .get(baseURL + "/getMainFeed", {
            params: {
                user_id: user_id,
            },
        })
        .then((response) => {
            if (response.data.code === 200) {

                console.log(response);
                //const events = response.data;
                //setEvents(events);
            } else {
                setEvents([]);
            }
        })
        .catch((error) => console.log(error));
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
