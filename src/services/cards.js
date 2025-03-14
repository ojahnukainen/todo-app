import axios from "axios";
const base_url = 'http://localhost:3001/todoData'

const getAll = () =>{
  return axios.get(base_url)
}

const createNew = (newObject) =>{
  return axios.post(base_url,newObject)
}

const update = (id, newObject) =>{
  return axios.put(`${base_url}/${id}`,newObject)
}

const deleteCard = (id) =>{
  return axios.delete(`${base_url}/${id}`)
}

export default {getAll, createNew, update, deleteCard}