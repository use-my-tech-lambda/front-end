import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token,
        },
        baseURL: "https://ft-backend-use-my-tech.herokuapp.com/"
    })
}

export default axiosWithAuth