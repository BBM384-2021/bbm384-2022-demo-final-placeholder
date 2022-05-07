import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/tag";

export function getAllTags() {
    return axios.get(baseURL + "/getAllTags");
}