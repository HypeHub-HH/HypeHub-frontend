import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

const checkIfEmailExist = async (email) => {
  try {
    return await axios.get(`${baseURL}/Account/Email?email=${email}`);
  } catch (error) {
    throw new Error(error);
  }
};

export { checkIfEmailExist };
