import axios from 'axios';

const apiKey = process.env.REACT_APP_IMG_BB_KEY;

export async function postImage(images) {
  let uploadedImages = [];
  images.forEach((image) => {
    const base64Value = extractBase64FromDataURL(image);
    const formData = new FormData();
    formData.append('image', base64Value);
    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      headers: {
        'Content-Type': `multipart/form-data`,
      },
      data: formData,
      params: {
        key: apiKey,
      },
    })
      .then(function (response) {
        const data = response.data.data
        console.log(data)
        const urls = { url: data.url, deleteUrl: data.delete_url };
        uploadedImages.push(urls);
        
      })
      .catch(function (error) {
        console.error('Error uploading image:');
        console.error(error);
      });
  });
  console.log(uploadedImages)
  return uploadedImages
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
