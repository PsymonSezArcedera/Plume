import axios from "axios"

const URL = "http://localhost:3000/blogs"

export async function getBlogs(){
    const response = await axios.get(`${URL}/`)
    if(response.status == 200){
        return response.data
    }
    else{
        return
    }
}
export async function findBlog(id){
    const response = await axios.get(`${URL}/${id}`)
    if(response.status == 200){
        return response.data
    }
    else{
        return
    }
}

export async function createBlog(blog){
    const response = await axios.post(`${URL}/create`,blog)
    return response
}

export async function updateBlog(id, blog){
    const response = await axios.put(`${URL}/${id}`, blog)
    return response
}

export async function deleteBlog(id){
    const response = await axios.delete(`${URL}/${id}`)
    return response
}