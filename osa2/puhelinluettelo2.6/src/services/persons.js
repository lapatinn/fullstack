import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const response = axios.get(url)
    return response.then(response => response.data)
}

const create = (personObject) => {
    const response = axios.post(url, personObject)
    return response.then(response => response.data)
}

const remove = (id) => {
    if (window.confirm('Do you want to delete this entry?')) {
        const response = axios.delete(`${url}/${id}`)
        return getAll()
    } else {
        return
    }
}

export default { getAll, create, remove }