import axios from "axios";

const createInstance = (token: string) => {
  return axios.create({
    baseURL: 'https://api.wisey.app/api/v1',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
}

export { createInstance }