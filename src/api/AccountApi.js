import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios.js';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class AccountApi {
  static checkIfEmailExistAsync = async (email) => await axios.get(`${baseURL}/Account/Email?email=${email}`);

  static checkIfUsernameExistAsync = async (username) => await axios.get(`${baseURL}/Account/Username?username=${username}`);

  static getSearchedAccountsAsync = async (searchedUsername) => await axios.get(`${baseURL}/Account/Search?searchedUsername=${searchedUsername}`);

  static getAccountWithOutfitsAsync = async (accountId) => await axios.get(`${baseURL}/Account/${accountId}/Outfits`);

  static getItemsFromAccountAsync = async (accountId) => await axios.get(`${baseURL}/Account/${accountId}/Items`);

  static updateAccountAvatarAsync = async (body) => await authorizedApi.put(`/Account/Avatar`, body);

  static updateAccountPrivacyAsync = async (body) => await authorizedApi.put(`/Account/Privacy`, body);
}
