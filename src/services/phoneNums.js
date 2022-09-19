import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = nameObj => {
    const req = axios.post(baseUrl, nameObj)
    return req.then(res => res.data)
}

const deleteNum = id => {
    axios.delete(`${baseUrl}/${id}`)
}

const phoneNumServices = { getAll, create, deleteNum }
export default phoneNumServices