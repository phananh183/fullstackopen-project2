import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = nameObj => {
    const req = axios.post(baseUrl, nameObj)
    return req.then(res => res.data)
}

const deleteNum = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req
}

const update = (id, newNum) => {
    const req = axios.put(`${baseUrl}/${id}`, newNum)
    return req
}
const phoneNumServices = { getAll, create, deleteNum, update }
export default phoneNumServices