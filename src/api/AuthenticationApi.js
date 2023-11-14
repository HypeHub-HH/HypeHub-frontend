import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class AuthenticationApi {
  static signInAsync = async (body) => await axios.post(`${baseURL}/Authentication/Login`, body);

  static signUpAsync = async (body) => await axios.post(`${baseURL}/Authentication/Register`, body);

  static getCurrentAccountAsync = async (body) => await authorizedApi.get(`${baseURL}/Authentication/GetCurrentAccount`, body);
}
