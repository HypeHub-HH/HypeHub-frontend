import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

const checkIfUsernameExist = async (username) => {
  try {
    return await axios.get(`${baseURL}/Account/Username?username=${username}`);
  } catch (error) {
    throw new Error(error);
  }
};

export { checkIfUsernameExist };
