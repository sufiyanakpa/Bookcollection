import base_url from "./Base_url";
import axios from "axios";


export const loginApi=async(data)=>{
    return await axios.post(`${base_url}/token`,data)
}
export const registerApi=async(data)=>{
    return await axios.post(`${base_url}/user/`,data)
}
export const addBookApi = async (data) => {
    return await axios.post(`${base_url}/book/`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
    });
};

export const getBookApi=async()=>{
    const options={
        headers:{
            'Content-Type':"application/json",
            'Authorization':`Token ${sessionStorage.getItem('token')}`
        }  
    }
    return await axios.get(`${base_url}/book/`,options)
}
export const getBookByApi=async(id)=>{
    const options={
        headers:{
            'Content-Type':"application/json",
            'Authorization':`Token ${sessionStorage.getItem('token')}`
        }  
    }
    return await axios.get(`${base_url}/book/${id}/`,options)
}
export const DeleteBooksApi=async(id)=>{
    const options={
        headers:{
            'Content-Type':"application/json",
            'Authorization':`Token ${sessionStorage.getItem('token')}`
        }
    }
    
    return await axios.delete(`${base_url}/book/${id}/`,options)
}
export const updateBookApi = async (id, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/book/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization':`Token ${sessionStorage.getItem('token')}`
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating book:", error.response?.data || error.message);
      return error.response;
    }
  };