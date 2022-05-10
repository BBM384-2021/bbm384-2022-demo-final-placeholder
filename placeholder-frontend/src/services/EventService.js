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
                // success
                // console.log(response);
                const events = response.data.allEvents;
                setEvents(events);
            } else {
                setEvents([]);
            }
        })
        .catch((error) => console.log(error));
}

export function getEvent(post_id, setState, finishFunction) {
    axios
        .get(baseURL + "/getEvent", {
            params: {
                post_id: post_id,
            },
        }).then((response) => {
        if (response.data.code === 200) {
            setState(response.data.event);
        } else {
        }
        finishFunction();
    });
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
