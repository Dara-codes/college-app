import axios from 'axios'

let apiBaseUri = process.env.REACT_APP_API_BASE_URL


const axiosDefaultInstance = axios.create({
    baseURL: apiBaseUri,
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    withCredentials: false
  });

  axiosDefaultInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    console.log('Token ', token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosDefaultInstance.interceptors.response.use((response) => {
    return response;
  }, function (error) {
    // console.log('error', error)
    // if ( error.response && (error.response.status === 403)) {
    //     history.push({
    //         pathname: '/login',
    //         state: history.location
    //     });
    // }
    return Promise.reject(error);
  })


  export default axiosDefaultInstance;