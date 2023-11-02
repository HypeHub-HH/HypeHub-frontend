import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class ItemApi {
  static getItemAsync = async (itemId) => await axios.get(`${baseURL}/Items/${itemId}`);

  static likeOrUnlikeItemAsync = async (itemId) => await authorizedApi.put(`/Items/${itemId}/like`);
}
