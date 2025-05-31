import axiosInstance from '@/utils/axios.js'



export async function addUser(data){
    try {
        let response = await axiosInstance.post("/users",data)

        return response.data

    } catch (error) {
  
        throw new  Error(error);
    }
}
export async function getUsers(){
    try {
        let response = await axiosInstance.get("/users")

        return response.data

    } catch (error) {
  
        throw new Error(error);
    }
}
// 
export async function updateUser(id, data){
    try {
        let response = await axiosInstance.put(`/users/${id}`,data)

        return response.data.result

    } catch (error) {
      
        throw new Error(error);
    }
}

export async function getUserById(id){
    try {
        let response = await axiosInstance.get(`/users/${id}`)
        return response.data.result

    } catch (error) {
 
        throw new Error(error);
    }
}


export async function getProfileInfo(){
    try {
        let response = await axiosInstance.get('/users/profile/info');
        return response.data.result
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

