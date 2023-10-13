import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

const signIn = async (body) => {
  try {
    return await axios.post(`${baseURL}/Authentication/Login`, body);
  } catch (error) {
    throw new Error(error);
  }
};

export { signIn };
