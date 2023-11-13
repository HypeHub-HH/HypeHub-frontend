import axios from 'axios';
import authorizedApi from '../services/AuthorizedAxios.js';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export class OutfitApi {
  static getOutfitWithAccountAndLikesAndImagesAndItemsAsync = async (outfitId) =>
    await axios.get(`${baseURL}/Outfits/${outfitId}/AllInformation`);

  static getLatestOutfitsAsync = async (page, pageSize) =>
    await axios.get(`${baseURL}/Outfits/Latest?page=${page}&pageSize=${pageSize}`);

  static createOutfitAsync = async (body) => await authorizedApi.post(`/Outfits`, body);

  static updateOutfitAsync = async (outfitId, body) => await authorizedApi.put(`/Outfits/${outfitId}`, body);

  static deleteOutfitAsync = async (outfitId) => await authorizedApi.delete(`/Outfits/${outfitId}`);

  static likeOrUnlikeOutfitAsync = async (outfitId) => await authorizedApi.put(`/Outfits/Like/${outfitId}`);

  static addItemToOutfitAsync = async (outfitId, itemId) => await authorizedApi.post(`/Outfits/${outfitId}/Items/${itemId}`);

  static removeItemFromOutfitAsync = async (outfitId, itemId) =>
    await authorizedApi.delete(`/Outfits/${outfitId}/Items/${itemId}`);

  static createImageAsync = async (body) => await authorizedApi.post(`/Outfits/Images`, body);

  static deleteImageAsync = async (imageId) => await authorizedApi.delete(`/Outfits/Images/${imageId}`);
}
