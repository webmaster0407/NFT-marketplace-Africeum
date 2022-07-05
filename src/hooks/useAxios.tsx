import axios from 'axios'
import { logout, useAuthDispatch, useAuthState } from "../contexts/AuthContext";

export function useAxios() {
  const { token } = useAuthState();
  const dispatch = useAuthDispatch();
  
  axios.interceptors.request.use(config => {
    // if(config.method === 'post') {
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //     config.data = qs.stringify(config.data)
    // }

    if (token && !config.url.includes('https://api.thegraph.com') && !config.url.includes('https://ipfs.io/')) {
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
    // if(config.url.includes("address")) 
    //   config.baseURL = `${process.env.REACT_APP_BASE_URL2}`
    // else
    //   config.baseURL = `${process.env.REACT_APP_BASE_URL}http://160.20.147.57:8888/api/`;
    config.timeout = 300000;

    return config;
  });

  axios.interceptors.response.use(response => {
    return Promise.resolve(response);
  
  }, error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      //logout(dispatch);
      console.log('Auth failed')
      //window.location.reload();
    }
  
    return Promise.reject(error)
  })
  
}
