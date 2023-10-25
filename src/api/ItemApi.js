import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class ItemApi {
  static checkIfEmailExistAsync = async (email) => await axios.get(`${baseURL}/Account/Email?email=${email}`);

  static checkIfUsernameExistAsync = async (username) =>
    await axios.get(`${baseURL}/Account/Username?username=${username}`);
}
