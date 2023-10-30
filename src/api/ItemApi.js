import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class ItemApi {
  static checkIfEmailExistAsync = async (email) => await axios.get(`${baseURL}/Account/Email?email=${email}`);

  static getItems = async (accountId) =>{
    return await axios.get(`${baseURL}/Account/${accountId}/Items`)};
}
