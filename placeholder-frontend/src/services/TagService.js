import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/tag";

export function getAllTags() {
    return axios.get(baseURL + "/getAllTags");
}

export function updateTag( tag_id, tag_name ) {
    console.log(tag_id, typeof tag_id, tag_name, typeof tag_name);
    return axios.patch(baseURL + "/updateTag", {
        "id" : tag_id,
        "tag_name" : tag_name
    })
}

export function deleteTag ( tag_id ) {
    return axios.delete(baseURL + "/deleteTag", {
        data : {
            "id" : tag_id
        }
    })
}

export function createTag ( tag_name ) {
    return axios.post(baseURL + "/createTag", {
        "tag_name" : tag_name
    });
}