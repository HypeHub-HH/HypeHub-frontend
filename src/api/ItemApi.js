import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class ItemApi {
  static getItemAsync = async (itemId) => await axios.get(`${baseURL}/Items/${itemId}`);

  static createItemAsync = async (body) => await authorizedApi.post(`/Items`, body);

  static updateItemAsync = async (body) => await authorizedApi.put(`/Items`, body);

  static deleteItemAsync = async (itemId) => await authorizedApi.delete(`/Items/${itemId}`);

  static createImageAsync = async (body) => await authorizedApi.post(`/Items/Images`, body);

  static deleteImageAsync = async (imageId) => await authorizedApi.delete(`/Items/Images?imageId=${imageId}`);

  static likeOrUnlikeItemAsync = async (itemId) => await authorizedApi.put(`/Items/${itemId}/like`);
}
