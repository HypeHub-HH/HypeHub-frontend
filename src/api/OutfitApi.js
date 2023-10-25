import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios.js';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class OutfitApi {
  static getOutfitAsync = async (id) => await axios.get(`${baseURL}/Outfits/${id}`);

  static getOutfitWithAccountAndLikesAndImagesAndItemsAsync = async (id) =>
    await axios.get(`${baseURL}/Outfits/${id}/AllInformation`);

  static getLatestOutfitsAsync = async (page, count) =>
    await axios.get(`${baseURL}/Outfits/Latest?page=${page}&count=${count}`);

  static createOutfitAsync = async (body) => await authorizedApi.post(`/Outfits`, body);
}
