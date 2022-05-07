import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/tag";

export function getAllTags(setTags) {   
    axios.get(baseURL + "/getAllTags")
        .then((response) => {
            if (response.data.code === 200) {
                setTags(response.data.allTags)
            } else {
                // !TODO! print error message
            }
        }).catch((error) => console.log(error));
}