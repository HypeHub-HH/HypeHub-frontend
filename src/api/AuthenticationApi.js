import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class AuthenticationApi {
  static signInAsync = async (body) => await axios.post(`${baseURL}/Authentication/Login`, body);

  static signUpAsync = async (body) => await axios.post(`${baseURL}/Authentication/Register`, body);
}
