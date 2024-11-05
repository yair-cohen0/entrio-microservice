import axios from 'axios'

export const fetchRepositoryByName = async (name) => {
    return (await axios.get(`http://localhost:8080/collect/${name}`)).data;
}

