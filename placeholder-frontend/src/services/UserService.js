const axios = require('axios');



export async function getAllUsers() {

    try{
        axios.get("/user/getAllUsers").then((res) => {
            console.log(res);
          });
        const response = await fetch('/api/users');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}