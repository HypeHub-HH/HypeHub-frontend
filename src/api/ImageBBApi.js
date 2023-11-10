import axios from 'axios';

const apiKey = process.env.REACT_APP_IMG_BB_KEY;

export async function postImages(images) {
  const uploadPromises = images.map((image) => {
    return new Promise(async (resolve, reject) => {
      try {
        const base64Value = extractBase64FromDataURL(image);
        const formData = new FormData();
        formData.append('image', base64Value);

        const response = await axios({
          method: 'post',
          url: 'https://api.imgbb.com/1/upload',
          data: formData,
          params: {
            key: apiKey,
          },
        });

        const data = response.data.data;
        const urls = data.url
        resolve(urls);
      } catch (error) {
        console.error('Error uploading image:');
        console.error(error);
        reject(error);
      }
    });
  });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
}


function extractBase64FromDataURL(dataURL) {
  const parts = dataURL.split(',');
  if (parts.length === 2) {
    return parts[1];
  } else {
    console.error('Invalid Data URL format');
    return null;
  }
}