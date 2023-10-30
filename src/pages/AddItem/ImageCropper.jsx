import { Box, Button, Slider } from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './canvaUtils';

const ImageCropper = ({setSelectedImages, selectedImages}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };


  const showCroppedImage = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);     
      setSelectedImages([...selectedImages, croppedImageUrl])
      setImageSrc(null)
    } catch (e) {
      console.error(e)
    }
  }
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };


  return (
    <>
      {imageSrc ? (
        <Box padding={10}>
          <Box position={"relative"}  height={400} sx={{ width: '100%' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={3 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" onChange={(e, zoom) => setZoom(zoom)} />
            <Button variant="contained" color="primary" onClick={() => showCroppedImage()}>
              Cropp and add
            </Button>
            <Button variant="contained" color="primary" onClick={() => setImageSrc(null)}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />     
      )}
    </>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default ImageCropper;
