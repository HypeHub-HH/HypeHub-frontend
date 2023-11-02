import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios.js';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class AccountApi {
  static checkIfEmailExistAsync = async (email) => await axios.get(`${baseURL}/Account/Email?email=${email}`);

  static checkIfUsernameExistAsync = async (username) => await axios.get(`${baseURL}/Account/Username?username=${username}`);

  static getAccountWithOutfitsAsync = async (accountId) => await axios.get(`${baseURL}/Account/${accountId}/Outfits`);

  static getItemsFromAccountAsync = async (accountId) => await axios.get(`${baseURL}/Account/${accountId}/Items`);
}
